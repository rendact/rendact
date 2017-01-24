import $ from 'jquery';
window.jQuery = $;

import React from 'react'
import request from 'request';
import {render} from 'react-dom'
import {ApolloProvider} from 'react-apollo';
import {BrowserRouter, Match, Miss, Redirect} from 'react-router'
import client from './apollo';
import {ThemeHome, ThemeSingle, ThemePage} from './admin/theme';
import Admin from './admin';
import Login from './login';

const Auth = {
  isAuthenticated: true,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100) 
  },
  signout(cb) {
    this.isAuthenticated = false
    cb()
    setTimeout(cb, 100) 
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

const data = {
  "query": `mutation LoginUserQuery ($input: LoginUserInput!) {
    loginUser(input: $input) {
      token
      user {
        id
        username
        createdAt
      }
    }
  }`,
  "variables": {
    "input": {
      "username": "keeperprancis",
      "password": "Qonitah1"
    }
  }
};
/*
request({
  url: "https://us-west-2.api.scaphold.io/graphql/rendact",
  method: "POST",
  json: true,
  headers: {
    "content-type": "application/json",
  },
  body: data
}, (error, response, body) => {
  if (!error && response.statusCode == 200) {
    console.log(JSON.stringify(body, null, 2));
  } else {
    console.log(error);
    console.log(response.statusCode);
  }
});
*/
const Main = React.createClass({
	render: function(){
		return (
			<ApolloProvider client={client}>
				<BrowserRouter>
					<div id="router" style={{height: "100vh"}}>
						<MatchWhenAuthorized pattern="/admin/:page?/:action?/:param1?/:param2?/:param3?/:param4?/:param5?" component={Admin}/>
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