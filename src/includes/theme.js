import React from 'react';
import AdminConfig from '../admin/AdminConfig';
import NotFound from '../admin/NotFound';
import LostConnection from '../admin/LostConnection';
import Query from '../admin/query';
import {riques, errorCallback, getValue, setValue, loadConfig} from '../utils';
import {Menu} from './Menu.js';
import 'jquery-ui/ui/core';
import 'bootstrap/dist/css/bootstrap.css';
import Loading from '../admin/Loading';
import _ from 'lodash';
import {searchWidget, topPostWidget, categoriesWidget, archiveWidget, aboutUsWidget, contactUsWidget, recentPostWidget} from './widgets';
import Notification from 'react-notification-system';
window.config = AdminConfig;

/* Theme functions */

class InvalidTheme extends React.Component{
	componentDidMount(){
		require ('../../public/css/AdminLTE.css');
		require ('../../public/css/skins/_all-skins.css');	
		require ('font-awesome/css/font-awesome.css');
		require ('../../public/css/ionicons.min.css');
	}
	render() {
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
}

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

function theContent(content){
	return <div dangerouslySetInnerHTML={{__html: content}} />
}

function theTitle(id, title){
	return <a href={"/post/"+id} onClick={this.handlePostClick} id={id}><h4>{title}</h4></a>
}

function theExcerpt(content){
	return <div dangerouslySetInnerHTML={{__html: _.truncate(content,{"length": 100})}} />
}

function theMenu(){
  let items = this.state.mainMenu;
  return <Menu menuItems={items&&items.items?items.items:[]} goHome={this.goHome}/>
}

function theLogo(){
	return <div className="logo">
		<a href="#" onClick={this.goHome}><h1>Rend<span>act</span></h1></a>
	</div>
}

function theImage(image){
	var fImage="";
	if(image!=null){
 			fImage=image;
 		}
 		else{
 			fImage=require('../theme/default/images/logo.png');
 		}
	return <a href="article" className="mask"><img src={fImage} alt="" className="img-responsive img-thumbnail" /></a>
}

function thePagination(){
	let pages = [<li key="998" ><a href="#" onClick={this.handlePageClick}>«</a></li>];
	for(var i=0;i<this.state.pageCount;i++){
		if (this.state.activePage===i+1)
			pages.push(<li key={i}><a href="#" onClick={this.handlePageClick} disabled="true">{i+1}</a></li>)
		else 
			pages.push(<li key={i}><a href="#" onClick={this.handlePageClick}>{i+1}</a></li>)
	}
	pages.push(<li key="999"><a href="#" onClick={this.handlePageClick}>»</a></li>);
	return <div className="box-tools">
          <ul className="pagination pagination-sm no-margin">
          {pages}  
          </ul>
        </div>
}

function theBreadcrumb(){
	return <h2><a href="#" onClick={this.goHome}><h5>Home </h5></a> / PAGE</h2>
}

function goHome(e){
	e.preventDefault();
	this._reactInternalInstance._context.history.push('/')
}

function loadMainMenu(){
  riques(Query.getMainMenu, 
    (error, response, body) => {
      if (!error && !body.errors && response.statusCode === 200){
        let allMenus = body.data.viewer.allMenus.edges[0];
        this.setState({mainMenu: allMenus ? allMenus.node : []})
      }
    })
}

function getWidgets(widgetArea){
	let Widgets = [];
	var listOfWidgets = this.state.listOfWidgets[widgetArea]?this.state.listOfWidgets[widgetArea]:[];
	
	_.map(listOfWidgets,function(item){
		var widgetFn = require("./DefaultWidgets/"+item.filePath).default;
		
		Widgets.push(<div key={item.id} className="sidebar-box">
				<h3><span>{item.title}</span></h3>
					{widgetFn()}
			</div>);
	});
	
	return <div className="widgets">{Widgets}</div>;
}

/* Theme Components */

export class ThemeHome extends React.Component {
	constructor(props){
    super(props);
		this.state =  {
			loadDone: false,
			isSlugExist: false,
			slug: this.props.location.pathname.replace("/",""),
			latestPosts: [],
			config: null,
			postPerPage: 5,
			pageCount: 1,
			activePage: 1,
			isNoConnection: false,
      mainMenu: null,
      listOfWidgets: []
		};
    this.handlePostClick = this.handlePostClick.bind(this);
    this.theMenu = theMenu.bind(this);
    this.thePagination = thePagination.bind(this);
    this.loadMainMenu = loadMainMenu.bind(this);
    this.getWidgets = getWidgets.bind(this);
	}

	handlePostClick(e){
		e.preventDefault();
		var id = e.currentTarget.id;
		this._reactInternalInstance._context.history.push('/post/'+id)
	}

	handlePageClick(e){
		var page = 1;
		if (e.target.text==="«")
			page = this.state.activePage - 1;
		else if (e.target.text==="»")
			page = this.state.activePage + 1;
		else 
			page = parseInt(e.target.text, 10);
		var start = (this.state.postPerPage * page) - this.state.postPerPage;
		this.setState({latestPosts: _.slice(this.state.allPosts, start, start+this.state.postPerPage), activePage: page});
	}

	componentWillMount(){
		var me = this;

    this.loadMainMenu();

		loadConfig(function(){
			var config = JSON.parse(localStorage.getItem('config'));
			me.setState({config: config});
		});

		riques(Query.checkSlugQry(this.state.slug), 
			(error, response, body) => {
				if (!response) {
					me.setState({isNoConnection: true});
					return;
				}
	      if (!error && !body.errors && response.statusCode === 200) {
	        var slugCount = body.data.viewer.allPosts.edges.length;
	        if (slugCount > 0) {
	        	me.setState({isSlugExist: true});
	        }
	      } else {
	        me.setState({errorMsg: "error when checking slug"});
	      }

	      riques(Query.getPostListQry("Full", "post", null, null, "2"), 
		      function(error, response, body) { 
		        if (!error && !body.errors && response.statusCode === 200) {
		          var _postArr = [];
		          _.forEach(body.data.viewer.allPosts.edges, function(item){
		            _postArr.push(item.node);
		          });
		          me.setState({allPosts: _postArr, latestPosts: _.slice(_postArr, 0, me.state.postPerPage), pageCount: _postArr.length%me.state.postPerPage});
		        } else {
		          errorCallback(error, body.errors?body.errors[0].message:null);
		        }
		        me.setState({loadDone: true});
		      }
		    );

		    riques(Query.getListOfWidget, 
		    	function(error, response, body) { 
		    		if (!error && !body.errors && response.statusCode === 200) {
		    			me.setState({listOfWidgets: JSON.parse(body.data.getOptions.value)})
		    		} else {
		          errorCallback(error, body.errors?body.errors[0].message:null);
		        }
		    	}
		    );
	    }
		);
	}

	componentDidMount(){
		var c = window.config.theme;
		require ('bootstrap/dist/css/bootstrap.css');
		require('../theme/'+c.path+'/css/style.css');
		require('../theme/'+c.path+'/functions.js');
	}

	render(){
		if (!this.state.isNoConnection && !this.state.loadDone && !this.state.slug) {
			return <Loading/>
		} else if (!this.state.isNoConnection){
			if (this.state.slug){
				let Single = getTemplateComponent('single');
				if (this.state.isSlugExist)
					return <Single slug={this.state.slug}/>
				else 
					return <NotFound/>
			} else {
				let Home = getTemplateComponent('home');
				return <Home 
								latestPosts={this.state.latestPosts}
								theTitle={theTitle}
								theContent={theContent}
								theExcerpt={theExcerpt}
								theMenu={this.theMenu}
								theLogo={theLogo}
								theImage={theImage}
								theConfig={this.state.config}
								thePagination={this.thePagination}
								getWidgets={this.getWidgets}
								footerWidgets={[aboutUsWidget, recentPostWidget, contactUsWidget]}
							/>
            }
		} else {
			return <LostConnection />
		}
	}
}

export class ThemeBlog extends React.Component{
	constructor(props){
    super(props);
		this.state = {
			loadDone: false,
			isSlugExist: false,
			slug: this.props.location.pathname.replace("/",""),
			latestPosts: [],
			listOfWidgets: [],
			mainMenu: null
		};
    this.handlePostClick = this.handlePostClick.bind(this);
    this.goHome = goHome.bind(this);
    this.theMenu = theMenu.bind(this);
    this.getWidgets = getWidgets.bind(this);
    this.loadMainMenu = loadMainMenu.bind(this);
	}
    
	handlePostClick(e){
		e.preventDefault();
		var id = e.currentTarget.id;
		this._reactInternalInstance._context.history.push('/post/'+id)
	}

	componentWillMount(){
		var me = this;
		this.loadMainMenu();

		riques(Query.checkSlugQry(this.state.slug), 
			(error, response, body) => {
	      if (!error && !body.errors && response.statusCode === 200) {
	        var slugCount = body.data.viewer.allPosts.edges.length;
	        if (slugCount > 0) {
	        	me.setState({isSlugExist: true});
	        }
	      } else {
	        me.setState({errorMsg: "error when checking slug"});
	      }

	      riques(Query.getPostListQry("Full"), 
		      function(error, response, body) { 
		        if (!error && !body.errors && response.statusCode === 200) {
		          var _postArr = [];
		          _.forEach(body.data.viewer.allPosts.edges, function(item){
		            _postArr.push(item.node);
		          });
		          me.setState({latestPosts: _postArr});
		        } else {
		          errorCallback(error, body.errors?body.errors[0].message:null);
		        }
		        me.setState({loadDone: true});
		      }
		    );
	    }
		);
	}

	componentDidMount(){
		var c = window.config.theme;
		require ('bootstrap/dist/css/bootstrap.css');
		require('../theme/'+c.path+'/css/style.css');
		require('../theme/'+c.path+'/functions.js');
	}

	render() {
		if (!this.state.loadDone && this.state.slug) {
			return <Loading/>
		} else {
			let Blog = getTemplateComponent('blog');
			return <Blog 
							latestPosts={this.state.latestPosts}
							theTitle={theTitle}
							theContent={theContent}
							theExcerpt={theExcerpt}
							getWidgets={this.getWidgets}
							theMenu={this.theMenu}
							widgets={[searchWidget, topPostWidget, categoriesWidget, archiveWidget]}
							footerWidgets={[aboutUsWidget, recentPostWidget, contactUsWidget]}
						/>
		}
	}
}

export class ThemeSingle extends React.Component{
	constructor(props){
    super(props);
		this.state =  {
			loadDone: false,
			postData: false,
			config: null,
			listOfWidgets: [],
			mainMenu: null
		}

    this.goHome = goHome.bind(this);
    this.handleSingleRequest = this.handleSingleRequest.bind(this);
    this.theMenu = theMenu.bind(this);
    this.theBreadcrumb = theBreadcrumb.bind(this);
    this.theLogo = theLogo.bind(this);
    this.getWidgets = getWidgets.bind(this);
    this.loadMainMenu = loadMainMenu.bind(this);
	}

	handleSingleRequest(type, id){
    var map = {
      post: 'getPostQry',
      page: 'getPageQry',
      category: 'getCategoryQry'
    }
    var me = this

    riques(Query[map[type]](id),
      (error, response, body) => {
        if (!error && !body.errors && response.statusCode === 200){
          var data = body.data.getPost;
          me.setState({postData: data});
        } else {
          errorCallback(error, body.errors?body.errors[0].message:null)
        }
        me.setState({loadDone: true});
      }
    );
  }

  componentWillReceiveProps(newProps){
    var me = this;
    me.setState({loadDone: false})

    if (newProps.params.postId) {
      me.handleSingleRequest('post', newProps.params.postId);
    } else if (newProps.params.pageId) {
      me.handleSingleRequest('page', newProps.params.pageId);
    } else if (newProps.params.categoryId){
      alert("Category page not implemented");
      me.setState({loadDone: true});
    }
  }

	componentWillMount() {
		var me = this;
		this.loadMainMenu();
		
		loadConfig(function(){
			var config = JSON.parse(localStorage.getItem('config'));
			me.setState({config: config});
		});

    if(this.props.params.postId){
      me.handleSingleRequest('post', this.props.params.postId);
    } else if (this.props.params.pageId){
      me.handleSingleRequest('page', this.props.params.pageId);
    } else if(this.props.params.categoryId){
      alert("Category not implemented error");
      me.setState({loadDone: true});
    }
	}

	componentDidMount(){
		var c = window.config.theme;
		require ('bootstrap/dist/css/bootstrap.css');
		require('../theme/'+c.path+'/css/style.css');
		require('../theme/'+c.path+'/functions.js');
	}

	render() {
		let Single = getTemplateComponent('single');
		let SinglePost = <Single 
											postId={this.props.params.postId} 
											postData={this.state.postData}
											widgets={[searchWidget, topPostWidget, categoriesWidget, archiveWidget]}
											footerWidgets={[aboutUsWidget, recentPostWidget, contactUsWidget]}
											theMenu={this.theMenu}
											theLogo={this.theLogo}
											theBreadcrumb={this.theBreadcrumb}
											theConfig={this.state.config}
											getWidgets={this.getWidgets}
										/>;
		if (!this.state.loadDone) {
			return <Loading/>
		} else {
			if (this.props.params.postId){
				return SinglePost;
			} else if (this.props.params.pageId){
				return <SinglePost postId={this.props.params.pageId} />
			} else {
				return <NotFound/>
			}
		}
	}
}

export const getTemplates = function(){
	var template = [{
			id: "default",
			name: "Default Template"
		}];
	//var c = window.config.theme;
	try {
		//let Component = require('../theme/'+c.path+'/layouts/Template.js').default;
		template = [{
			id: "default",
			name: "Default Template"
		}]
	} catch(e) {
		
	}
	return template;
}

export class CommentForm extends React.Component{
	componentDidMount() {
  	this.notification = this.refs.notificationSystem;
	}

	handleSubmitBtn(event){
		event.preventDefault();
		var me = this;
		var author = getValue("author");
		var email = getValue("email");
		var comment = getValue("comment");
		var qry = Query.createComment(author,email,comment,this.props.postId);
	  
		riques(qry, 
			function(error, response, body){
				if(!error && !body.errors) {
					me.notification.addNotification({
							message: 'Comment has been sent',
							level: 'success',
							position: 'tr',
							autoDismiss: 5
						});
					author=setValue("author","");
					email=setValue("email","");
					comment=setValue("comment","");
				} else {
					errorCallback(error, body.errors?body.errors[0].message:null);
				}
			}
		)
	} 

	render() {
		return (
			<form onSubmit={this.handleSubmitBtn} id="commentform">
				<Notification ref="notificationSystem" />
				 <p className="comment-form-author-name"><label htmlFor="author">Name</label>
					<input id="author" className="form-control" name="author" type="text" size="30" />
				 </p>
				 <p className="comment-form-email">
					<label htmlFor="email">Email</label>
					<input id="email" className="form-control" name="email" type="text" size="30" />
				 </p>
				 <p className="comment-form-comment">
					<label htmlFor="comment">Comment</label>
					<textarea id="comment" className="form-control"></textarea>
				 </p>
				 <div className="clearfix"></div>
				<input type="submit" value="send" className="btn btn-primary btn-sm" />
			</form>
		)
	}
}
