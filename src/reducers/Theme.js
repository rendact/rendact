export const themeHome = (state = {}, action) => {
  switch (action.type) {
    case 'SET_ACTIVE_PAGE':
      return {
          ...state,  
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

export const themeList = (state = [{opacity: 1}], action) => {
  switch (action.type) {
    case 'MASK_AREA':
      return [
        {
          isProcessing: action.isMasked,
          opacity: action.isMasked?0.4:1
        }
      ]
    case 'SET_THEMES_LIST':
      return state.map(item =>  ({...item, themes: action.themes, activeTheme: action.themes[0].node}))
    default:
      return state
  }
}

