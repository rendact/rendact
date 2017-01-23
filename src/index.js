import $ from 'jquery';
window.jQuery = $;

import React from 'react'
import {render} from 'react-dom'
import {ApolloProvider} from 'react-apollo';
import {BrowserRouter, Match, Miss} from 'react-router'
import client from './apollo';
import {ThemeHome, ThemeSingle, ThemePage} from './admin/theme';
import Admin from './admin';

const Main = React.createClass({
	render: function(){
		return (
			<ApolloProvider client={client}>
				<BrowserRouter>
					<div id="router" style={{height: "100vh"}}>
						<Match pattern="/admin/:page?/:action?/:param1?/:param2?/:param3?/:param4?/:param5?" component={Admin}/>
						<Match pattern="/page/:pageId?/:param1?/:param2?/:param3?/:param4?/:param5?" component={ThemeSingle}/>
						<Match pattern="/article/:postId?/:param1?/:param2?/:param3?/:param4?/:param5?" component={ThemeSingle}/>
						<Miss component={ThemeHome}/>
					</div>
				</BrowserRouter>
			</ApolloProvider>
		)
	}
});

render(<Main/>, document.getElementById('root'));