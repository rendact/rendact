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

const MatchWhenAuthorized = ({ component: Component, authState: authState, ...rest }) => (
  <Match {...rest} render={props => (
    authState ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

const MatchWhenUnauthorized = ({ component: Component, authState: authState, ...rest }) => (
  <Match {...rest} render={props => (
    <Component logged={authState} {...props}/>
  )}/>
)

const Main = React.createClass({
	getInitialState: function(){
		return {
			isAuthenticated:(localStorage.token && localStorage.token!=="")
		}
	},
	componentWillMount: function(){
		let getUserQry = {
		  "query": '{ 																' + 
		  	'getUser(id: "'+localStorage.userId+'"){ 	' +
			  '    username, 														' +
			  '    email 																' +
		    '	} 																			' +
			  '}'
		};

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
			if (!error && !body.errors && response.statusCode === 200) {
		    this.signin(body.data.getUser);
		  } else {
		    this.signout();
		  }
		});
	},
	signin: function(userData){
		this.setState({isAuthenticated:true});
    localStorage.username = userData.username;
	},
	signout: function(){
		this.setState({isAuthenticated:false});
    localStorage.token = "";
    localStorage.userId = "";
    localStorage.username = "";
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