import React from 'react'
import {render} from 'react-dom'
import {BrowserRouter, Match, Miss} from 'react-router'

import Theme from './theme';
import Admin from './admin'

render((
	<BrowserRouter>
		<div id="router">
			<Match pattern="/admin/:a?/:b?/:c?/:d?/:e?/:f?/:g?/:h?/:i?/:j?" component={Admin}/>
			<Miss component={Theme}/>
		</div>
	</BrowserRouter>
), document.getElementById('root'))
