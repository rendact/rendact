import React from 'react';
import AdminConfig from '../../admin/AdminConfig';
import NotFound from '../../admin/NotFound';
//import LostConnection from '../../admin/LostConnection';
//import Query from '../../admin/query';
import {saveConfig} from '../../utils';
import {getTemplateComponent, theTitle, theContent, theExcerpt, theMenu, 
				theLogo, theImage, thePagination} from './includes'
import 'jquery-ui/ui/core';
import 'bootstrap/dist/css/bootstrap.css';
import Loading from '../../admin/Loading';
import _ from 'lodash';
import {aboutUsWidget, contactUsWidget, recentPostWidget} from '../widgets';
import {setPaginationPage} from '../../actions';
import gql from 'graphql-tag'
import {graphql} from 'react-apollo';
import {connect} from 'react-redux'
window.config = AdminConfig;
var pagePerPost = 5;

/* Theme Components */

let ThemeHome = React.createClass({
	propTypes: {
    loadDone: React.PropTypes.bool,
		isSlugExist: React.PropTypes.bool,
		slug: React.PropTypes.string,
		latestPosts: React.PropTypes.array,
		config: React.PropTypes.object,
		postPerPage: React.PropTypes.number,
		pageCount: React.PropTypes.number,
		activePage: React.PropTypes.number,
		isNoConnection: React.PropTypes.bool,
    mainMenu: React.PropTypes.object,
    listOfWidgets: React.PropTypes.object
  },
  getDefaultProps: function() {
    return {
			loadDone: false,
			isSlugExist: false,
			slug: "",
			latestPosts: [],
			config: null,
			postPerPage: 5,
			pageCount: 1,
			activePage: 1,
			isNoConnection: false,
      mainMenu: null,
      listOfWidgets: [],
		}
  },

	handlePostClick(e){
		e.preventDefault();
		var id = e.currentTarget.id;
		this._reactInternalInstance._context.history.push('/post/'+id)
	},

	handlePageClick(e){
		var page = 1;
		if (e.target.text==="«")
			page = this.props.activePage - 1;
		else if (e.target.text==="»")
			page = this.props.activePage + 1;
		else 
			page = parseInt(e.target.text, 10);
		var start = (this.props.postPerPage * page) - this.props.postPerPage;
		var latestPosts = _.slice(this.props.allPosts, start, start+this.props.postPerPage);
		this.props.dispatch(setPaginationPage(latestPosts, page))
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

		//loadWidgets();
	},

	render(){
		
		if (!this.props.loadDone) {
			return <Loading/>
		} else {
			if (this.props.slug){
				let Single = getTemplateComponent('single');
				if (this.props.isSlugExist)
					return <Single slug={this.props.slug}/>
				else 
					return <NotFound/>
			} else {
				let Home = getTemplateComponent('home');
				return <Home 
					latestPosts={this.props.latestPosts}
					theTitle={theTitle}
					theContent={theContent}
					theExcerpt={theExcerpt}
					theMenu={theMenu(this.props.mainMenu)}
					theLogo={theLogo}
					theImage={theImage}
					theConfig={this.props.config}
					thePagination={thePagination(this.props.pageCount, this.props.activePage, this.handlePostClick)}
					getWidgets={this.getWidgets}
					footerWidgets={[aboutUsWidget, recentPostWidget, contactUsWidget]}
					listOfWidgets={this.props.listOfWidgets}
				/>
      }
		} 
	}
})

const mapStateToProps = function(state){
  if (!_.isEmpty(state.ThemeHome)) {
    return state.ThemeHome;
  } else return {}
}

ThemeHome = connect(mapStateToProps)(ThemeHome);

let getPostList = gql`
{
  viewer {
  	allPosts(where: {type: {eq: "post"}, status: {ne: ""}}) { 
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
          imageFeatured{
            blobUrl
            type
            id
          },
  				createdAt
  			}
  		}
  	}
  }
}
`

ThemeHome = graphql(getPostList, {
  props: ({ownProps, data}) => {
    if(!data.loading){
      var _postArr = [];
      _.forEach(data.viewer.allPosts.edges, function(item){
        _postArr.push(item.node);
      });
      var slugFound = _.find(data.viewer.allPosts.edges, {node: {slug: ownProps.slug}})
      debugger

      return {
          allPosts: _postArr, 
        latestPosts: _.slice(_postArr, 0, pagePerPost), 
        pageCount: _postArr.length/pagePerPost,
        isSlugExist: slugFound!==null,
      }
    }
  },
  skip: (props) => {
    if(!props.config){
      return true
    }

    return !(props.config.frontPage === 'latestPost')
  }
})(ThemeHome)

var qry = gql`query {
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

ThemeHome = graphql(qry, {
  props: ({ownProps, data}) => {
  	if (data.error){
  		return {
  			isNoConnection: true,
  		}
  	}

    if (data.viewer) {
      var _dataArr = [];

      _.forEach(data.viewer.allOptions.edges, function(item){
        saveConfig(item.node.item, item.node.value);
      });



      var allMenus = data.viewer.allMenus.edges[0];
      
      return  {
        config: JSON.parse(localStorage.getItem('config')),
        slug: ownProps.location.pathname.replace("/",""),
        mainMenu: allMenus ? allMenus.node : [],
        listOfWidgets: JSON.parse(data.getOptions.value),
        loadDone: true
      }
    } 
  }
})(ThemeHome);


export default ThemeHome;
