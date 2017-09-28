import React from 'react'
import {render} from 'react-dom'
import {ApolloProvider,graphql} from 'react-apollo'
import {BrowserRouter, Match, Miss, Redirect} from 'react-router'
import {MatchWhenAuthorized} from './auth'
import client from './apollo'
import ThemeHome from './includes/Theme/ThemeHome'
import ThemeSingle from './includes/Theme/ThemeSingle'
import ThemeBlog from './includes/Theme/ThemeBlog'
import ThemeSearch from './includes/themeSearch'
import Admin from './admin'
import Login from './login'
import Register from './register'
import reducer from './reducers'
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { createStore } from 'redux'
import {setLogged} from './actions'
import {connectWithStore } from './utils'
import gql from 'graphql-tag'
import _ from 'lodash'
import request from 'request';
import Loading from './admin/Loading';
import 'jquery-ui/ui/core';
import 'bootstrap/dist/css/bootstrap.css';
const store = createStore(reducer, {})

let Main = React.createClass({
	propTypes: {
		logged: React.PropTypes.bool.isRequired,
		pathname: React.PropTypes.string.isRequired,
		checkAuthDone: React.PropTypes.bool.isRequired
	},
	getDefaultProps: function() {
  	return {
			logged: localStorage.getItem("token")?true:false,
			checkAuthDone: localStorage.getItem("token")?false:true,
      pathname: 'admin'
		}
 	},
	setLogged(state, pathname){
		this.props.dispatch(setLogged(state, pathname))
	},
	render(){
		return (
				<BrowserRouter>
					{ this.props.checkAuthDone ? ( 
					<div id="router" style={{height: "100vh"}}>
							<MatchWhenAuthorized pattern="/admin/:page?/:action?/:postId?" 
								component={Admin} 
								logged={this.props.logged}
								onlogin={this.setLogged} />
							<Match pattern="/page/:postId?/:param1?/:param2?" component={ThemeSingle}/>
							<Match pattern="/post/:postId?/:param1?/:param2?" component={ThemeSingle}/>
							<Match pattern="/blog/:postId?/:param1?/:param2?" component={ThemeBlog}/>
							<Match pattern="/category/:categoryId?/:param1?/:param2?" component={ThemeBlog}/>
	            <Match pattern="/search/:search" component={ThemeSearch}/>
							<Match pattern="/register/:param1?" component={Register}/>
							<Match pattern="/login/:param1?" 
								render={ function(props){
							    return this.props.logged ? (
							      <Redirect to={{
							        pathname: this.props.referrer,
							        state: { from: props.location }
							      }}
							      	{...props} 
							      />
							    ) : (
							      <Login logged={this.props.logged} 
                      referrer={this.props.referrer}
							      	onlogin={this.setLogged} 
							      	{...props}
							      />
							    )
						  }.bind(this)}/>
							<Miss component={ThemeHome}/>
					</div>
					) : (
						<div id="router" style={{height: "100vh"}}>
							<Loading />
						</div>
					) 
				}
				</BrowserRouter>
		)
	}
})

const mapStateToProps = function(state, ownProps){
	if (!_.isEmpty(state.main)) {
		return state.main;
	} else return {}
}
Main = connectWithStore(store, Main, mapStateToProps);

var getUserQry = gql`query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    username
    fullName
    gender
    image
    email
    lastLogin
    createdAt
    country
    dateOfBirth
    meta {
      edges {
        node {
          id
          item
          value
        }
      }
    }
    roles {
      edges {
        node {
          id
          name
        }
      }
    }
  }
}`

Main = graphql(getUserQry, {
  options: { variables: { id: localStorage.userId } },
  props: ({ownProps, data}) => {
  	
  	if (data.error) {
  		return {
        logged: false,
        error: data.error,
        checkAuthDone: true
      }
  	}
  	
    if (data.getUser) {
      return {
        profileData: data.getUser,
        logged: true,
        checkAuthDone: true
      }
    } else { 
      return {
        logged: false,
        profileData: null
      }
    }
  },
  skip: !localStorage.getItem('token')
})(Main);

Main = DragDropContext(HTML5Backend)(Main);
render(<ApolloProvider client={client} store={store}><Main/></ApolloProvider>, document.getElementById('root'));
