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

    default:
      return state
  }
}


export default widgets;
