import React from 'react'
import {render} from 'react-dom'
import {ApolloProvider} from 'react-apollo'
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
window.AuthService = AuthService
const store = createStore(reducer)

class Main extends React.Component {
    constructor(props){
        super(props);
        this.state = {
			logged: localStorage.getItem("token")?true:false,
			pathname: 'admin'
		};
        this.setLogged = this.setLogged.bind(this);
	}
	setLogged(state, pathname){
		var _obj = {logged: state};
		if (pathname) _obj['pathname'] = pathname;
		this.setState(_obj);
	}
	componentWillMount(){
		this.AuthService = new AuthService(this);
		this.AuthService.checkAuth(this.onlogin);
	}
	/*
	componentDidMount(){
		this.subscribe();
	}
	
	subscribe(repoName, updateQuery){
	  this.subscriptionObserver = this.refs.provider.props.client.subscribe({
		    query: Query.subscriptionQry
	  }).subscribe({
	    next(data) {
	    	console.log("Data received");
	    },
	    error(err) { 
	    	console.log(err); 
	    },
	  });
	}
	*/
	render(){
		return (
			<ApolloProvider client={client} ref="provider" store={store}>
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
						<Match pattern="/category/:categoryId?/:param1?/:param2?" component={ThemeSingle}/>
            <Match pattern="/search/:search" component={ThemeSearch}/>
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
}

Main = DragDropContext(HTML5Backend)(Main);

render(<Main/>, document.getElementById('root'));
