import _ from 'lodash'
import Query from '../../query'
import uuid from 'uuid'
import gql from 'graphql-tag'


export const addToWidgetArea = (widgetAreaId, widget, client) => {

    let listOfWidget = client.readQuery({query: gql`${Query.getListOfWidget.query}`})
    let widgetAreas = JSON.parse(listOfWidget.getOptions.value)
    widget = _.cloneDeep(widget)
    widget = { id: uuid(), widget: widget.item, ...JSON.parse(widget.value)}


    widgetAreas[widgetAreaId].push(widget)

    listOfWidget.getOptions.value = JSON.stringify(widgetAreas)

    client.writeQuery({
      query: gql`${Query.getListOfWidget.query}`,
      data: listOfWidget
    })

}

export const orderWidgetArea = (widgetAreaId, items, client) => {
  let listOfWidget = client.readQuery({query: gql`${Query.getListOfWidget.query}`})
  let widgetAreas = JSON.parse(listOfWidget.getOptions.value)
  // need to normalize items first
  items = _.map(items, item => (
    {id: item.id, widget: item.widget.item, ...JSON.parse(item.widget.value)}
  ))
  widgetAreas[widgetAreaId] = items

  listOfWidget.getOptions.value = JSON.stringify(widgetAreas)

    client.writeQuery({
      query: gql`${Query.getListOfWidget.query}`,
      data: listOfWidget
    })
  
}

export const clearAllWidget = (widgetAreaId, client) => {
  let listOfWidget = client.readQuery({query: gql`${Query.getListOfWidget.query}`})
  let widgetAreas = JSON.parse(listOfWidget.getOptions.value)
  widgetAreas[widgetAreaId] = []
  
  listOfWidget.getOptions.value = JSON.stringify(widgetAreas)

    client.writeQuery({
      query: gql`${Query.getListOfWidget.query}`,
      data: listOfWidget
    })
}
