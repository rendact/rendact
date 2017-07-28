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


const queries = {
    createWidget: createWidget
}

export default queries;
