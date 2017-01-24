import $ from 'jquery';
window.jQuery = $;

import React from 'react';
import Config from '../config';
window.config = Config;

import 'jquery-ui/ui/core';
import 'bootstrap/dist/css/bootstrap.css';


const InvalidTheme = React.createClass({
	componentDidMount: function(){
		require ('../../public/css/AdminLTE.css');
		require ('../../public/css/skins/_all-skins.css');	
	},
	render: function() {
		return (
			<div className="content-wrapper" style={{minHeight: 1126}}>
			    <section className="content-header">
			      <h1>
			        Error Page
			      </h1>
			    </section>

			    <section className="content">

			      <div className="error-page">

			        <div className="error-content">
			          <h3><i className="fa fa-warning text-red"></i> Oops! Something went wrong.</h3>

			          <p>
			            We will work on fixing that right away.
			          </p>

			        </div>
			      </div>

			    </section>
			  </div>
		)
	}
});

function getTemplateComponent(type){
	var c = window.config.theme;
	
	if (c.name==null || c.path==null) {
		return InvalidTheme;
	}

	try {
		let Component = require('../theme/'+c.path+'/index.js').default;
		if (type==="home") {
			// pass
		} else if (type==="post") {
			Component = require('../theme/'+c.path+'/layouts/Post.js').default;			
		} else if (type==="page") {
			Component = require('../theme/'+c.path+'/layouts/Page.js').default;			
		}

		return Component;
	} catch(e) {
		return InvalidTheme;
	}
}

const ThemeHome = React.createClass({
	render: function() {
		let Home = getTemplateComponent('home');
		return <Home />
	}
});

const ThemeSingle = React.createClass({
	render: function() {
		let Post = getTemplateComponent('post');
		return <Post/>;
	}
});

const ThemePage = React.createClass({
	render: function() {
		let Page = getTemplateComponent('page');
		return <Page/>;
	}
});

module.exports = {
	ThemeHome: ThemeHome,
	ThemeSingle: ThemeSingle,
	ThemePage: ThemePage
}
