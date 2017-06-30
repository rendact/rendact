export const setLogged = (isLogged, pathname) => ({
  type: 'LOGGED',
  isLogged,
  pathname
})

export const maskArea = (isMasked) => ({
  type: 'MASK_AREA',
  isMasked
})

export const setStatusCounter = (count) => ({
  type: 'UPDATE_STATUS_COUNTER',
  count
})

export const initContentList = (monthList, allPostId) => ({
  type: 'INIT_CONTENT_LIST',
  monthList,
  allPostId
})

export const toggleDeleteMode = (status, state) => ({
  type: 'TOGGLE_DELETE_MODE',
  status,
  state
})

export const toggleSelectedItemState = (isSelected) => ({
  type: 'TOGGLE_SELECTED_ITEM',
  isSelected
})

export const setSlug = (slug, isEditorEnabled) => ({
  type: 'UPDATE_SLUG',
  slug,
  isEditorEnabled
})

export const togglePermalinkProcessState = (state) => ({
  type: 'TOGGLE_PERMALINK_PROCESS_STATE',
  state
})

export const setPostStatus = (status) => ({
  type: 'UPDATE_POST_STATUS',
  status
})

export const resetPostEditor = () => ({
  type: 'RESET_POST_EDITOR'
})