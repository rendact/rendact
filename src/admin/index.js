import React from 'react';
import _ from 'lodash';
import $ from 'jquery';
import AdminHeader from './Header';
import Loading from './Loading';
import ControlSidebar from './ControlSidebar';
import Footer from './Footer';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import Content from './pages/Content';
import NewContent from './pages/ContentNew';
import CategoryPost from './pages/Category';
import TagPost from './pages/Tag';
import Themes from './pages/Themes';
import Menu from './pages/Menu';
import Customize from './pages/Customize';
import Plugins from './pages/Plugins';
import Permission from './pages/Permission';
import Pages from './pages/Pages';
import Posts from './pages/Posts';
import Users from './pages/Users';
import NewPost from './pages/PostsNew';
import NewPage from './pages/PagesNew';
import NewTheme from './pages/ThemesNew';
import NewUser from './pages/UsersNew';
import Profile from './pages/Profile';
import NotFound from './NotFound';
import NotPermissible from './NotPermissible';
import ContentType from './lib/ContentType';
import NewContentType from './lib/ContentTypeNew';
import CategoryContent from './lib/CategoryContent';
import TagContent from './lib/TagContent';
import AdminConfig from './AdminConfig';
import AdminLTEinit from './lib/app.js';
import {riques, hasRole, errorCallback, getConfig, swalert} from '../utils';
import Query from './query';
import {loadConfig} from '../utils';
import {connect} from 'react-redux'
import {maskArea, toggleConfigLoad, toggleControlSidebar, toggleUnsavedDataState, setActivePage} from '../actions'

import 'jquery-ui/ui/core';
import 'bootstrap/dist/css/bootstrap.css';
import 'jquery-ui/themes/base/core.css';
import 'sweetalert2/dist/sweetalert2.min.css';

require ('bootstrap');

const SideMenu = React.createClass({
	getInitialState: function() {
		return {
			activeMenu: this.props.activeMenu,
			menuList: AdminConfig.menuList
		}
	},
	onClick: function(id, url, e){
		e.preventDefault();
		var me = this;
		var callback = function(){
			me.setState({activeMenu: id});
			$(".menu-item").removeClass("active");
			$("#menu-"+id).addClass("active");
			window.history.pushState("", "", url);
		}
		this.props.onClick(id, callback);
	},
	loadMenuOfContent: function(){
		var me = this;
    var qry = Query.getContentListQry("active");
    riques(qry, 
      function(error, response, body) { 
        if (body.data) { 
          var _dataArr = [];

          _.forEach(body.data.viewer.allContents.edges, function(item){
            _dataArr.push(
            	{id: item.node.slug, label: item.node.name, icon: item.node.menuIcon?item.node.menuIcon:'fa-drivers-license-o', open: false, role: 5, roleId: 'view-post',
								elements: [
									{id: item.node.slug, label: item.node.name, icon: 'fa-drivers-license-o', open: true, url: '/admin/'+item.node.slug, role: 5, roleId: 'view-post'},
									{id: item.node.slug+'-new', label: 'Add New', icon: 'fa-edit', open: false, url: '/admin/'+item.node.slug+'/new', role: 5, roleId: 'modify-post'},
									{id: item.node.slug+'-category', label: 'Category', icon: 'fa-edit', open: false, url: '/admin/'+item.node.slug+'/category', role: 5, roleId: 'modify-category'},
									{id: item.node.slug+'-tag', label: 'Tag', icon: 'fa-edit', open: false, url: '/admin/'+item.node.slug+'/tag', role: 5, roleId: 'modify-tag'}
								]
							}
            );
          });
          
          me.setState({menuList: _.concat(me.state.menuList, _dataArr)})
        } else {
          errorCallback(error, body.errors?body.errors[0].message:null);
        }
      }
    );
	},
	componentDidMount: function(){
		$("#menu-"+this.state.activeMenu).addClass("active");
		$("#menu-"+this.state.activeMenu).parent("ul").parent("li").addClass("active");

		this.loadMenuOfContent();
	},
	render: function() {
		let p = JSON.parse(localStorage.getItem("profile"));
		var image = getConfig('rootUrl')+"/images/avatar-default.png";
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
			      	{ this.state.menuList.map(function(item, index) {
			      		if (item.roleId) {
			      			if (!hasRole(item.roleId)) {
			      				return null
			      			}
			      		}
			      		if (item.id === 'separator') {
			      			return <li className="header" key={item.id}>{item.label}</li>
			      		}

			      		var childItems = "";
			      		if (item.elements) {
				      		childItems = (
				      			<ul className="treeview-menu">
				      			{
				      				item.elements.map(function(item) {
				      					if (item.roleId) {
							      			if (!hasRole(item.roleId)) {
							      				return null
							      			}
							      		}

				      					var iconClass = "fa "+item.icon;
				      					return <li key={item.id} id={"menu-"+item.id} className="menu-item" onClick={this.onClick.bind(this, item.id, item.url)}><a href={item.url}><i className={iconClass}></i> {item.label}</a></li>
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
	isContentType: function(page){
		var contentList = getConfig("contentList");
		var contentListIds = _.map(contentList, function(item){ return item.slug });
		return (_.indexOf(contentListIds, page) !== -1);
	},
	render: function() {
		var page = this.props.pageId;
		var action = "";
		if (this.props.actionId) {
			action = "-"+this.props.actionId;
		}
		var pid = this.props.postId;
		var hn = this.props.handleNav;
		var hud = this.props.handleUnsavedData;
		var map = {
			'dashboard' : <Dashboard />,
			'settings' : <Settings handleNav={hn}/>,
			'content' : <Content handleNav={hn}/>,
			'content-new' : <NewContent handleNav={hn}/>,
			'content-edit' : <NewContent postId={pid} handleNav={hn}/>,
			'profile' : <Profile handleNav={hn}/>,
			'posts': <Posts handleNav={hn}/>,
			'posts-bytag' : <Posts handleNav={hn} tagId={pid} />,
			'posts-bycategory' : <Posts handleNav={hn} cateId={pid}/>,
			'pages': <Pages handleNav={hn}/>,
			'posts-category' : <CategoryPost handleNav={hn}/>,
			'posts-tag' : <TagPost handleNav={hn}/>,
			'themes' : <Themes handleNav={hn}/>,
			'menu': <Menu handleNav={hn}/>,
			'themes-customize': <Customize handleNav={hn}/>,
			'users-permissions' : <Permission handleNav={hn}/>,
			'plugins' : <Plugins handleNav={hn}/>,
			'users': <Users handleNav={hn}/>,
			'posts-new' : <NewPost handleNav={hn} handleUnsavedData={hud}/>,
			'pages-new' : <NewPage handleNav={hn} handleUnsavedData={hud}/>,
			'theme-new' : <NewTheme handleNav={hn}/>,
			'users-new' : <NewUser handleNav={hn}/>,
			'posts-edit' : <NewPost postId={pid} handleNav={hn} handleUnsavedData={hud}/>,
			'pages-edit' : <NewPage postId={pid} handleNav={hn} handleUnsavedData={hud}/>,
			'users-edit' : <NewUser userId={pid} handleNav={hn}/>
		}
		
		var requiredRole = AdminConfig.MenuRoleValue[page+action];

		if (!hasRole(requiredRole) && !this.isContentType(page)){
			return <NotPermissible/>
		} else if (this.isContentType(page) && !hasRole("view-content")){
			return <NotPermissible/>
		}
		
		if (map[page+action]) {
			return map[page+action]
		} else if (this.isContentType(page)) {
			var contentList = getConfig("contentList");
			var contentData = _.find(contentList, {slug: page});
			var me = this;
			var tagId = "";
			var cateId = "";
			if (action==="-bytag"){
				tagId = this.props.postId;
			}
			if (action==="-bycategory"){
				cateId = this.props.postId;
			}
			
			let ListComponent = React.createClass({
				render: function(){
					return <ContentType 
						name={contentData.name}  
						slug={contentData.slug} 
						tableName="Post"
						postType={page}
						fields={contentData.fields}
						customFields={contentData.customFields}
						listQuery={Query.getContentPostListQry}
						viewRole="view-post"
						modifyRole="modify-post"
						statusList={["All", "Published", "Draft", "Reviewing", "Trash"]}
						handleNav={me.props.handleNav}
						tagId={tagId}
						cateId={cateId}
					/>
				}
			});

			let EditorComponent = React.createClass({
				render: function(){
					return <NewContentType 
						name={contentData.name} 
						slug={contentData.slug}
						postId={me.props.postId} 
						postType={page}
				        loadQuery={Query.getPostQry}
				        createQuery={Query.getCreatePostQry}
				        updateQuery={Query.getUpdatePostQry}
				        customFields={contentData.customFields}
				        tableName="Post"
				        widgets={["category", "featuredImage"]}
				        viewRole="view-post"
				        modifyRole="modify-post"
				        handleNav={me.props.handleNav}
					/>
				}
			});

			let CategoryComponent = React.createClass({
				render: function(){
					return <CategoryContent
						postType={page}
						slug={page}
						handleNav={me.props.handleNav}
					/>
				}
			});

			let TagComponent = React.createClass({
				render: function(){
					return <TagContent
						postType={page}
						slug={page}
						handleNav={me.props.handleNav}
					/>
				}
			});

			if (action=== '-edit' || action=== '-new')
				return <EditorComponent/>
			if (action=== '-category')
				return <CategoryComponent/>
			if (action=== '-tag')
				return <TagComponent/>
			else
				return <ListComponent/>
		} else {
			return <NotFound/>
		}
	}
});


let Admin = React.createClass({
	propTypes: {
    isProcessing: React.PropTypes.bool.isRequired,
    opacity: React.PropTypes.number.isRequired,
    page: React.PropTypes.string,
		action: React.PropTypes.string,
		postId: React.PropTypes.string,
		tagId: React.PropTypes.string,
		configLoaded: React.PropTypes.bool,
		hasUnsavedData: React.PropTypes.bool,
		showCtrlSidebar: React.PropTypes.bool
  },
  getDefaultProps: function() {
    return {
      isProcessing: false,
      opacity: 1,
      page: 'dashboard',
			action: '',
			configLoaded: false,
			hasUnsavedData: false,
			showCtrlSidebar: true,
			params: {
				page: 'dashboard',
				action: ''
			}
    }
  },
	componentDidMount: function(){
		var me = this;
		loadConfig(function(){
			me.props.dispatch(toggleConfigLoad(true))

			require ('jquery-ui/themes/base/theme.css');
			require ('jquery-ui/themes/base/tooltip.css');
			require ('font-awesome/css/font-awesome.css');
			require ('../../public/css/ionicons.min.css');
			require ('../../public/css/AdminLTE.css');
			require ('../../public/css/skins/_all-skins.css');
			require ('jquery-ui/ui/widgets/tooltip')

			AdminLTEinit();
		});

		if (this.props.page==="themes" && this.props.action==="customize") {
			me.props.dispatch(toggleControlSidebar(false))
		} else {
			me.props.dispatch(toggleControlSidebar(true))
		}

		window.onpopstate = this.onBackButtonEvent;
	},
	onBackButtonEvent:function(e){
	  e.preventDefault();
	 	this._reactInternalInstance._context.history.go(0);
	},
	setUnsavedDataState: function(state){
		this.props.dispatch(toggleUnsavedDataState(state))
	},
	confirmUnsavedData: function(callback){
		var state = true;
		var me = this;
		if (!callback)
			callback = function() {}

		if (this.state.hasUnsavedData) {
			swalert('warning','Sure want to navigate away?','You might lost some data',
	    	function(){
	    		callback.call();
	    		state = true;
	    		me.setUnsavedDataState(false);
	    	},
	    	function(){
	    		state = false;
	    	}
	    );
		} else {
			callback.call();
			state = true;
		}
		return state;
	},
	handleProfileClick: function(){
		this.redirectToPage('profile');
	},
	redirectToPage: function(pageId, actionId, postId, tagId){
		var me = this;
		this.confirmUnsavedData(
			function() {
			if (postId) {
				me.props.dispatch(setActivePage(pageId, actionId, postId))
				window.history.pushState("", "", '/admin/'+pageId+'/'+actionId+'/'+postId);
			} else {
				me.props.dispatch(setActivePage(pageId, actionId))
				if (actionId)
					window.history.pushState("", "", '/admin/'+pageId+'/'+actionId);
				else 
					window.history.pushState("", "", '/admin/'+pageId);
			}
		});
	},
	handleMenuClick: function(pageId, callback){
		var me = this;
		this.confirmUnsavedData(
			function(){
				var pg = pageId.split("-");
				me.props.dispatch(setActivePage(pg[0], pg[1]?pg[1]:''))
				callback.call();
			}
		);
	},
	handleSignout: function(){
		this.props.AuthService.logout();
		this.props.onlogin(false);
	},
	render: function() {
		if (this.props.AuthService.loggedIn() && this.props.configLoaded) {
			return (
				<div className="wrapper">
	        		
	        <AdminHeader authService={this.props.AuthService} handleSignout={this.handleSignout} onProfileClick={this.handleProfileClick} />
	  			<SideMenu onClick={this.handleMenuClick} activeMenu={this.props.page+(this.props.action?'-':'')+this.props.action}/>
					<PageLoader 
						pageId={this.props.page} 
						actionId={this.props.action} 
						postId={this.props.postId} 
						handleNav={this.redirectToPage}
						handleUnsavedData={this.setUnsavedDataState}
					/>
					<Footer/>
					{ this.props.showCtrlSidebar && 
						<ControlSidebar/>
					}
					<div className="control-sidebar-bg"></div>
	      </div>
			);
		} else {
			return (
				<Loading />
			)
		}
	}
});

const mapStateToProps = function(state){
  if (!_.isEmpty(state.admin)) {
    return _.head(state.admin)
  } else return {}
}

Admin = connect(mapStateToProps)(Admin)
export default Admin