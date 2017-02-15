const getPostListQry = {"query": `
  query getPosts{
  viewer {
    allPosts(where: {type: {eq: "post"}}) {
      edges {
        node{
        id
        title,
        author{
          username
        },
        status,
        categories{
          edges{
            node{
              name
            }
          }
        },
        createdAt
      }
      }
    }
  }
  } 
`};

const queries = {
  getPostListQry: getPostListQry
}

module.exports = queries;