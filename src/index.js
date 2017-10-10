import React from 'react';
import {render} from 'react-dom';
import Loadable from 'react-loadable';
import Loading from './admin/Loading';

const App = Loadable({
  loader: () => import(/*webpackChunkName: "app" */ /*webpackMode: "lazy"*/'./App'),
  loading: () => <Loading/>
})

render(<App/>, document.getElementById('root'));
