import { HTTPFetchNetworkInterface } from 'apollo-client/transport/networkInterface';
import unset from 'lodash/unset';

import { print as printGraphQL } from 'graphql/language/printer';



export class UploadHTTPFetchNetworkInterface extends HTTPFetchNetworkInterface {
  fetchFromRemoteEndpoint({ request, options }) {

    return import(/* webpackChunkName: "deepMapValues" */'./utils/deepMapValues').then(deepMapValues => {
    let standart = true;
    const formData = new FormData();

    deepMapValues.default(request.variables, (node, path) => {
      if (node instanceof File){
        let splitted = path.split('.')
        formData.append(splitted[splitted.length - 1], node)
        unset(request.variables, path)
        standart = false
      }
    })


    if (!standart){
      formData.append('query', printGraphQL(request.query));
      formData.append('variables', JSON.stringify(request.variables || {}));
      formData.append('debugName', JSON.stringify(request.debugName || ''));
      formData.append('operationName', JSON.stringify(request.operationName || ''));

      // sending request
      return fetch(this._uri, {
        method: 'POST',
        body: formData,
        ...options
      })

    }


    // Standard fetch method fallback
    return super.fetchFromRemoteEndpoint({ request, options })
    }).then(x => x)
  }
}

export function createNetworkInterface({ uri, opts = {} }) {
  return new UploadHTTPFetchNetworkInterface(uri, opts)
}
