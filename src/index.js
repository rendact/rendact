import React from 'react';
import {render} from 'react-dom'
import {ApolloProvider} from 'react-apollo';
import {BrowserRouter, Match, Miss, Redirect} from 'react-router'
import {AuthService, MatchWhenAuthorized} from './auth'
window.AuthService = AuthService;
import client from './apollo';
import {ThemeHome, ThemeSingle, ThemeBlog} from './admin/theme';
import Admin from './admin';
import Login from './login';
import Register from './register';
import {loadConfig} from './utils';

const Main = React.createClass({
	getInitialState: function(){
		this.AuthService = new AuthService(this);
		this.AuthService.checkAuth(this.onlogin);
		return {
			logged: localStorage.getItem("token")?true:false,
			pathname: 'admin'
		};
	},
	setLogged: function(state, pathname){
		var _obj = {logged: state};
		if (pathname) _obj['pathname'] = pathname;
		this.setState(_obj);
	},
	componentWillMount: function(){
		loadConfig();
	},
	render: function(){
		return (
			<ApolloProvider client={client}>
				<BrowserRouter>
					<div id="router" style={{height: "100vh"}}>
						<MatchWhenAuthorized pattern="/admin/:page?/:action?/:postId?" 
							component={Admin} 
							onlogin={this.setLogged} 
							logged={this.state.logged}
							authService={this.AuthService} />
						<Match pattern="/page/:pageId?/:param1?/:param2?" component={ThemeSingle}/>
						<Match pattern="/post/:postId?/:param1?/:param2?" component={ThemeSingle}/>
						<Match pattern="/blog/:postId?/:param1?/:param2?" component={ThemeBlog}/>
						<Match pattern="/register/:param1?" component={Register}/>
						<Match pattern="/login/:param1?" render={props => (
					    this.state.logged ? (
					      <Redirect to={{
					        pathname: this.state.pathname,
					        state: { from: props.location }
					      }}/>
					    ) : (
					      <Login logged={this.state.logged} 
					      	onlogin={this.setLogged} 
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