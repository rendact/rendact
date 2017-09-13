import React from 'react';
import AdminConfig from '../../admin/AdminConfig';
import NotFound from '../../admin/NotFound';
import LostConnection from '../../admin/LostConnection';
import Query from '../../admin/query';
import {riques, errorCallback, getValue, setValue, saveConfig, loadConfig} from '../../utils';
import {getTemplateComponent, theTitle, theContent, theExcerpt, theMenu, 
				theLogo, theImage, thePagination, theBreadcrumb, loadMainMenu, loadWidgets,
				getWidgets, goHome} from './includes'
import {Menu} from '../Menu.js';
import 'jquery-ui/ui/core';
import 'bootstrap/dist/css/bootstrap.css';
import Loading from '../../admin/Loading';
import _ from 'lodash';
import {searchWidget, topPostWidget, categoriesWidget, archiveWidget, aboutUsWidget, contactUsWidget, recentPostWidget} from '../widgets';
import Notification from 'react-notification-system';
import {setPaginationPage} from '../../actions';
import gql from 'graphql-tag'
import {graphql} from 'react-apollo';
import {connect} from 'react-redux'

window.config = AdminConfig;

/* Theme Components */

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
    this.loadWidgets = loadWidgets.bind(this);
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
		this.loadWidgets();
		
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
    require('../../theme/'+c.path+'/css/style.css');
    require('../../theme/'+c.path+'/functions.js');
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

