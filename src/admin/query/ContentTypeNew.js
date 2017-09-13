import gql from 'graphql-tag'

const getAllTags = gql`query getTags ($type: String!){
    viewer {
      allTags : allTags (where: {type: {eq: $type}}) {
        edges {
          node {
            id,
            name,
          }
        }
      }
    }
  }`

const queries = {
  getAllTags
}

export default queries
