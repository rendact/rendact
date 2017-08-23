const listOfWidgets = (state = {}, action) => {
  switch(action.type) {
    case 'SET_LIST_OF_WIDGETS':
      return action.listOfWidgets
    default:
      return state
  }
}

export default listOfWidgets
