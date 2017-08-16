const createWidget = (item, value) => {
    return {
        "query":`
        mutation RegisterWidget($input: CreateOptionsInput!) {
          createOptions(input: $input) {
            changedOptions {
              id
              item
              value
            }
          }
        }`,

        "variables": 
        {
          "input": {
            "item": item,
            "value": value
          }
        }
    }

}

const getListOfWidget = {
  query: `
    query {
     getOptions(id: "T3B0aW9uczo1NQ=="){
       value
     }
    }
  `
}

const updateListOfWidget = (value) => ({
  "query": `
  mutation UpdateListOfWidet($input: UpdateOptionsInput!) {
    updateOptions(input: $input) {
      changedOptions {
        item
        value
      }
    }
  }`,
  "variables": {
    "input": {
      "id": "T3B0aW9uczo1NQ==",
      "value": value
    }
  }
});

const getAllWidgets = {
    "query": `
    query getAllWidgets {
      viewer {
        allOptions(where: {item: {like: "widget_%"}}) {
          edges {
            node {
              id
              item
              value
            }
          }
        }
      }
    }
    `
}


const queries = {
  createWidget: createWidget,
  getAllWidgets: getAllWidgets,
  updateListOfWidget: updateListOfWidget,
  getListOfWidget: getListOfWidget
}

export default queries;
