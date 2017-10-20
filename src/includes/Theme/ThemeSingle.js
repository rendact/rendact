import React from 'react';
import AdminConfig from '../../admin/AdminConfig';
import {saveConfig} from '../../utils/saveConfig';
import {getTemplateComponent, getWidgets, theMenu, theLogo, theBreadcrumb, theCommentForm} from './includes'
import forEach from 'lodash/forEach';
import {searchWidget, topPostWidget, categoriesWidget, archiveWidget, aboutUsWidget, 
        contactUsWidget, recentPostWidget} from '../widgets';
import {graphql, gql} from 'react-apollo';
import {connect} from 'react-redux'
import Loadable from 'react-loadable'
import {preload} from '../../Routes'

const NotFound = Loadable({
  loader: () => import('../../admin/NotFound'),
  loading: () => null
})

window.config = AdminConfig;

/* Theme Components */

let ThemeSingle = React.createClass({
	propTypes: {
    loadDone: React.PropTypes.bool,
		postData: React.PropTypes.object,
		config: React.PropTypes.object,
		mainMenu: React.PropTypes.object,
  },
  getDefaultProps: function() {
    return {
			loadDone: false,
			postData: {},
			config: null,
			listOfWidgets: [],
			mainMenu: null
		}
  },

  handlePostClick(e){
		e.preventDefault();
		this._reactInternalInstance._context.history.push('/')
	},

	componentDidMount(){
		var c = window.config.theme;
		require ('bootstrap/dist/css/bootstrap.css');
		require('themes/'+c.path+'/css/style.css');
		require('themes/'+c.path+'/functions.js');
    preload()
	},

	render() {
    let Single = getTemplateComponent('single')
		let SinglePost = <Single 
											postId={this.props.params.postId || this.props.params.pageId} 
											postData={this.props.postData}
											widgets={[searchWidget, topPostWidget, categoriesWidget, archiveWidget]}
											footerWidgets={[aboutUsWidget, recentPostWidget, contactUsWidget]}
											theMenu={theMenu(this.props.mainMenu)}
											theLogo={theLogo}
											theBreadcrumb={theBreadcrumb(this.handlePostClick)}
											theConfig={this.props.config}
											getWidgets={getWidgets.bind(this)}
                      loadDone={this.props.loadDone}
                      theCommentForm={theCommentForm(this.props.postId)}
										/>;

    if (this.props.params.postId || this.props.params.pageId){
      return SinglePost
    } else {
      return <NotFound/>
    }
	}
});

const mapStateToProps = function(state){
    return state.ThemeSingle || {};
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

    if (!data.loading) {

      
      return  {
      	postData: data.getPost,
        loadDone: true
      }
    } 
  }
})(ThemeSingle);

const optQry = gql`
{
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
}`

ThemeSingle = graphql(optQry, {
  props: ({ownProps, data}) => {
    if(!data.loading){

      saveConfig('listOfWidget', {})

      forEach(data.viewer.allOptions.edges, function(item){
        saveConfig(item.node.item, item.node.value);
      });

      var allMenus = data.viewer.allMenus.edges[0];
      let listOfWidgets = JSON.parse(JSON.parse(localStorage.getItem('config')).listOfWidget)
      return {
      	config: JSON.parse(localStorage.getItem('config')),
        mainMenu: allMenus ? allMenus.node : [],
        listOfWidgets,
      }
    }
  }
})(ThemeSingle)

export default ThemeSingle;
