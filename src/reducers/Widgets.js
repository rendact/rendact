import _ from 'lodash';
import uuid from 'uuid';

const widgets = (state = {} , action) => {
  let widgetAreas;
  switch(action.type){
    case 'LOAD_WIDGET_AREAS_SUCCESS':
      return Object.assign({}, state, 
        {widgetAreas: action.widgetAreas}
      )

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

    default:
      return state
  }
}


export default widgets;
