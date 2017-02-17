import _ from 'lodash';

const getPageListQry = {"query": `
  query getPages{
  viewer {
    allPosts(where: {type: {eq: "page"}, deleteDate: {isNull: true}}) {
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

const getCreatePostQry = function(title, content, draft, visibility, passwordPage, 
  publishDate, userId, slug, summary, parentPage, pageOrder){
  return {
      "query": `
    mutation createPost($input: CreatePostInput!) {
        createPost(input: $input) {
          changedPost {
            id,
            title,
            content,
            summary
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

const getUpdatePostQry = function(id, title, content, draft, visibility, passwordPage, 
  publishDate, userId, slug, summary, parentPage, pageOrder){
  return {
      "query": `
    mutation updatePost($input: UpdatePostInput!) {
        updatePost(input: $input) {
          changedPost {
            title,
            content,
            summary
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

const createPostMetaMtn = function(postId, metaKeyword, metaDescription, titleTag){
  return {
    "query": 'mutation{'
    + 'insertKeyword: createPostMeta(input: {postId: "'+postId+'", item: "metaKeyword", value: "'+metaKeyword+'"}){ changedPostMeta{ id } } '
    + 'insertDescription: createPostMeta(input: {postId: "'+postId+'", item: "metaDescription", value: "'+metaDescription+'"}){ changedPostMeta{ id } } '
    + 'insertSummary: createPostMeta(input: {postId: "'+postId+'", item: "titleTag", value: "'+titleTag+'"}){ changedPostMeta{ id } } '
    + '}'
  };
}

const getPageQry = function(postId){
  return {"query": 
      '{getPost(id:"'+postId+'"){ id,title,content,slug,author{username},status,visibility,parent,order,'
      +'summary,category{edges{node{category{id,name}}}}comments{edges{node{id}}},meta{edges{node{item,value}'
      +'}}createdAt}}'
    }
  };

const deletePostQry = function(idList){
  var query = "mutation { ";
  _.forEach(idList, function(val){
    query += ' DeletePost'+val+': updatePost(input: {id: "'+val+'", deleteDate: "'+new Date()+'"}){ changedPost{ id } }'; 
  });
  query += "}";

  return {
    "query": query
  }
};

const queries = {
  getPageListQry: getPageListQry,
  getCreatePostQry: getCreatePostQry,
  getUpdatePostQry: getUpdatePostQry,
  createPostMetaMtn: createPostMetaMtn,
  getPageQry: getPageQry,
  deletePostQry: deletePostQry
}

module.exports = queries;