import $ from 'jquery';
window.jQuery = $;

import React from 'react';
import request from 'request';
import {render} from 'react-dom'
import {ApolloProvider} from 'react-apollo';
import {BrowserRouter, Match, Miss, Redirect} from 'react-router'
import client from './apollo';
import {ThemeHome, ThemeSingle, ThemePage} from './admin/theme';
import Admin from './admin';
import Login from './login';
import Config from './config';

let data = {
  "query": `query GetUsers{
	    viewer {
	      allUsers {
	        edges {
	          node {
	            username,
	            email
	          }
	        }
	      }
	    }
	  }`
};


const Auth = {
  isAuthenticated: (localStorage.token && localStorage.token!==""),
  authenticate() {
    this.isAuthenticated = true
  },
  signout() {
    this.isAuthenticated = false;
    localStorage.token = "";
  }
}

const MatchWhenAuthorized = ({ component: Component, ...rest }) => (
  <Match {...rest} render={props => (
    Auth.isAuthenticated ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

const Main = React.createClass({
	getInitialState: function(){
		return {
			isAuthenticated:(localStorage.token && localStorage.token!=="")
		}
	},
	componentWillMount: function(){
		debugger;
		request({
		  url: Config.scapholdUrl,
		  method: "POST",
		  json: true,
		  headers: {
		    "content-type": "application/json",
		    "Authorization": "Bearer " + localStorage.token
		  },
		  body: data
		}, (error, response, body) => {
			debugger;
			if (!error && !body.errors && response.statusCode == 200) {
		    console.log(JSON.stringify(body, null, 2));
		    Auth.authenticate();
		  } else {
		    console.log(error);
		    console.log(response.statusCode);
		    Auth.signout();
		  }
		});
	},
	render: function(){
		return (
			<ApolloProvider client={client}>
				<BrowserRouter>
					<div id="router" style={{height: "100vh"}}>
						<MatchWhenAuthorized 
							pattern="/admin/:page?/:action?/:param1?/:param2?/:param3?/:param4?/:param5?" 
							component={Admin}/>
						<Match pattern="/page/:pageId?/:param1?/:param2?/:param3?/:param4?/:param5?" component={ThemeSingle}/>
						<Match pattern="/article/:postId?/:param1?/:param2?/:param3?/:param4?/:param5?" component={ThemeSingle}/>
						<Match pattern="/login/:param1?" component={Login}/>
						<Miss component={ThemeHome}/>
					</div>
				</BrowserRouter>
			</ApolloProvider>
		)
	}
});

render(<Main/>, document.getElementById('root'));