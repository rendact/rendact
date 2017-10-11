import React from 'react'
import BrowserRouter from 'react-router/BrowserRouter'
import Match from 'react-router/Match'
import Miss from 'react-router/Miss'
import MatchWhenAuthorized from './auth'

import {render} from 'react-dom'
import {ApolloProvider} from 'react-apollo'
import client from './apollo'
import reducer from './reducers'
import DragDropContext from 'react-dnd/lib/DragDropContext';
import HTML5Backend from 'react-dnd-html5-backend';
import createStore from 'redux/lib/createStore'
import Loading from './admin/Loading';
import Loadable from 'react-loadable';


const Admin = Loadable({
  loader: () =>import(/* webpackChunkName: "admin"*/'./admin'),
  loading: () => <Loading/>
})
const ThemeSingle = Loadable({
  loader: () =>  import(/* webpackChunkName: "ThemeSingle"*/ './includes/Theme/ThemeSingle'),
  loading: () => null
})
const ThemeBlog = Loadable({
  loader: () =>  import(/* webpackChunkName: "ThemeBlog"*/ './includes/Theme/ThemeBlog'),
  loading: () => <Loading/>
})
const ThemeSearch = Loadable({
  loader: () =>  import(/* webpackChunkName: "Themesearch"*/ './includes/themeSearch'),
  loading: () => <Loading/>
})
const Register = Loadable({
  loader: () =>  import(/* webpackChunkName: "register"*/ './register'),
  loading: () => <Loading/>
})
const Login = Loadable({
loader: () =>  import(/* webpackChunkName: "login"*/ './login'),
loading: () => <Loading/>
})
const ThemeHome = Loadable({
loader: () => import(/* webpackChunkName: "themehome" */'./includes/Theme/ThemeHome'),
loading: () => <Loading/>
})

let Main = React.createClass({
	render(){
		return (
				<BrowserRouter>
					<div id="router" style={{height: "100vh"}}>
							<MatchWhenAuthorized pattern="/admin/:page?/:action?/:postId?" component={Admin}/>
              <Match pattern="/page/:postId?/:param1?/:param2?" component={ThemeSingle} />
              <Match pattern="/post/:postId?/:param1?/:param2?" component={ThemeSingle} />
              <Match pattern="/blog/:postId?/:param1?/:param2?" component={ThemeBlog} />
              <Match pattern="/category/:categoryId?/:param1?/:param2?" component={ThemeBlog} />
              <Match pattern="/search/:search" component={ThemeSearch}/>
              <Match pattern="/register/:param1?" component={Register}/>
              <Match pattern="/login/:param1?" component={Login}/>
              <Miss component={ThemeHome} />
					</div>
				</BrowserRouter>
		)
	}
})

const store = createStore(reducer, {})
Main = DragDropContext(HTML5Backend)(Main);
render(<ApolloProvider client={client} store={store}><Main/></ApolloProvider>, document.getElementById('root'));
