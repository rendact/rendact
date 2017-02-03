import $ from 'jquery';
window.jQuery = $;

import React from 'react';
import {render} from 'react-dom'
import {ApolloProvider} from 'react-apollo';
import {BrowserRouter, Match, Miss, Redirect, browserHistory, Router} from 'react-router'
import {AuthService, MatchWhenAuthorized} from './auth'
window.AuthService = AuthService;
import client from './apollo';
import {ThemeHome, ThemeSingle, ThemeBlog} from './admin/theme';
import Admin from './admin';
import Login from './login';

const Main = React.createClass({
	getInitialState: function(){
		this.AuthService = new AuthService(this);
		this.AuthService.checkAuth(this.onlogin);
		return {logged: localStorage.getItem("token")?true:false};
	},
	onlogin: function(state){
		this.setState({logged: state});
	},
	render: function(){
		return (
			<ApolloProvider client={client}>
				<BrowserRouter>
					<div id="router" style={{height: "100vh"}}>
						<MatchWhenAuthorized pattern="/admin/:page?/:action?/:param1?/:param2?" 
							component={Admin} 
							logged={this.state.logged}
							authService={this.AuthService} />
						<Match pattern="/article/:pageId?/:param1?/:param2?" component={ThemeSingle}/>
						<Match pattern="/blog/:postId?/:param1?/:param2?" component={ThemeBlog}/>
						<Match pattern="/login/:param1?" render={props => (
					    this.state.logged ? (
					      <Redirect to={{
					        pathname: '/admin',
					        state: { from: props.location }
					      }}/>
					    ) : (
					      <Login logged={this.state.logged} 
					      	onlogin={this.onlogin} 
					      	authService={this.AuthService}
					      	{...props}
					      />
					    )
					  )}/>
						<Miss component={ThemeHome}/>
					</div>
				</BrowserRouter>
			</ApolloProvider>
		)
	}
});

render(<Main/>, document.getElementById('root'));