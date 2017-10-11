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


let Main = React.createClass({
	render(){
		return (
				<BrowserRouter>
					<div id="router" style={{height: "100vh"}}>
							<MatchWhenAuthorized pattern="/admin/:page?/:action?/:postId?" 
                component={props => {
              const Admin = Loadable({
                loader: () =>import(/* webpackChunkName: "admin"*/'./admin'),
                loading: () => <Loading/>
              })
                  return <Admin {...props}/>
                }}
								/>
              <Match pattern="/page/:postId?/:param1?/:param2?" render={props=>{
                  const ThemeSingle = Loadable({
                    loader: () =>  import(/* webpackChunkName: "ThemeSingle"*/ './includes/Theme/ThemeSingle'),
                    loading: () => null
                  })
                return <ThemeSingle {...props} />             }} />
              <Match pattern="/post/:postId?/:param1?/:param2?" render={props =>{
                  const ThemeSingle = Loadable({
                    loader: () =>  import(/* webpackChunkName: "ThemeSingle"*/ './includes/Theme/ThemeSingle'),
                    loading: () => null
                  })
                return <ThemeSingle {...props} />             }} />
              <Match pattern="/blog/:postId?/:param1?/:param2?" render={props => {
                  const ThemeBlog = Loadable({
                    loader: () =>  import(/* webpackChunkName: "ThemeBlog"*/ './includes/Theme/ThemeBlog'),
                    loading: () => <Loading/>
                  })
                return <ThemeBlog {...props}/>
              }} />
            <Match pattern="/category/:categoryId?/:param1?/:param2?" render={props => {
                  const ThemeBlog = Loadable({
                    loader: () =>  import(/* webpackChunkName: "ThemeBlog"*/ './includes/Theme/ThemeBlog'),
                    loading: () => <Loading/>
                  })
                return <ThemeBlog {...props}/>
            }} />
          <Match pattern="/search/:search" render={props => {
                  const ThemeSearch = Loadable({
                    loader: () =>  import(/* webpackChunkName: "Themesearch"*/ './includes/themeSearch'),
                    loading: () => <Loading/>
})
            return <ThemeSearch {...props}/>
          }}/>
        <Match pattern="/register/:param1?" render={props => {
                  const Register = Loadable({
                    loader: () =>  import(/* webpackChunkName: "register"*/ './register'),
                    loading: () => <Loading/>
                  })

          return <Register {...props}/>

        }}/>
              <Match pattern="/login/:param1?" render={props=> {
                const Login = Loadable({
                  loader: () =>  import(/* webpackChunkName: "login"*/ './login'),
                  loading: () => <Loading/>
                })
                return <Login {...props}/>
              }}/>
            <Miss render={props => {
                const ThemeHome = Loadable({
                  loader: () => import(/* webpackChunkName: "themehome" */'./includes/Theme/ThemeHome'),
                  loading: () => <Loading/>
                })

                return <ThemeHome {...props}/>
                }} />
					</div>
				</BrowserRouter>
		)
	}
})

const store = createStore(reducer, {})
Main = DragDropContext(HTML5Backend)(Main);
render(<ApolloProvider client={client} store={store}><Main/></ApolloProvider>, document.getElementById('root'));
