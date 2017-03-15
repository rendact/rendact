import React from 'react';
import _ from 'lodash';
import $ from 'jquery';
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
import NewUser from './pages/UsersNew';
import Profile from './pages/Profile';
import NotFound from './NotFound';
import NotPermissible from './NotPermissible';

import Config from '../config';
import AdminLTEinit from './lib/app.js';
import {getMaxRole} from '../utils';

import 'jquery-ui/ui/core';
import 'bootstrap/dist/css/bootstrap.css';
import 'jquery-ui/themes/base/core.css';
import 'sweetalert2/dist/sweetalert2.min.css';

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
		window.history.pushState("", "", '/admin/'+id.replace('-','/'));
	},
	componentDidMount: function(){
		$("#menu-"+this.state.activeMenu).addClass("active");
		$("#menu-"+this.state.activeMenu).parent("ul").parent("li").addClass("active");
	},
	render: function() {
		let p = JSON.parse(localStorage.getItem("profile"));
		var image = Config.rootUrl+"/images/avatar-default.png";
    if (p.image)
      image = p.image;
		return (
			<aside className="main-sidebar">
			    <section className="sidebar">
			      <div className="user-panel user-panel-hidden">
			      	<div className="pull-left image">
			          <img src={image} className="img-circle" alt="User" />
			        </div>
			        <div className="pull-left info">
			          <p>{p.name}</p>
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
			      	{ Config.menuList.map(function(item) {
			      		var maxRole = getMaxRole();
			      		if (item.role > maxRole) return null;

			      		if (item.id === 'separator') {
			      			return <li className="header" key={item.id}>{item.label}</li>
			      		}
			      		var childItems = "";
			      		if (item.elements) {
				      		childItems = (
				      			<ul className="treeview-menu">
				      			{
				      				item.elements.map(function(item) {
				      					if (item.role > maxRole) return null;

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
		var maxRole = getMaxRole();
		var action = "";
		if (this.props.actionId) {
			action = "-"+this.props.actionId;
		}
		var map = {
			'dashboard' : <Dashboard />,
			'settings' : <Settings />,
			'profile' : <Profile />,
			'posts' : <Posts handleNav={this.props.handleNav}/>,
			'pages' : <Pages handleNav={this.props.handleNav}/>,
			'themes' : <Themes />,
			'plugins' : <Plugins />,
			'users' : <Users handleNav={this.props.handleNav}/>,
			'posts-new' : <NewPost />,
			'pages-new' : <NewPage />,
			'theme-new' : <NewTheme />,
			'users-new' : <NewUser />,
			'posts-edit' : <NewPost postId={this.props.postId}/>,
			'pages-edit' : <NewPage postId={this.props.postId}/>,
			'users-edit' : <NewUser userId={this.props.postId}/>,
		}
		
		if (Config.menuRoleValue[page+action]>maxRole){
			return <NotPermissible/>
		}
		if (map[page+action]) {
			return map[page+action]
		} else {
			return <NotFound/>
		}
	}
});


const Admin = React.createClass({
	componentDidMount: function(){
		require ('jquery-ui/themes/base/theme.css');
		require ('jquery-ui/themes/base/tooltip.css');
		require ('font-awesome/css/font-awesome.css');
		require ('../../public/css/ionicons.min.css');
		require ('../../public/css/AdminLTE.css');
		require ('../../public/css/skins/_all-skins.css');
		require ('jquery-ui/ui/widgets/tooltip')

		AdminLTEinit();
	},
	getInitialState: function() {
		return {
			page: this.props.params['page']?this.props.params['page']:'dashboard',
			action: this.props.params['action']?this.props.params['action']:'',
			postId: this.props.params['postId']?this.props.params['postId']:null
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
	handleProfileClick: function(){
		this.redirectToPage('profile')
	},
	redirectToPage: function(pageId, actionId, postId){
		if (postId) {
			this.setState({
				page: pageId,
				action: actionId,
				postId: postId
			})
			window.history.pushState("", "", '/admin/'+pageId+'/'+actionId+'/'+postId);
		} else {
			this.setState({
				page: pageId,
				action: actionId
			})
			if (actionId)
				window.history.pushState("", "", '/admin/'+pageId+'/'+actionId);
			else 
				window.history.pushState("", "", '/admin/'+pageId);
		}
	},
	handleMenuClick: function(pageId){
		var pg = pageId.split("-");
		this.setState({page: pg[0], action: pg[1]?pg[1]:''})
		//PageLoader.openPage();
	},
	handleSignout: function(){
		this.props.AuthService.logout();
		this.props.onlogin(false);
	},
	render: function() {
		if (this.props.AuthService.loggedIn()) {
			return (
				<div className="wrapper">
	        		
	        <AdminHeader authService={this.props.AuthService} handleSignout={this.handleSignout} onProfileClick={this.handleProfileClick} />
	  			<SideMenu onClick={this.handleMenuClick} activeMenu={this.state.page+(this.state.action?'-':'')+this.state.action}/>
					<PageLoader pageId={this.state.page} actionId={this.state.action} postId={this.state.postId} handleNav={this.redirectToPage}/>
					<Footer/>
					<ControlSidebar/>
					<div className="control-sidebar-bg"></div>
	      </div>
			);
		} else {
			return (
				<div className="wrapper">
				<p>Loading...</p>
				</div>
			)
		}
	}
});

export default Admin
