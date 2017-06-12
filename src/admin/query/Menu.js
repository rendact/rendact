import _ from 'lodash';

const createMenu = function(addName){
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
          "name": addName
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
}

module.exports = queries;