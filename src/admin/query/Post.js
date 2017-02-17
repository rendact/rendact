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
        category{
          edges{
            node{
              category {
                id
                name
              }
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

const getAllCategoryQry = {
  "query": `query getCategories{
    viewer {
      allCategories {
        edges {
          node {
            id,
            name
          }
        }
      }
    }
  }`
}

const getPostQry = function(postId){
  return {"query": 
      '{getPost(id:"'+postId+'"){ id,title,content,slug,author{username},status,visibility,parent,order,'
      +'summary,category{edges{node{category{id,name}}}}comments{edges{node{id}}},meta{edges{node{item,value}'
      +'}}createdAt}}'
    }
  };


const queries = {
  getPostListQry: getPostListQry,
  getAllCategoryQry: getAllCategoryQry,
  getPostQry: getPostQry
}

module.exports = queries;