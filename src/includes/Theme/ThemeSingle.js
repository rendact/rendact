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

let ThemeSingle = React.createClass({
	propTypes: {
    loadDone: React.PropTypes.bool,
		postData: React.PropTypes.bool,
		config: React.PropTypes.object,
		mainMenu: React.PropTypes.object,
    listOfWidgets: React.PropTypes.object
  },
  getDefaultProps: function() {
    return {
			loadDone: false,
			postData: false,
			config: null,
			listOfWidgets: [],
			mainMenu: null
		}
  },

  handlePostClick(e){
		e.preventDefault();
		var id = e.currentTarget.id;
		this._reactInternalInstance._context.history.push('/')
	},

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
		let Single = getTemplateComponent('single');
		let SinglePost = <Single 
											postId={this.props.params.postId} 
											postData={this.props.postData}
											widgets={[searchWidget, topPostWidget, categoriesWidget, archiveWidget]}
											footerWidgets={[aboutUsWidget, recentPostWidget, contactUsWidget]}
											theMenu={theMenu(this.props.mainMenu)}
											theLogo={theLogo}
											theBreadcrumb={theBreadcrumb(this.handlePostClick)}
											theConfig={this.props.config}
											getWidgets={this.getWidgets}
										/>;
		if (!this.props.loadDone) {
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
});

const mapStateToProps = function(state){
  if (!_.isEmpty(state.ThemeSingle)) {
    return state.ThemeSingle;
  } else return {}
}

ThemeSingle = connect(mapStateToProps)(ThemeSingle);

var qry = gql`query ($postId: ID!) {
	getPost(id:$postId){ 
		id,
		title,
		content,
		slug,
		author{username},
		status,
		visibility,
    imageFeatured {
      id
      blobUrl
    },
		summary,
		category{edges{node{id, category{id,name}}}},
		comments{edges{node{id,content,name,email,website}}},
		file{edges{node{id value}}},
    tag{edges{node{id,tag{id,name}}}},
    meta{edges{node{id,item,value}}},
    createdAt
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

ThemeSingle = graphql(qry, {
	options: (props) => {
		return { 
			variables: { 
				postId: props.params.postId
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
    	var _postData = [];

    	if (data.getPost){
    		_postData = data.getPost
    	} else if (data.viewer.allPosts)

      _.forEach(data.viewer.allOptions.edges, function(item){
        saveConfig(item.node.item, item.node.value);
      });

      var allMenus = data.viewer.allMenus.edges[0];
      
      return  {
      	postData: data.getPost,
      	config: JSON.parse(localStorage.getItem('config')),
        mainMenu: allMenus ? allMenus.node : [],
        listOfWidgets: JSON.parse(data.getOptions.value),
        loadDone: true
      }
    } 
  }
})(ThemeSingle);

export default ThemeSingle;
