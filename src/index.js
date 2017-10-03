import React from 'react'
import {render} from 'react-dom'
import {ApolloProvider, graphql} from 'react-apollo'
import BrowserRouter from 'react-router/BrowserRouter'
import Match from 'react-router/Match'
import Miss from 'react-router/Miss'
import Redirect from 'react-router/Redirect'
import {MatchWhenAuthorized} from './auth'
import client from './apollo'
import reducer from './reducers'
import DragDropContext from 'react-dnd/lib/DragDropContext';
import HTML5Backend from 'react-dnd-html5-backend';
import  createStore  from 'redux/lib/createStore'
import {setLogged} from './actions'
import {connectWithStore } from './utils'
import gql from 'graphql-tag'
import isEmpty from 'lodash/isEmpty'
import Loading from './admin/Loading';
import Loadable from 'react-loadable'

const store = createStore(reducer, {})

const Login = Loadable({
  loader: () => new Promise((resolve) =>
    require.ensure(['./login'], () => resolve(require('./login')),
	 'themehome')),
  loading: () => <Loading/>
})
const Register = Loadable({
  loader: () => new Promise((resolve) =>
    require.ensure(['./register'], () => resolve(require('./register')),
	 'themehome')),
  loading: () => <Loading/>
})
const ThemeHome = Loadable({
  loader: () => new Promise((resolve) =>
    require.ensure(['./includes/Theme/ThemeHome'], () => resolve(require('./includes/Theme/ThemeHome')),
	 'themehome')),
  loading: () => <Loading/>
})
const ThemeSearch = Loadable({
  loader: () => new Promise((resolve) =>
    require.ensure(['./includes/themeSearch'], () => resolve(require('./includes/themeSearch')),
	 'themesearch')),
  loading: () => <Loading/>
})
const ThemeBlog = Loadable({
  loader: () => new Promise((resolve) =>
    require.ensure(['./includes/Theme/ThemeBlog'], () => resolve(require('./includes/Theme/ThemeBlog')),
	 'themehome')),
  loading: () => <Loading/>
})

const ThemeSingle = Loadable({
  loader: () => new Promise((resolve) =>
    require.ensure(['./includes/Theme/ThemeSingle'], () => resolve(require('./includes/Theme/ThemeSingle')),
	 'themesingle')),
  loading: () => <Loading/>
})

const Admin = Loadable({
  loader: () => new Promise((resolve) =>
    require.ensure(['./admin'], () => resolve(require('./admin')),
	 'themeadmin')),
  loading: () => <Loading/>
})

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
							        state: { referrer: props.referrer }
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
	if (!isEmpty(state.main)) {
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
