export const themeHome = (state = [], action) => {
  switch (action.type) {
    case 'SET_PAGINATION_PAGE':
      return {
          ...state,  
          latestPosts: action.latestPosts, 
          activePage: action.page
      }
    default:
      return state
  }
}

export const themeSingle = (state = [], action) => {
  switch (action.type) {
    case 'MASK_AREA':
      return [
        {
          isProcessing: action.isMasked,
          opacity: action.isMasked?0.4:1
        }
      ]
    default:
      return state
  }
}

export const themeBlog = (state = [], action) => {
  switch (action.type) {
    case 'MASK_AREA':
      return [
        {
          isProcessing: action.isMasked,
          opacity: action.isMasked?0.4:1
        }
      ]
    default:
      return state
  }
}
