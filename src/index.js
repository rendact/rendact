import React from 'react'
import {render} from 'react-dom'
import {ApolloProvider} from 'react-apollo'
import client from './apollo'
import reducer from './reducers'
import DragDropContext from 'react-dnd/lib/DragDropContext';
import HTML5Backend from 'react-dnd-html5-backend';
import createStore from 'redux/lib/createStore'
import Loading from './admin/Loading';
import Loadable from 'react-loadable';

let Main = Loadable({
  loader: () => import(/* webpackChunkName: "app" */'./main'),
  loading: () => <Loading/>
})
const store = createStore(reducer, {})
Main = DragDropContext(HTML5Backend)(Main);
render(<ApolloProvider client={client} store={store}><Main/></ApolloProvider>, document.getElementById('root'));
