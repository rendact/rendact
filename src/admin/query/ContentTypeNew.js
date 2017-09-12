import gql from 'graphql-tag'

const getAllTags = gql`query getTags ($type: String!, $postId: ID!){
    viewer {
      allTags : allTags (where: {type: {eq: $type}}) {
        edges {
          node {
            id,
            name,
          }
        }
      }
currentTags:  allTagOfPosts(where: {postId: {eq: $postId}}){
    edges{
      node{
        id
        tag{
          name
          id
        }
      }
    }
  }
    }
  }`

const queries = {
  getAllTags
}

export default queries
