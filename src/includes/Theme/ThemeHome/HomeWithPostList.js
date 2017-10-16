import React from 'react';
import {gql, graphql} from 'react-apollo';
import {connect} from 'react-redux';
import HomeParent from './HomeParent';
import {setActivePageOnPagination} from '../../../actions/setActivePageOnPagination';

var pagePerPost = 5;
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
    this.postSliced = this.postSliced.bind(this)
  }

	handlePageClick(e){
		var page = 1;
		if (e.target.text==="«")
			page = this.props.activePage - 1 || this.props.activePage;
		else if (e.target.text==="»")
			page = this.props.activePage + 1 || this.props.activePage;
		else 
			page = parseInt(e.target.text, 10);
    this.props.dispatch(setActivePageOnPagination(page))
	}

  postSliced(){
    let page = this.props.activePage 
    let start = (this.props.postPerPage * page) - this.props.postPerPage
    return this.props.allPosts ?  this.props.allPosts.slice (start, start+this.props.postPerPage) : null
  }

  render(){
    return <HomeParent {...this.props} data={this.postSliced()} handlePageClick={this.handlePageClick}/>
  }
}

HomeWithLatestPost.defaultProps = {
  postPerPage: 5,
  activePage: 1
}

const mapStateToProps = function(state){
  return state.themeHome || {}
}

HomeWithLatestPost = connect(mapStateToProps)(HomeWithLatestPost);
HomeWithLatestPost = graphql(getPostList, {
  props: ({ownProps, data}) => {
    if(!data.loading){
      var _postArr = data.viewer.allPosts.edges.map(item => item.node)
      var slugFound = data.viewer.allPosts.edges.find((el) => (el.node.slug === ownProps.slug))

      return {
        allPosts: _postArr, 
        pageCount: _postArr.length/pagePerPost,
        isSlugExist: slugFound!==null,
      }
    }
  },
})(HomeWithLatestPost)

export default HomeWithLatestPost
