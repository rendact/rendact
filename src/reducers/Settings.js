const initialState = {
  tab: 'general'
}

const settings = (state = initialState,  action) => {
  switch (action.type) {
    case 'SET_TAB':
      return {...state, tab: action.tab}
    default:
      return state
  }
}

export default settings
