import React from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import {Menu} from './Menu.js';
import { aboutUsWidget, contactUsWidget, recentPostWidget} from './widgets';
import {
  getTemplateComponent,
  getWidgets,
  theExcerpt,
  theBreadcrumb,
  goHome,
  theLogo
} from './Theme/includes';
import Query from '../admin/query';
import {gql, graphql} from 'react-apollo'

class ThemeSearch extends React.Component {
	constructor(props){
    super(props);

    this.theMenu = this.theMenu.bind(this);
    this.goHome = goHome.bind(this);
    this.theBreadcrumb = theBreadcrumb.bind(this);
    this.theLogo = theLogo.bind(this);
    this.getWidgets = getWidgets.bind(this);
    this.theExcerpt = theExcerpt.bind(this);

	}

	theMenu(){
      return <Menu goHome={this.goHome}/>
	}


  componentDidMount(){
		var c = window.config.theme;
		require ('bootstrap/dist/css/bootstrap.css');
		require('../theme/'+c.path+'/css/style.css');
		require('../theme/'+c.path+'/functions.js');
  }

  render(){
    let Search = getTemplateComponent('search');
    return <Search
          footerWidgets={[aboutUsWidget, recentPostWidget, contactUsWidget]}
          theMenu={this.theMenu}
          theLogo={this.theLogo}
          theBreadcrumb={this.theBreadcrumb}
          searchQuery={this.props.query||this.props.params.search}
          searchResults={this.props.results}
          getWidgets={this.getWidgets}
          theExcerpt={this.theExcerpt}
          opacity={this.props.opacity}
          isProcessing={this.props.isProcessing}
      />
  }
}

let query = gql`
  query ($query: String!){
    viewer {
      titleQuery: allPosts (where: {title: {like: $query}}) {
        edges {
          node {
            id
            title
            content
            slug
            author {username}
            status
            meta {
              edges {
                node {id, item, value}
              }
            }
            category {
              edges {
                node {id category { id, name } }
              }
            }
            tag {
              edges {
                node { tag { id, name } }
              }
            }
            comments {
              edges{
                node{id,content,name,email,website}
              }
            }
            file {
              edges {
                node{id,value}
              }
            }
            featuredImage
            createdAt
          }
        }
      }
    contentQuery: allPosts (where: {content: {like: $query}}) {
        edges {
          node {
            id
            title
            content
            slug
            author {username}
            status
            meta {
              edges {
                node {id, item, value}
              }
            }
            category {
              edges {
                node {id category { id, name } }
              }
            }
            tag {
              edges {
                node { tag { id, name } }
              }
            }
            comments {
              edges{
                node{id,content,name,email,website}
              }
            }
            file {
              edges {
                node{id,value}
              }
            }
            featuredImage
            createdAt
          }
        }
      }
    }
  }
  `

ThemeSearch = graphql(query, {
  options: (ownProps) => ({
    variables: {
      query: "%" + (ownProps.query || ownProps.params.search) + "%"
    }
  }),
  props: ({ownProps, data}) => {
    if(!data.loading){
      let byTitle = data.viewer.titleQuery.edges.map(item => item.node)
      let byContent = data.viewer.contentQuery.edges.map(item => item.node)
      let results = _.unionBy(byTitle, byContent, 'id')
      return {
        results,
        isProcessing: false,
        opacity: 1
      }
    }
    return {
      results: [],
      isProcessing: true,
      opacity: 0.4
    }
  }
})(ThemeSearch)


ThemeSearch = connect(
  state => {
    return {
      query: state.search.search,
  }},
)(ThemeSearch)

ThemeSearch = graphql(gql`${Query.getListOfWidget.query}`, {
  props: ({ownProps, data}) => {
    if(!data.loading){
      return {
        listOfWidgets: JSON.parse(data.getOptions.value)
      }
    }

    return {
      listOfWidgets: {}
    }
  }
})(ThemeSearch)

export default ThemeSearch
