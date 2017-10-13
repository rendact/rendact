import React from 'react'
import {BrowserRouter, Match, Miss} from 'react-router'
import MatchWhenAuthorized from './auth'

import {render} from 'react-dom'
import {ApolloProvider} from 'react-apollo'
import client from './apollo'
import reducer from './reducers'
import DragDropContext from 'react-dnd/lib/DragDropContext';
import HTML5Backend from 'react-dnd-html5-backend';
import createStore from 'redux/lib/createStore'
import * as Routes from './Routes'

let Main = React.createClass({
	render(){
		return (
				<BrowserRouter>
					<div id="router" style={{height: "100vh"}}>
							<MatchWhenAuthorized pattern="/admin/:page?/:action?/:postId?" component={Routes.Admin}/>
              <Match pattern="/page/:postId?/:param1?/:param2?" component={Routes.ThemeSingle} />
              <Match pattern="/post/:postId?/:param1?/:param2?" component={Routes.ThemeSingle} />
              <Match pattern="/blog/:postId?/:param1?/:param2?" component={Routes.ThemeBlog} />
              <Match pattern="/category/:categoryId?/:param1?/:param2?" component={Routes.ThemeBlog} />
              <Match pattern="/search/:search" component={Routes.ThemeSearch}/>
              <Match pattern="/register/:param1?" component={Routes.Register}/>
              <Match pattern="/login/:param1?" component={Routes.Login}/>
              <Miss component={Routes.ThemeHome} />
					</div>
				</BrowserRouter>
		)
	}
})

const store = createStore(reducer, {})
Main = DragDropContext(HTML5Backend)(Main);
render(<ApolloProvider client={client} store={store}><Main/></ApolloProvider>, document.getElementById('root'));
