import _ from 'lodash';

const getPageListQry = {"query": `
  query getPages{
  viewer {
    allPosts(where: {type: {eq: "page"}, status: {ne: "Deleted"}}) {
      edges {
        node {
          id
          title,
          slug,
          author {
            username
          },
          status,
          comments{
            edges{
              node{
                id
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

  const getPageDelQry = {"query": `
      query getPages{
        viewer {
          allPosts(where: {type: {eq: "page"}, status: {eq: "Deleted"}}) {
            edges {
              node {
                id
                title,
                slug,
                author {
                  username
                },
                status,
                comments{
                  edges{
                    node{
                      id
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
      


const getCreatePageQry = function(title, content, draft, visibility, passwordPage, 

  publishDate, userId, slug, summary, parentPage, pageOrder){
  return {
      "query": `
    mutation createPost($input: CreatePostInput!) {
        createPost(input: $input) {
          changedPost {
            id,
            title,
            content,
            summary,
            meta {
              edges {
                node {
                  id
                }
              }
            }
        }
      }
    }
    `,
      "variables": {
        "input": {
          "title": title,
          "content": content,
          "status": draft,
          "visibility": visibility,
          "passwordPage": passwordPage,
          "publishDate": publishDate,
          "type": "page",
          "authorId": userId,
          "slug": slug,
          "summary": summary,
          "parent": parentPage,
          "order": pageOrder
        }
      }
    }
  };

const getUpdatePageQry = function(id, title, content, draft, visibility, passwordPage, 
  publishDate, userId, slug, summary, parentPage, pageOrder){
  return {
      "query": `
    mutation updatePost($input: UpdatePostInput!) {
        updatePost(input: $input) {
          changedPost {
            id,
            title,
            content,
            summary,
            meta {
              edges {
                node {
                  id
                }
              }
            }
        }
      }
    }
    `,
      "variables": {
        "input": {
          "id": id,
          "title": title,
          "content": content,
          "status": draft,
          "visibility": visibility,
          "passwordPage": passwordPage,
          "publishDate": publishDate,
          "type": "page",
          "authorId": userId,
          "slug": slug,
          "summary": summary,
          "parent": parentPage,
          "order": pageOrder
        }
      }
    }
  };

const createPostMetaMtn = function(postId, metaKeyword, metaDescription, titleTag, pageTemplate){
  return {
    "query": 'mutation{'
    + 'insertKeyword: createPostMeta(input: {postId: "'+postId+'", item: "metaKeyword", value: "'+metaKeyword+'"}){ changedPostMeta{ id } } '
    + 'insertDescription: createPostMeta(input: {postId: "'+postId+'", item: "metaDescription", value: "'+metaDescription+'"}){ changedPostMeta{ id } } '
    + 'insertTitleTag: createPostMeta(input: {postId: "'+postId+'", item: "titleTag", value: "'+titleTag+'"}){ changedPostMeta{ id } } '
    + 'insertTemplate: createPostMeta(input: {postId: "'+postId+'", item: "pageTemplate", value: "'+pageTemplate+'"}){ changedPostMeta{ id } } '
    + '}'
  };
}

const updatePostMetaMtn = function(postMetaId, postId, metaKeyword, metaDescription, titleTag, pageTemplate){
  return {
    "query": 'mutation{'
    + 'insertKeyword: updatePostMeta(input: {id: "'+postMetaId+'", postId: "'+postId+'", item: "metaKeyword", value: "'+metaKeyword+'"}){ changedPostMeta{ id } } '
    + 'insertDescription: updatePostMeta(input: {id: "'+postMetaId+'", postId: "'+postId+'", item: "metaDescription", value: "'+metaDescription+'"}){ changedPostMeta{ id } } '
    + 'insertTitleTag: updatePostMeta(input: {id: "'+postMetaId+'", postId: "'+postId+'", item: "titleTag", value: "'+titleTag+'"}){ changedPostMeta{ id } } '
    + 'insertTemplate: updatePostMeta(input: {id: "'+postMetaId+'", postId: "'+postId+'", item: "template", value: "'+pageTemplate+'"}){ changedPostMeta{ id } } '
    + '}'
  };
}


const getPageQry = function(postId){
  return {"query": 
      '{getPost(id:"'+postId+'"){ id,title,content,slug,author{username},status,visibility,parent,publishDate,order,'
      +'summary,category{edges{node{category{id,name}}}}comments{edges{node{id}}},meta{edges{node{item,value}'
      +'}}createdAt}}'
    }
  };

const deletePostQry = function(idList){
  var query = "mutation { ";
  _.forEach(idList, function(val, index){
    query += ' DeletePost'+index+' : updatePost(input: {id: "'+val+'", status: "Deleted", deleteDate: "'+new Date()+'"}){ changedPost{ id } }'; 
  });
  query += "}";

  return {
    "query": query
  }
};

const deletePostPermanentQry = function(idList){
  var query = "mutation { ";
  _.forEach(idList, function(val, index){
    query += ' DeletePost'+index+' : deletePost(input: {id: "'+val+'"}){ changedPost{ id } }'; 
  });
  query += "}";

  return {
    "query": query
  }
};

const recoverPostQry = function(idList){
  var query = "mutation { ";
  _.forEach(idList, function(val, index){
    query += ' RecoverPost'+index+' : updatePost(input: {id: "'+val+'", status: "Published", deleteDate: ""}){ changedPost{ id } }'; 
  });
  query += "}";

  return {
    "query": query
  }
};


const checkSlugQry = function(slug){
  return {
    query: 'query checkSlug{ viewer { allPosts(where: {type: {eq: "page"}, slug: {like: "'+slug+'"}}) { edges { node { id } } } } }'
  }
}

const queries = {
  getPageListQry: getPageListQry,
  getPageDelQry: getPageDelQry,
  getCreatePageQry: getCreatePageQry,
  getUpdatePageQry: getUpdatePageQry,
  createPostMetaMtn: createPostMetaMtn,
  updatePostMetaMtn: updatePostMetaMtn,
  getPageQry: getPageQry,
  deletePostQry: deletePostQry,
  deletePostPermanentQry: deletePostPermanentQry,
  checkSlugQry: checkSlugQry,
  recoverPostQry: recoverPostQry
}

module.exports = queries;