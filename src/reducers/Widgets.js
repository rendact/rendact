import _ from 'lodash';
import uuid from 'uuid';

const widgets = (state = {} , action) => {
  switch(action.type){
    case 'LOAD_WIDGET_AREAS_SUCCESS':
      return Object.assign({}, state, 
        {widgetAreas: action.widgetAreas}
      )

    case 'ADD_WIDGET_TO_WIDGET_AREA':
      let widget = action.widget
      let widgetAreas = _.map(state.widgetAreas, was => {
        if (was.id === action.id) {
          widget.id = uuid()
          was.widgets.push(widget)
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
