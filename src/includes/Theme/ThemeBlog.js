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
    this.theLogo = theLogo.bind(this);
    this.getWidgets = getWidgets.bind(this);
    this.loadMainMenu = loadMainMenu.bind(this);
    this.loadWidgets = loadWidgets.bind(this);
	}
    
	handlePostClick(e){
		e.preventDefault();
		var id = e.currentTarget.id;
		this._reactInternalInstance._context.history.push('/post/'+id)
	}

	componentWillMount(){
		this.loadMainMenu();
		var me = this;
		var categoryId = this.props.params.categoryId?this.props.params.categoryId:"";

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
	      
	      riques(Query.getPostListQry("Full", "post", "", categoryId), 
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
				
		    me.loadWidgets();
	    }
		);
		
	}

	componentWillUpdate(nextProps){
		var me = this;
		var categoryId = nextProps.params.categoryId?nextProps.params.categoryId:"";

		if (categoryId && nextProps.params.categoryId != this.props.params.categoryId) {
			me.setState({loadDone: false});
			riques(Query.getPostListQry("Full", "post", "", categoryId), 
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
	}

	componentDidMount(){
		var c = window.config.theme;
		require ('bootstrap/dist/css/bootstrap.css');
		require('../../theme/'+c.path+'/css/style.css');
		require('../../theme/'+c.path+'/functions.js');
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
							theLogo={this.theLogo}
							theMenu={this.theMenu}
							widgets={[searchWidget, topPostWidget, categoriesWidget, archiveWidget]}
							footerWidgets={[aboutUsWidget, recentPostWidget, contactUsWidget]}
						/>
		}
	}
}