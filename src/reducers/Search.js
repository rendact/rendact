const initialState = {
  search: '',
  results: []
}

const search = (state = initialState, action) => {
  switch(action.type){
    case 'SET_SEARCH_QUERY':
      return {...state, search: action.search}
    case 'SET_SEARCH_RESULTS':
      return {...state, results: action.results}
    default:
      return state
  }
}

export default search
