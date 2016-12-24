import './index.css'

import React from 'react'
import Home from './layouts/Home';
import Page from './layouts/Page';
import Post from './layouts/Post';

const Theme = React.createClass({
	getDefaultProps: function() {
		// Since using router's miss, replicate the params prop here...
		return {params: location.pathname.split("/").slice(1)};
	},
	getInitialState: function() {
		console.log(this.props.params);
		// Query if match any content (page, post, etc) and pass to below
		// Below is just a temporary for example...
		return {layout: "Home"};
	},
	render: function() {
		switch (this.state.layout) {
			case "Home":
				return <Home/>;
			case "Page":
				return <Page/>;
			case "Post":
				return <Post/>;
			default:
				throw new Error("Invalid layout defined!");
		}
	}
});

export default Theme
