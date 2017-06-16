import _ from 'lodash';

const createMenu = function(newMenuName){
  return {
      "query": `
    mutation createMenu($input: CreateMenuInput!) {
        createMenu(input: $input) {
          changedMenu{
            id,
            name
        }
      }
    }
    `,
      "variables": {
        "input": {
          "name": newMenuName
        }
      }
    }
  };

const getAllMenu = {
  "query": `query getMenus{
    viewer {
      allMenus {
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

const getAllCategory = {
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

const getAllPage = {
  "query": 
      'query getPages{viewer {allPosts(where: {type: {eq: "page"}}) { edges { node { id,title}}}}}'
}

const getAllPost = {
  "query": 
      'query getPages{viewer {allPosts(where: {type: {eq: "post"}}) { edges { node { id,title}}}}}'
}

const deleteMenuQry = function(idList) {
  return{
  "query": `
    mutation DeleteMenu($user: DeleteMenuInput!) {
      deleteMenu(input: $user) {
        changedMenu {
          id
        }
      }
    }
  `,
  "variables": {
    "user": {
      "id": idList
    }
  }
  }
};

const updateMenu = function(postId, name){
  return {
      "query": `
    mutation UpdateMenu($input: UpdateMenuInput!) {
        updateMenu(input: $input) {
          changedMenu{
            id,
            name
        }
      }
    }
    `,
      "variables": {
        "input": {
          "id": postId,
          "name": name
        }
      }
    }
  };

const queries = {
  createMenu: createMenu,
  getAllMenu: getAllMenu,
  deleteMenuQry: deleteMenuQry,
  updateMenu: updateMenu,
  getAllPage: getAllPage,
  getAllPost: getAllPost,
  getAllCategory: getAllCategory,
}

module.exports = queries;