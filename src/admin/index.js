import React from 'react';
import $ from 'jquery';
const jQuery = $;
window.jQuery = $;

import config from '../config';

import './lib/app.min.js';
import skinning from './lib/skinning.js';

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

const SideMenu = React.createClass({
	onClick: function(id, e){
		e.preventDefault();
		this.props.onClick(id);
	},
	render: function() {
		
		return (
			<aside className="main-sidebar">
			    <section className="sidebar">
			      <div className="user-panel user-panel-hidden">
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
				      					return <li key={item.id} className={activeClass} onClick={this.onClick.bind(this, item.id)}><a href={item.url}><i className={iconClass}></i> {item.label}</a></li>
				      				}, this)
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
					}, this)}
			      </ul>
			    </section>
			  </aside>
		)
	}
});

var fullHeight = {
	height: '100%'
}

const PageLoader = React.createClass({
	getInitialState: function() {
		return {pageId: 'dashboard', action: ''}
	},
	render: function() {
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
});


const Admin = React.createClass({
	// router params @ this.props.params
	getDefaultProps: function() {
		return {
			params: {
				page: 'dashboard',
				action: ''
			}
		}
	},
	getInitialState: function() {
		return {
			page: this.props.params['page'],
			action: this.props.params['action']
		}
	},
	handleMenuClick: function(pageId){
		this.setState({page: pageId})
		//PageLoader.openPage();
	},
	componentDidMount: function(){
		skinning(jQuery, $.AdminLTE);
	},
	render: function() {
		// switch (this.state.layout) or similar
		console.log(this.state.page);
		return (
			<div style={fullHeight}>
				<div className="wrapper" style={fullHeight}>
	        		
	        		<AdminHeader/>
	  				<SideMenu onClick={this.handleMenuClick}/>
					<PageLoader pageId={this.state.page} actionId={this.state.action} />
					<Footer/>
					<ControlSidebar/>
					<div className="control-sidebar-bg"></div>
	            </div>
	        </div>
		);
	}
});

export default Admin
