import React from 'react';
import AdminConfig from '../../admin/AdminConfig';
import saveConfig from '../../utils/saveConfig';
import {getTemplateComponent,    theMenu, theLogo,   theBreadcrumb,   } from './includes'
import 'jquery-ui/ui/core';
import 'bootstrap/dist/css/bootstrap.css';
import _ from 'lodash';
import {searchWidget, topPostWidget, categoriesWidget, archiveWidget, aboutUsWidget, contactUsWidget, recentPostWidget} from '../widgets';
import {graphql, gql} from 'react-apollo';
import {connect} from 'react-redux'
import Loadable from 'react-loadable'

const NotFound = Loadable({
  loader: () => new Promise((resolve) =>
    require.ensure(['../../admin/NotFound'], () => resolve(require('../../admin/NotFound')),
	 'themenotfound')),
  loading: () => null
})

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
											postId={this.props.params.postId || this.props.params.pageId} 
											postData={this.props.postData}
											widgets={[searchWidget, topPostWidget, categoriesWidget, archiveWidget]}
											footerWidgets={[aboutUsWidget, recentPostWidget, contactUsWidget]}
											theMenu={theMenu(this.props.mainMenu)}
											theLogo={theLogo}
											theBreadcrumb={theBreadcrumb(this.handlePostClick)}
											theConfig={this.props.config}
											getWidgets={this.getWidgets}
                      loadDone={this.props.loadDone}
										/>;

    if (this.props.params.postId || this.props.params.pageId){
      return SinglePost
    } else {
      return <NotFound/>
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

      _.forEach(data.viewer.allOptions.edges, function(item){
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
