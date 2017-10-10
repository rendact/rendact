import React from 'react';
import forEach from 'lodash/forEach'
import {saveConfig} from '../../../utils/saveConfig';
import gql from 'graphql-tag'
import {graphql} from 'react-apollo';
import Loadable from 'react-loadable'



const HomeParent = Loadable({
  loader: () => import(/* webpackChunkName: "homeparent" */'./HomeParent'),
  loading: () => null
})
const HomeWithLatestPost = Loadable({
  loader: () => import(/* webpackChunkName: "homewithpostlist" */'./HomeWithPostList'),
  loading: () => null
})
const  HomeWithPage= Loadable({
  loader: () => import(/* webpackChunkName: "homewithpage" */'./HomeWithPage'),
  loading: () => null
})

class ThemeHome extends React.Component{
  render(){
    if (!this.props.loadDone){
      return <HomeParent {...this.props}/>
    }

    if(this.props.config.frontPage === 'latestPost'){
      return <HomeWithLatestPost {...this.props}/>
    } else {
      return <HomeWithPage {...this.props} pageId={this.props.config.pageAsHomePage}/>
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

    if (!data.loading) {

      forEach(data.viewer.allOptions.edges, function(item){
        saveConfig(item.node.item, item.node.value);
      });

      if (!JSON.parse(localStorage.getItem('config')).listOfWidget) {
        saveConfig("listOfWidget", {})
      }

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
