import React from 'react'
import {render} from 'react-dom'
import {ApolloProvider,graphql} from 'react-apollo'
import {BrowserRouter, Match, Miss, Redirect} from 'react-router'
import {AuthService, MatchWhenAuthorized} from './auth'
import client from './apollo'
import {ThemeHome, ThemeSingle, ThemeBlog} from './includes/theme'
import ThemeSearch from './includes/themeSearch'
import Admin from './admin'
import Login from './login'
import Register from './register'
import reducer from './reducers'
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { createStore } from 'redux'
import { setLogged } from './actions'
import { connectWithStore } from './utils'
import gql from 'graphql-tag'
import _ from 'lodash'
import AdminConfig from './admin/AdminConfig';
window.AuthService = AuthService
const store = createStore(reducer)

let Main = React.createClass({
	propTypes: {
		logged: React.PropTypes.bool.isRequired,
		pathname: React.PropTypes.string.isRequired,
	},
	getDefaultProps: function() {
  	return {
			logged: localStorage.getItem("token")?true:false,
      pathname: 'admin'
		}
 	},
	setLogged(state, pathname){
		this.props.dispatch(setLogged(state, pathname))
	},
	componentWillMount(){
		this.AuthService = new AuthService(this);
	},
	render(){
		return (
			<ApolloProvider client={client} ref="provider" store={store}>
				<BrowserRouter>
					<div id="router" style={{height: "100vh"}}>
						<MatchWhenAuthorized pattern="/admin/:page?/:action?/:postId?" 
							component={Admin} 
							onlogin={this.setLogged} 
							authService={this.AuthService} />
						<Match pattern="/page/:pageId?/:param1?/:param2?" component={ThemeSingle}/>
						<Match pattern="/post/:postId?/:param1?/:param2?" component={ThemeSingle}/>
						<Match pattern="/blog/:postId?/:param1?/:param2?" component={ThemeBlog}/>
						<Match pattern="/category/:categoryId?/:param1?/:param2?" component={ThemeBlog}/>
            <Match pattern="/search/:search" component={ThemeSearch}/>
						<Match pattern="/register/:param1?" component={Register}/>
						<Match pattern="/login/:param1?" render={props => (
					    this.props.logged ? (
					      <Redirect to={{
					        pathname: this.props.pathname,
					        state: { from: props.location }
					      }}/>
					    ) : (
					      <Login logged={this.props.logged} 
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
})

const mapStateToProps = function(state){
	if (!_.isEmpty(state.main)) {
		var out = _.head(state.main);
		return out;
	} else return {}
}
Main = connectWithStore(store, Main, mapStateToProps);
Main = DragDropContext(HTML5Backend)(Main);
render(<Main/>, document.getElementById('root'));
