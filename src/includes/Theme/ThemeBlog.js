import React from 'react';
import AdminConfig from '../../admin/AdminConfig';
import NotFound from '../../admin/NotFound';
import LostConnection from '../../admin/LostConnection';
import Query from '../../admin/query';
import {riques, errorCallback, getValue, setValue,  loadConfig} from '../../utils';
import {saveConfig} from '../../utils/saveConfig'
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

let ThemeBlog = React.createClass({
	propTypes: {
    loadDone: React.PropTypes.bool,
		isSlugExist: React.PropTypes.bool,
		slug: React.PropTypes.string,
		mainMenu: React.PropTypes.object,
    listOfWidgets: React.PropTypes.object,
    latestPosts: React.PropTypes.object
  },
  getDefaultProps: function() {
    return {
			loadDone: false,
			isSlugExist: false,
			//slug: this.props.location.pathname.replace("/",""),
			slug: "",
			latestPosts: [],
			listOfWidgets: [],
			mainMenu: null
		}
  },
    
	handlePostClick(e){
		e.preventDefault();
		var id = e.currentTarget.id;
		this._reactInternalInstance._context.history.push('/post/'+id)
	},
/*
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
		
	},

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
	},
*/
	
	getWidgets(widgetArea){
		let Widgets = [];

	  // add checking if the component has implemented with redux or not
	  let listOfWidgets = this.props.listOfWidgets[widgetArea]?this.props.listOfWidgets[widgetArea]:[];
		
		_.map(listOfWidgets,function(item){
			var widgetFn = require("../DefaultWidgets/"+item.filePath).default;
			
			Widgets.push(<div key={item.id} className="sidebar-box">
					<h3><span>{item.title}</span></h3>
						{widgetFn(item.id, item.widget)}
				</div>);
		});
		
		return <div className="widgets">{Widgets}</div>;
	},
	
	componentDidMount(){
		var c = window.config.theme;
		require ('bootstrap/dist/css/bootstrap.css');
		require('../../theme/'+c.path+'/css/style.css');
		require('../../theme/'+c.path+'/functions.js');
	},

	render() {
		if (!this.props.loadDone && this.props.slug) {
			return <Loading/>
		} else {
			let Blog = getTemplateComponent('blog');
			return <Blog 
							latestPosts={this.props.latestPosts}
							theTitle={theTitle}
							theContent={theContent}
							theExcerpt={theExcerpt}
							getWidgets={this.getWidgets}
							theLogo={theLogo}
							theMenu={theMenu(this.props.mainMenu)}
							widgets={[searchWidget, topPostWidget, categoriesWidget, archiveWidget]}
							footerWidgets={[aboutUsWidget, recentPostWidget, contactUsWidget]}
						/>
		}
	}
});

const mapStateToProps = function(state){
  if (!_.isEmpty(state.ThemeBlog)) {
    return state.ThemeBlog;
  } else return {}
}

ThemeBlog = connect(mapStateToProps)(ThemeBlog);

var qry = gql`query ($categoryId: ID!) {
	viewer {
  	allPosts(where: {type: {eq: "post"}, status: {ne: ""}, category: {category: {id: {eq: $categoryId}}}}) { 
  		edges { 
  			node { 
  				id,
  				title,
  				content,
  				slug,
  				author{username},
  				status,
  				meta{edges{node{id,item,value}}},
  				category{edges{node{id,category{id, name}}}},
  				tag{edges{node{tag{id, name}}}},
  				comments{edges{node{id,content,name,email,website}}},
  				file{edges{node{id,value}}}, 
  				featuredImage,
  				createdAt
  			}
  		}
  	}
  }

	viewer {
    allOptions {
      edges {
        node {
          id,
          item,
          value
        }
      }
    }
  }

  viewer {
    allMenus(where: {position: {eq: "Main Menu"}}) { 
      edges {
        node { 
          id,
          name, 
          items
        }
      }
    }
  }

  getOptions(id: "T3B0aW9uczo1NQ=="){
     value
  }  
}`

ThemeBlog = graphql(qry, {
	options: (props) => {
		return { 
			variables: { 
				slug: props.location.pathname.replace("/",""),
				categoryId: props.params.categoryId
			} 
		}
	},
  props: ({ownProps, data}) => {
  	if (data.error){
  		return {
  			isNoConnection: true
  		}
  	}

    if (data.viewer) {
    	var _dataArr = [];
    	var _postArr = [];
	    //var slugCount = data.viewer.allPosts.edges.length;

      _.forEach(data.viewer.allOptions.edges, function(item){
        saveConfig(item.node.item, item.node.value);
      });

      _.forEach(data.viewer.allPosts.edges, function(item){
        _postArr.push(item.node);
      })

      var allMenus = data.viewer.allMenus.edges[0];
      
      return  {
      	latestPosts: _postArr,
      	config: JSON.parse(localStorage.getItem('config')),
        mainMenu: allMenus ? allMenus.node : [],
        listOfWidgets: JSON.parse(data.getOptions.value),
        loadDone: true,
        slug: ownProps.location.pathname.replace("/","")
        //isSlugExist: slugCount > 0
      }
    } 
  }
})(ThemeBlog);

export default ThemeBlog;
