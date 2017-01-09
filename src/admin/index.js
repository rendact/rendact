import React from 'react';
import './lib/app.min.js';

import 'jquery-ui/themes/base/core.css';
import 'jquery-ui/themes/base/theme.css';
import 'jquery-ui/themes/base/tooltip.css';
import 'jquery-ui/ui/core';
import 'jquery-ui/ui/widgets/tooltip';

import '../../public/css/bootstrap.min.css';
import '../../public/css/ionicons.min.css';
import '../../public/css/AdminLTE.css';
import '../../public/css/skins/_all-skins.min.css';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import Posts from './pages/Posts';
import Pages from './pages/Pages';
import Themes from './pages/Themes';
import NewPost from './pages/NewPost';
import NewPage from './pages/NewPage';
import NewTheme from './pages/NewTheme';
import logoImage from '../../public/images/logo-white-230x85.png';

class SideMenu extends React.Component {
	render() {
		return (
			<aside className="main-sidebar">
			    <section className="sidebar">
			      <div className="user-panel">
			      	<a className="" href="/admin" class="logo" style={{"padding-bottom": 20, "display": "block"}}>
				      <img src={logoImage} style={{"max-width": 200}} />
				    </a>
			        <div className="pull-left image">
			          <img src="../../images/avatar-default.png" className="img-circle" alt="User" />
			        </div>
			        <div className="pull-left info">
			          <p>Alexander Pierce</p>
			          <a href="#"><i className="fa fa-circle text-success"></i> Online</a>
			        </div>
			      </div>
			      <form action="#" method="get" className="sidebar-form">
			        <div className="input-group">
			          <input type="text" name="q" className="form-control" placeholder="Search..."/>
			              <span className="input-group-btn">
			                <button type="submit" name="search" id="search-btn" className="btn btn-flat"><i className="fa fa-search"></i>
			                </button>
			              </span>
			        </div>
			      </form>
			      <ul className="sidebar-menu">
			        <li className="active treeview">
			          <a href="/admin/dashboard">
			            <i className="fa fa-dashboard"></i> <span>Dashboard</span>
			          </a>
			          <ul className="treeview-menu">
			            <li className="active"><a href="/admin/settings"><i className="fa fa-circle-o"></i> Settings</a></li>
			            <li><a href="#"><i className="fa fa-circle-o"></i> Content Type</a></li>
			          </ul>
			        </li>
			        <li className="treeview">
			          <a href="#">
			            <i className="fa fa-files-o"></i>
			            <span>Posts</span>
			          </a>
			          <ul className="treeview-menu">
			            <li><a href="/admin/new-post"><i className="fa fa-circle-o"></i> Add New</a></li>
			            <li><a href="/admin/posts"><i className="fa fa-circle-o"></i> List</a></li>
			            <li><a href="#"><i className="fa fa-circle-o"></i> Categories</a></li>
			          </ul>
			        </li>
			        <li className="treeview">
			          <a href="#">
			            <i className="fa fa-th"></i> <span>Pages</span>
			          </a>
			          <ul className="treeview-menu">
			            <li><a href="/admin/new-page"><i className="fa fa-circle-o"></i> Add New</a></li>
			            <li><a href="/admin/pages"><i className="fa fa-circle-o"></i> List</a></li>
			          </ul>
			        </li>
			        <li className="treeview">
			          <a href="#">
			            <i className="fa fa-pie-chart"></i>
			            <span>Themes</span>
			          </a>
			          <ul className="treeview-menu">
			            <li><a href="/admin/new-theme"><i className="fa fa-circle-o"></i> Install</a></li>
			            <li><a href="/admin/themes"><i className="fa fa-circle-o"></i> Configure</a></li>
			          </ul>
			        </li>
			        <li className="treeview">
			          <a href="#">
			            <i className="fa fa-laptop"></i>
			            <span>Plugins</span>
			          </a>
			          <ul className="treeview-menu">
			            <li><a href="#"><i className="fa fa-circle-o"></i> Install</a></li>
			            <li><a href="#"><i className="fa fa-circle-o"></i> Configure</a></li>
			          </ul>
			        </li>
			        <li className="header">HELP</li>
			        <li><a href="#"><i className="fa fa-circle-o text-red"></i> <span>F.A.Q</span></a></li>
			        <li><a href="#"><i className="fa fa-circle-o text-yellow"></i> <span>RendactWiki</span></a></li>
			      </ul>
			    </section>
			  </aside>
		)
	}
}

var fullHeight = {
	height: '100%'
}

class PageLoader extends React.Component{
	render() {
		var map = {
			'dashboard' : <Dashboard />,
			'settings' : <Settings />,
			'posts' : <Posts />,
			'pages' : <Pages />,
			'themes' : <Themes />,
			'new-post' : <NewPost />,
			'new-page' : <NewPage />,
			'new-theme' : <NewTheme />
		}

		return map[this.props.pageId]
	}
}


const Admin = React.createClass({
	// router params @ this.props.params
	getDefaultProps: function() {},
	getInitialState: function() {
		if (this.props.params['page']==null)
			this.props.params['page'] = 'dashboard';
		
		return this.props.params;
		// Query if params match page and pass to switch below..
		// ie. return {page: "Plugins"};
	},
	render: function() {
		// switch (this.state.layout) or similar
		console.log(this.props.params);
		return (
			<div className="hold-transition skin-blue sidebar-mini" style={fullHeight}>
				<div className="wrapper" style={fullHeight}>
	        		<header className="main-header">
	    				<nav className="navbar navbar-static-top">
		        		
		        		</nav>
	  				</header>
	  				<SideMenu/>
	  				
					<PageLoader pageId={this.props.params.page} />
	            </div>
	        </div>
		);
	}
});

export default Admin
