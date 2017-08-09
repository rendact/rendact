const widgets = (state = {} , action) => {
  switch(action.type){
    case 'LOAD_WIDGET_AREAS_SUCCESS':
      return Object.assign({}, state, 
        {widgetAreas: action.widgetAreas}
      )
    default:
      return state
  }
}


export default widgets;
