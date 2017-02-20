import React from 'react';
import request from 'request';
import Config from '../config';
window.config = Config;
import NotFound from './NotFound';
import Query from './query';

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
		let Component = require('../theme/'+c.path+'/layouts/Home.js').default;
		if (type==="home") {
			// pass
		} else if (type==="blog") {
			Component = require('../theme/'+c.path+'/layouts/Blog.js').default;			
		} else if (type==="single") {
			Component = require('../theme/'+c.path+'/layouts/Single.js').default;			
		}

		return Component;
	} catch(e) {
		return InvalidTheme;
	}
}

const ThemeHome = React.createClass({
	getInitialState: function(){
		return {
			isSlugExist: false,
			slug: null
		}
	},
	componentWillMount: function(){
		var me = this;
		var slug = this.props.location.pathname.replace("/","");
		request({
      url: Config.scapholdUrl,
      method: "POST",
      json: true,
      headers: {
        "content-type": "application/json",
        "Authorization": "Bearer " + localStorage.token
      },
      body: Query.checkSlugQry(slug)
    }, (error, response, body) => {
      if (!error && !body.errors && response.statusCode === 200) {
        var slugCount = body.data.viewer.allPosts.edges.length;
        if (slugCount > 0) {
        	me.setState({isSlugExist: true});
        }
      } else {
        me.setState({errorMsg: "error when checking slug"});
      }
      me.setState({slug: slug});
    });
	},
	componentDidMount: function(){
		var c = window.config.theme;
		require ('bootstrap/dist/css/bootstrap.css');
		require('../theme/'+c.path+'/css/style.css');
		require('../theme/'+c.path+'/functions.js');
	},
	render: function() {
		if (this.state.slug){
			let Single = getTemplateComponent('single');
			if (this.state.isSlugExist)
				return <Single slug={this.state.slug} />
			else 
				return <NotFound/>
		} else {
			let Home = getTemplateComponent('home');
			return <Home />
		}
	}
});

const ThemeBlog = React.createClass({
	componentDidMount: function(){
		var c = window.config.theme;
		require ('bootstrap/dist/css/bootstrap.css');
		require('../theme/'+c.path+'/css/style.css');
		require('../theme/'+c.path+'/functions.js');
	},
	render: function() {
		let Blog = getTemplateComponent('blog');
		return <Blog/>;
	}
});

const ThemeSingle = React.createClass({
	componentDidMount: function(){
		var c = window.config.theme;
		require ('bootstrap/dist/css/bootstrap.css');
		require('../theme/'+c.path+'/css/style.css');
		require('../theme/'+c.path+'/functions.js');
	},
	render: function() {
		debugger;
		if (this.params.pageId){
			let Single = getTemplateComponent('single');
			return <Single postId={this.params.pageId}/>;
		} else if (this.params.postId){
			let Single = getTemplateComponent('single');
			return <Single postId={this.params.postId}/>;
		} else {
			return <NotFound/>
		}
	}
});

module.exports = {
	ThemeHome: ThemeHome,
	ThemeSingle: ThemeSingle,
	ThemeBlog: ThemeBlog
}
