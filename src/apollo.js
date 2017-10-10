import ApolloClient from 'apollo-client';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import {createNetworkInterface} from './custom-network-interface';
import {scapholdUrl} from './rendact.config.json'
import { print as printGraphQL } from 'graphql/language/printer';

function addGraphQLSubscriptions(networkInterface, wsClient) {
  return Object.assign(networkInterface, {
    subscribe(request, handler) {
      return wsClient.subscribe({
        query: printGraphQL(request.query),
        variables: request.variables,
      }, handler);
    },
    unsubscribe(id) {
      wsClient.unsubscribe(id);
    },
  });
}

// creates a subscription ready Apollo Client instance

const graphqlUrl = `https://${scapholdUrl}`;
const websocketUrl = `wss://${scapholdUrl}`;
const networkInterface = createNetworkInterface({
    uri: graphqlUrl
});


networkInterface.use([{
  applyMiddleware(req, next) {
    // Easy way to add authorization headers for every request
    if (!req.options.headers) {
      req.options.headers = {};  // Create the header object if needed.
    }

    const token = localStorage.getItem('token');
    if (token)
      req.options.headers.authorization = `Bearer ${token}`;
    next();
  },
}]);
const wsClient = new SubscriptionClient(websocketUrl);
const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(networkInterface, wsClient);

const clientGraphql = new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions,
  initialState: {},
});

export default clientGraphql;
