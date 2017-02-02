import $ from 'jquery';
window.jQuery = $;

import React from 'react';
import request from 'request';
import {render} from 'react-dom'
import {ApolloProvider} from 'react-apollo';
import {BrowserRouter, Match, Miss, Redirect} from 'react-router'
import client from './apollo';
import {ThemeHome, ThemeSingle, ThemeBlog} from './admin/theme';
import Admin from './admin';
import Login from './login';
import Config from './config';

const MatchWhenAuthorized = ({ component: Component, authState: AuthState, profile: userData, ...rest }) => (
  <Match {...rest} render={props => (
    AuthState ? (
      <Component profile={userData} logged={AuthState} {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

const MatchWhenUnauthorized = ({ component: Component, authState: AuthState, ...rest }) => (
  <Match {...rest} render={props => (
    <Component logged={AuthState} {...props}/>
  )}/>
)

const Main = React.createClass({
	getInitialState: function(){
		return {
			isAuthenticated:(localStorage.token && localStorage.token!==""),
			profile: (localStorage.profile?localStorage.profile:{name: null,image: null})
		}
	},
	componentWillMount: function(){
		var isAuth0 = false;
		if (!localStorage.token) return;

		let getUserQry = {
		  "query": '{ 																' + 
		  	'getUser(id: "'+localStorage.userId+'"){ 	' +
			  '    id, 																	' +
			  '    username 														' +
			  '    fullName 														' +
			  '    gender 															' +
			  '    email 																' +
			  '    lastLogin 														' +
			  '    createdAt														' +
		    '	} 																			' +
			  '}'
		};

		try {
			var identities = JSON.parse(localStorage.profile).identities[0];
			identities.userId = identities.user_id;
			delete identities.user_id;

			getUserQry = {
			  "query": `mutation LoginUserWithAuth0Lock ($input: LoginUserWithAuth0LockInput!) {
			    loginUserWithAuth0Lock(input: $input) {
			      user {
			      	id
			      	username
			      	fullName
			      	gender
			      	email
			      	lastLogin
			      	createdAt
			      }
			    }
			  }`,
			  "variables": {
			    "input": {
			      "identity": identities,
			      "access_token": localStorage.token,
			      "clientMutationId": Config.auth0ClientId
			    }
			  }
			};
			isAuth0 = true;
		} catch(e) {}
		
		request({
		  url: Config.scapholdUrl,
		  method: "POST",
		  json: true,
		  headers: {
		    "content-type": "application/json",
		    "Authorization": "Bearer " + localStorage.token
		  },
		  body: getUserQry
		}, (error, response, body) => {
			if (!error && !body.errors && body.data != null && response.statusCode === 200) {
				if (isAuth0) {
					var p = JSON.parse(localStorage.getItem('profile'));
					var p2 = {
						id: p.user_id,
		      	username: p.name,
		      	fullName: p.given_name+" "+p.family_name,
		      	gender: p.gender,
		      	email: p.email,
		      	lastLogin: p.updated_at,
		      	createdAt: p.created_at
					}
					this.signin(p2);
					//localStorage.profile = JSON.stringify(p2);
				} else {
					if (body.data.getUser) {
		    		this.signin(body.data.getUser);
		    		localStorage.profile = JSON.stringify(body.data.getUser);
					}
		    }
		  } else {
		    this.signout();
		  }
		});
	},
	signin: function(p){
		var profile = {
    	name: p.fullName?p.fullName:p.username,
    	username: p.username,
    	email: p.email,
    	gender: p.gender,
    	lastLogin: p.lastLogin,
    	createdAt: p.createdAt
    }
    
		this.setState({
			isAuthenticated:true, 
			profile: profile
		});
	},
	signout: function(){
		localStorage.token = "";
    localStorage.userId = "";
    localStorage.profile = "";
    localStorage.loginType = "";
    this.setState({
			isAuthenticated:false, 
			profile: null});
		$.ajax('https://rendact.auth0.com/v2/logout');
	},
	render: function(){
		return (
			<ApolloProvider client={client}>
				<BrowserRouter>
					<div id="router" style={{height: "100vh"}}>
						<MatchWhenAuthorized 
							pattern="/admin/:page?/:action?/:param1?/:param2?/:param3?/:param4?/:param5?" 
							component={Admin}
							authState={this.state.isAuthenticated}
							profile={this.state.profile}
						/>
						<Match pattern="/article/:pageId?/:param1?/:param2?/:param3?/:param4?/:param5?" component={ThemeSingle}/>
						<Match pattern="/blog/:postId?/:param1?/:param2?/:param3?/:param4?/:param5?" component={ThemeBlog}/>
						<MatchWhenUnauthorized 
							pattern="/login/:param1?" 
							component={Login}
							authState={this.state.isAuthenticated}
						/>
						<Miss component={ThemeHome}/>
					</div>
				</BrowserRouter>
			</ApolloProvider>
		)
	}
});

render(<Main/>, document.getElementById('root'));