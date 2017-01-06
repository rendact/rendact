import React from 'react'
import {render} from 'react-dom'
import {ApolloProvider} from 'react-apollo';
import {BrowserRouter, Match, Miss} from 'react-router'
import client from './apollo';
import Theme from './theme';
import Admin from './admin';

render((
	<ApolloProvider client={client}>
		<BrowserRouter>
			<div id="router" style={{height: "100%"}}>
				<Match pattern="/admin/:a?/:b?/:c?/:d?/:e?/:f?/:g?/:h?/:i?/:j?" component={Admin}/>
				<Miss component={Theme}/>
			</div>
		</BrowserRouter>
	</ApolloProvider>
), document.getElementById('root'))
