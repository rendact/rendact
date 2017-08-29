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
