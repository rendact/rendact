import React from 'react';
import $ from 'jquery';
const jQuery = $;
window.jQuery = $;

import config from '../config';

import AdminLTEinit from './lib/app.js';
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
import '../../public/css/AdminLTE.css';
import '../../public/css/skins/_all-skins.css';

import AdminHeader from './Header';
import ControlSidebar from './ControlSidebar';
import Footer from './Footer';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import Posts from './pages/Posts';
import Pages from './pages/Pages';
import Themes from './pages/Themes';
import Plugins from './pages/Plugins';
import Users from './pages/Users';
import NewPost from './pages/PostsNew';
import NewPage from './pages/PagesNew';
import NewTheme from './pages/ThemesNew';
import NotFound from './NotFound';

require ('bootstrap');

const SideMenu = React.createClass({
	getInitialState: function() {
		return {
			activeMenu: this.props.activeMenu
		}
	},
	onClick: function(id, e){
		e.preventDefault();
		this.props.onClick(id);
		this.setState({activeMenu: id});
		$(".menu-item").removeClass("active");
		$("#menu-"+id).addClass("active");
	},
	componentDidMount: function(){
		$("#menu-"+this.state.activeMenu).addClass("active");
		$("#menu-"+this.state.activeMenu).parent("ul").parent("li").addClass("active");
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
				      					var iconClass = "fa "+item.icon;
				      					return <li key={item.id} id={"menu-"+item.id} className="menu-item" onClick={this.onClick.bind(this, item.id)}><a href={item.url}><i className={iconClass}></i> {item.label}</a></li>
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

const PageLoader = React.createClass({
	getDefaultProps: function() {
		return {pageId: "dashboard", actionId: ''}
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
			'plugins' : <Plugins />,
			'users' : <Users />,
			'posts-new' : <NewPost />,
			'pages-new' : <NewPage />,
			'theme-new' : <NewTheme />
		}
		if (map[page+action]) {
			return map[page+action]
		} else {
			return <NotFound/>
		}
	}
});


const Admin = React.createClass({
	getInitialState: function() {
		return {
			page: this.props.params['page']?this.props.params['page']:'dashboard',
			action: this.props.params['action']?this.props.params['action']:''
		}
	},
	getDefaultProps: function() {
		return { 
			params: {
				page: 'dashboard',
				action: ''
			}
		}
	},
	handleMenuClick: function(pageId){
		var pg = pageId.split("-");
		this.setState({page: pg[0], action: pg[1]?pg[1]:''})
		//PageLoader.openPage();
	},
	componentDidMount: function(){
		AdminLTEinit();
		skinning(jQuery, jQuery.AdminLTE);
	},
	render: function() {
		// switch (this.state.layout) or similar
		console.log(this.state.page);
		return (
			<div className="wrapper">
        		
        		<AdminHeader/>
  				<SideMenu onClick={this.handleMenuClick} activeMenu={this.state.page+(this.state.action?'-':'')+this.state.action}/>
				<PageLoader pageId={this.state.page} actionId={this.state.action} />
				<Footer/>
				<ControlSidebar/>
				<div className="control-sidebar-bg"></div>
            </div>
		);
	}
});

export default Admin
