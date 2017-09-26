import React from 'react';
import AdminConfig from '../../admin/AdminConfig';
import NotFound from '../../admin/NotFound';
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

let HomeParent = React.createClass({
	propTypes: {
    loadDone: React.PropTypes.bool,
		isSlugExist: React.PropTypes.bool,
		slug: React.PropTypes.string,
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
			config: null,
			pageCount: 1,
			activePage: 1,
			isNoConnection: false,
      mainMenu: null,
      listOfWidgets: [],
		}
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

	render(){
				let Home = getTemplateComponent('home');
				return <Home 
					data={this.props.data}
					theTitle={theTitle}
					theContent={theContent}
					theExcerpt={theExcerpt}
					theMenu={theMenu(this.props.mainMenu)}
					theLogo={theLogo}
					theImage={theImage}
					theConfig={this.props.config}
					thePagination={thePagination(this.props.pageCount, this.props.activePage, this.props.handlePageClick)}
					getWidgets={this.getWidgets}
					footerWidgets={[aboutUsWidget, recentPostWidget, contactUsWidget]}
					listOfWidgets={this.props.listOfWidgets}
				/>
	}
})


var getPost = gql`query ($postId: ID!) {
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
		comments {edges{node{id,content,name,email,website}}},
		file{edges{node{id value}}},
    tag{edges{node{id,tag{id,name}}}},
    meta{edges{node{id,item,value}}},
    createdAt
  }
}
`

let HomeWithPage = (props) => (<HomeParent {...props} data={props.data.getPost}/>)

HomeWithPage = graphql(getPost, {
  options: (props) => ({
    variables: {postId: props.config.pageAsHomePage }
  }),
})(HomeWithPage)

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

class HomeWithLatestPost extends React.Component{
  constructor(props){
    super(props)
    this.handlePageClick = this.handlePageClick.bind(this)
  }
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
	}
  render(){
    return <HomeParent {...this.props} data={this.props.latestPosts} handlePageClick={this.handlePageClick}/>
  }
}

HomeWithLatestPost.defaultProps = {
  postPerPage: 5
}

const mapStateToProps = function(state){
  if (!_.isEmpty(state.themeHome)) {
    return state.themeHome;
  } else return {}
}

HomeWithLatestPost = connect(mapStateToProps)(HomeWithLatestPost);
HomeWithLatestPost = graphql(getPostList, {
  props: ({ownProps, data}) => {
    if(!data.loading){
      var _postArr = [];
      _.forEach(data.viewer.allPosts.edges, function(item){
        _postArr.push(item.node);
      });
      var slugFound = _.find(data.viewer.allPosts.edges, {node: {slug: ownProps.slug}})

      return {
        allPosts: _postArr, 
        latestPosts: _.slice(_postArr, 0, pagePerPost), 
        pageCount: _postArr.length/pagePerPost,
        isSlugExist: slugFound!==null,
      }
    }
  },
})(HomeWithLatestPost)

class ThemeHome extends React.Component{
  render(){
    let {
      loadDone,
      config
    } = this.props
    if (!loadDone){
      return <Loading/>
    } else {

      if(config.frontPage === 'latestPost'){
        return <HomeWithLatestPost {...this.props}/>
      } else {
        return <HomeWithPage {...this.props} pageId={config.pageAsHomePage}/>
      }

    }
      
  }
}

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

      let listOfWidgets = JSON.parse(JSON.parse(localStorage.getItem('config')).listOfWidget)

      var allMenus = data.viewer.allMenus.edges[0];
      
      return  {
        config: JSON.parse(localStorage.getItem('config')),
        slug: ownProps.location.pathname.replace("/",""),
        mainMenu: allMenus ? allMenus.node : [],
        listOfWidgets,
        loadDone: true
      }
    } 
  }
})(ThemeHome);


export default ThemeHome;
