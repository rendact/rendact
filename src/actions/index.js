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

export const setCategoryList = (catList) => ({
  type: 'SET_CATEGORY_LIST',
  catList
})

export const setTagList = (tagListInit, tagList) => ({
  type: 'SET_TAG_LIST',
  tagListInit,
  tagList
})

export const setImageGalleryList = (imageList) => ({
  type: 'SET_IMAGE_GALLERY_LIST',
  imageList
})

export const setConnectionValue = (connectionValueList) => ({
  type: 'SET_CONNECTION_VALUE_LIST',
  connectionValueList
})

export const setContentFormValues = (values) => ({
  type: 'SET_CONTENT_FORM',
  values
})

export const toggleSaveImmediatelyMode = (state, time) => ({
  type: 'TOGGLE_SAVE_IMMEDIATELY_MODE',
  state, time
})

export const togglePermalinkEditingState = (state) => ({
  type: 'TOGGLE_PERMALINK_EDITING_STATE',
  state
})

export const setVisibilityMode = (mode) => ({
  type: 'SET_VISIBILITY_MODE',
  mode
})

export const setPostTitle = (title) => ({
  type: 'SET_POST_TITLE',
  title
})

export const setPostContent = (content) => ({
  type: 'SET_POST_CONTENT',
  content
})

export const setPostSummary = (summary) => ({
  type: 'SET_POST_SUMMARY',
  summary
})

export const updateTitleTagLeftCharacter = (length) => ({
  type: 'UPDATE_TITLE_TAG_LEFT_CHAR',
  length
})

export const updateMetaDescriptionLeftCharacter = (length) => ({
  type: 'UPDATE_META_DESCRIPTION_LEFT_CHAR',
  length
})

export const setPostPublishDate = (date, immediatelyState) => ({
  type: 'SET_POST_PUBLISH_DATE',
  date,
  immediatelyState
})

export const setFeaturedImage = (featuredImage) => ({
  type: 'SET_FEATURED_IMAGE',
  featuredImage
})

export const setEditorMode = (mode) => ({
  type: 'SET_EDITOR_MODE',
  mode
})

export const toggleImageGalleyBinded = (state) => ({
  type: 'TOGGLE_IMAGE_GALLERY_BINDED',
  state
})

export const setPageList = (pageList) => ({
  type: 'SET_PAGE_LIST',
  pageList
})

export const setAllCategoryList = (catList) => ({
  type: 'SET_ALL_CATEGORY_LIST',
  catList
})

export const setTagMap = (tagMap) => ({
  type: 'SET_TAG_MAP',
  tagMap
})

export const setOptions = (options) => ({
  type: 'SET_OPTIONS',
  options
})

export const setNameValue = (name)  => ({
  type: 'SET_NAME_VALUE',
  name
})

export const setOptionId = (optionId)  => ({
  type: 'SET_OPTION_ID',
  optionId
})