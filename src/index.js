import React from 'react'
import {render} from 'react-dom'
import {ApolloProvider} from 'react-apollo';
import {BrowserRouter, Match, Miss} from 'react-router'
import client from './apollo';
import Theme from './theme';
import Admin from './admin';

const Main = React.createClass({
	render: function(){
		return (
			<ApolloProvider client={client}>
				<BrowserRouter>
					<div id="router" style={{height: "100%"}}>
						<Match pattern="/admin/:page?/:action?/:param1?/:param2?/:param3?/:param4?/:param5?" component={Admin}/>
						<Miss component={Theme}/>
					</div>
				</BrowserRouter>
			</ApolloProvider>
		)
	}
});

render(<Main/>, document.getElementById('root'));