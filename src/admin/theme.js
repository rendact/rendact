import React from 'react';
import request from 'request';
import Config from '../config';
window.config = Config;
import NotFound from './NotFound';
import Query from './query';

import 'jquery-ui/ui/core';
import 'bootstrap/dist/css/bootstrap.css';

const LoadingPage = React.createClass({
	componentDidMount: function(){
		require ('../../public/css/AdminLTE.css');
		require ('../../public/css/skins/_all-skins.css');	
		require ('font-awesome/css/font-awesome.css');
		require ('../../public/css/ionicons.min.css');
	},
	render: function() {
		return (
			<div>
			<h2 style={{marginTop:100,width:"100%",textAlign:"center"}}><i className="fa fa-spin fa-refresh"></i> Loading page...</h2>
			</div>
		)
	}
});

const InvalidTheme = React.createClass({
	componentDidMount: function(){
		require ('../../public/css/AdminLTE.css');
		require ('../../public/css/skins/_all-skins.css');	
		require ('font-awesome/css/font-awesome.css');
		require ('../../public/css/ionicons.min.css');
	},
	render: function() {
		return (
			<div className="content-wrapper" style={{minHeight: 1126}}>
			    <section className="content-header">
			      <h1>Error Page</h1>
			    </section>

			    <section className="content">
			      <div className="error-page">
			        <div className="error-content">
			          <h3><i className="fa fa-warning text-red"></i> Oops! Something went wrong.</h3>
			          <p>We will work on fixing that right away.</p>
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
			loadDone: false,
			isSlugExist: false,
			slug: this.props.location.pathname.replace("/","")
		}
	},
	componentWillMount: function(){
		var me = this;

		request({
      url: Config.scapholdUrl,
      method: "POST",
      json: true,
      headers: {
        "content-type": "application/json"
      },
      body: Query.checkSlugQry(this.state.slug)
    }, (error, response, body) => {
      if (!error && !body.errors && response.statusCode === 200) {
        var slugCount = body.data.viewer.allPosts.edges.length;
        if (slugCount > 0) {
        	me.setState({isSlugExist: true});
        }
      } else {
        me.setState({errorMsg: "error when checking slug"});
      }
      me.setState({loadDone: true});
    });
	},
	componentDidMount: function(){
		var c = window.config.theme;
		require ('bootstrap/dist/css/bootstrap.css');
		require('../theme/'+c.path+'/css/style.css');
		require('../theme/'+c.path+'/functions.js');
	},
	render: function() {
		if (!this.state.loadDone && this.state.slug) {
			return <LoadingPage/>
		} else {
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
