import React from 'react';
import AdminConfig from '../../admin/AdminConfig';
import LostConnection from '../../admin/LostConnection';
import Query from '../../admin/query';
import {riques, errorCallback, getValue, setValue,  loadConfig} from '../../utils';
import {saveConfig} from '../../utils/saveConfig'
import {getTemplateComponent, theTitle, theContent, theExcerpt, theMenu, 
				theLogo, theImage, thePagination, theBreadcrumb, loadMainMenu, loadWidgets,
				getWidgets, goHome} from './includes'
import {Menu} from '../Menu.js';
import Loading from '../../admin/Loading';
import forEach from 'lodash/forEach'
import {searchWidget, topPostWidget, categoriesWidget, archiveWidget, aboutUsWidget, contactUsWidget, recentPostWidget} from '../widgets';
import gql from 'graphql-tag'
import {graphql} from 'react-apollo';
import {connect} from 'react-redux'
import Loadable from 'react-loadable'
import {preload} from '../../Routes'

const NotFound = Loadable({
  loader: () => import('../../admin/NotFound'),
  loading: () => null
})
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
	componentDidMount(){
		var c = window.config.theme;
		require ('bootstrap/dist/css/bootstrap.css');
		require(c.path+'/css/style.css');
		require(c.path+'/functions.js');
    preload()
	},

	render() {
		if (!this.props.loadDone && this.props.slug) {
			return <Loading/>
		} else {
      let Blog = getTemplateComponent('blog')
			return <Blog 
							latestPosts={this.props.latestPosts}
							theTitle={theTitle}
							theContent={theContent}
							theExcerpt={theExcerpt}
							getWidgets={getWidgets.bind(this)}
							theLogo={theLogo}
							theMenu={theMenu(this.props.mainMenu)}
							widgets={[searchWidget, topPostWidget, categoriesWidget, archiveWidget]}
							footerWidgets={[aboutUsWidget, recentPostWidget, contactUsWidget]}
						/>
		}
	}
});

const mapStateToProps = function(state){
    return state.ThemeBlog||{};
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

      forEach(data.viewer.allOptions.edges, function(item){
        saveConfig(item.node.item, item.node.value);
      });

      forEach(data.viewer.allPosts.edges, function(item){
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
