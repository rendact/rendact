import React from 'react';
import $ from 'jquery';
window.jQuery = $;

import config from '../config';

import './lib/app.js';

import 'jquery-ui/themes/base/core.css';
import 'jquery-ui/themes/base/theme.css';
import 'jquery-ui/themes/base/tooltip.css';
import 'jquery-ui/ui/core';
import 'jquery-ui/ui/widgets/tooltip';
import 'font-awesome/css/font-awesome.css';
//import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables/media/css/jquery.dataTables.min.css';
import '../../public/css/ionicons.min.css';
import '../../public/css/AdminLTE.min.css';
import '../../public/css/skins/_all-skins.min.css';

import AdminHeader from './Header';
import ControlSidebar from './ControlSidebar';
import Footer from './Footer';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import Posts from './pages/Posts';
import Pages from './pages/Pages';
import Themes from './pages/Themes';
import NewPost from './pages/PostsNew';
import NewPage from './pages/PagesNew';
import NewTheme from './pages/ThemesNew';
import NotFound from './NotFound';

require ('bootstrap');

class SideMenu extends React.Component {
	render() {
		return (
			<aside className="main-sidebar">
			    <section className="sidebar">
			      <div className="user-panel">
			      	<div className="pull-left image">
			          <img src="../../images/avatar-default.png" className="img-circle" alt="User" />
			        </div>
			        <div className="pull-left info">
			          <p>Ali Camarata</p>
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
			      	{ config.menuList.map(function(item) {
			      		if (item.id === 'separator') {
			      			return <li className="header" key={item.id}>{item.label}</li>
			      		}
			      		var childItems = "";
			      		if (item.elements) {
				      		childItems = (
				      			<ul className="treeview-menu">
				      			{
				      				item.elements.map(function(item) {
				      					var activeClass = item.open?"active":"";
				      					var iconClass = "fa "+item.icon;
				      					return <li key={item.id} className={activeClass}><a href={item.url}><i className={iconClass}></i> {item.label}</a></li>
				      				})
				      			}
				      			</ul>
				      		);
				      	}

				      	var rootActiveClass = item.open?"active treeview":"treeview";
				      	var rootIconClass = "fa "+item.icon;
						var menuItem = (
							<li className={rootActiveClass} key={item.id}>
					          <a href="#">
					            <i className={rootIconClass}></i> <span>{item.label}</span>
					          </a>
					          {childItems}
					        </li> 
					    );
					    return menuItem;
					})}
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
		var page = this.props.pageId;
		var action = "";
		if (this.props.actionId) {
			action = "-"+this.props.actionId;
		}
		var map = {
			'dashboard' : <Dashboard />,
			'settings' : <Settings />,
			'posts' : <Posts />,
			'pages' : <Pages />,
			'themes' : <Themes />,
			'posts-new' : <NewPost />,
			'pages-new' : <NewPage />,
			'theme-new' : <NewTheme />
		}
		if (map[page+action]) {
			return map[page+action]
		} else if (action!==""){
			return <NotFound/>
		} else {
			return <Dashboard />
		}
		
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
	        		
	        		<AdminHeader/>
	  				<SideMenu/>
					<PageLoader pageId={this.props.params.page} actionId={this.props.params.action} />
					<Footer/>
					<ControlSidebar/>

	            </div>
	        </div>
		);
	}
});

export default Admin
