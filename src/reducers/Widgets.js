import _ from 'lodash';
import uuid from 'uuid';

const widgets = (state = {} , action) => {
  let widgetAreas;
  switch(action.type){
    case 'LOAD_WIDGET_AREAS_SUCCESS':
      return Object.assign({}, state, 
        {widgetAreas: action.widgetAreas}
      )

    case 'LOAD_WIDGETS_AVAILABLE_SUCCESS':
      return Object.assign({}, state,
        { widgetsAvailable: action.widgets }
      );

    case 'ADD_WIDGET_TO_WIDGET_AREA':
      widgetAreas = _.map(state.widgetAreas, was => {
        if (was.id === action.widgetAreaId) {
          action.widget.id = uuid()
          was.widgets.push(action.widget)
        }
        return was
      });

      return Object.assign({}, state,
        {widgetAreas: widgetAreas}
      );

    case 'REMOVE_ALL_WIDGETS_FROM_WIDGET_AREA':
      widgetAreas = _.map(state.widgetAreas, was => {
        if (was.id === action.widgetAreaId){
          was.widgets = []
        }
        return was
      });

      return Object.assign({}, state,
        {widgetAreas: widgetAreas}
      );

    case 'REMOVE_SINGLE_WIDGET_FROM_WIDGET_AREA':
      widgetAreas = _.map(state.widgetAreas, wa => {
        if (wa.id === action.widgetAreaId) {
          // remove single using _.filter
          wa.widgets = _.filter(wa.widgets, w => ( w.id !== action.widgetId ))
        }
        return wa
      });

      return Object.assign({}, state,
        {widgetAreas: widgetAreas}
      );

    case 'UPDATE_WIDGETS_ORDER':
      widgetAreas = _.map(state.widgetAreas, wa => {
        if(wa.id === action.widgetAreaId){
          wa.widgets = action.widgets
        }
        return wa
      });


      return Object.assign({}, state, 
        {widgetAreas: widgetAreas}
      );

    case 'CREATE_ACTIVE_WIDGETS_INITIAL_VALUES':
      let nodes = action.activeWidgets
      let activeWidgetsInitials = {}

      _.forEach(nodes, node => {
        let uuid = node.node.item.split("#")[1]
        activeWidgetsInitials[uuid] = JSON.parse(JSON.parse(node.node.value))
      });

      return {...state, activeWidgetsInitials}

    default:
      return state
  }
}


export default widgets;
