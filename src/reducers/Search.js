const initialState = {
  search: '',
  results: []
}

const search = (state = initialState, action) => {
  switch(action.type){
    case 'SET_SEARCH_QUERY':
      return {...state, search: action.search}
    default:
      return state
  }
}

export default search
