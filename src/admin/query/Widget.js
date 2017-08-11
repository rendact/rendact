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
}

export default queries;
