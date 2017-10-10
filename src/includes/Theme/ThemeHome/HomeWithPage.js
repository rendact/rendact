import React from 'react'
import {gql, graphql} from 'react-apollo';
import HomeParent from './HomeParent';

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

export default HomeWithPage
