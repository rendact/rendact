import './index.css'

import React from 'react'
//import Dashboard from './views/Dashboard';

const Admin = React.createClass({
	// router params @ this.props.params
	getDefaultProps: function() {},
	getInitialState: function() {
		console.log(this.props.params);
		return this.props.params;
		// Query if params match page and pass to switch below..
		// ie. return {page: "Plugins"};
	},
	render: function() {
		// switch (this.state.layout) or similar
		return (
			<div id="admin">
				<h1>Admin section</h1>
			</div>
		);
	}
});

export default Admin
