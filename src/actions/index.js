/* 
 * MAIN ACTIONS
 */

export const setLogged = (isLogged, pathname) => ({
  type: 'LOGGED',
  isLogged,
  pathname
})

export const setCheckAuthDone = (state) => ({
  type: 'SET_CHECK_AUTH_DONE',
  state
})

/* 
 * CONTENT LIST ACTION
 */

export const setMonthList = (monthList) => ({
  type: 'SET_MONTH_LIST',
  monthList
})

export const setPostListStatus = (postListStatus) => ({
  type: 'SET_POST_LIST_STATUS',
  postListStatus
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

export const toggleStatusEditMode = (mode) => ({
  type: 'TOGGLE_STATUS_EDIT_MODE',
  mode
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

export const toggleVisibilityIsChangedProcess = (status) => ({
  type: 'TOGGLE_VISIBILITY_IS_CHANGED_PROCESS',
  status
})

export const setPostId = (postId) => ({
  type: 'SET_POST_ID',
  postId
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

export const toggleFeaturedImageBindingStatus = (status) => ({
  type: 'TOGGLE_FEATURED_IMAGE_BINDING_STATUS',
  status
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

export const setDateBirthAndTimezone = (dateOfBirth, timeZone) => ({
  type: 'SET_DATEBIRTH_TIMEZONE',
  dateOfBirth,
  timeZone
})

export const setAvatar = (avatar)  => ({
  type: 'SET_AVATAR',
  avatar
})

export const loadFormData = (data)  => ({
  type: 'LOAD_FORM_DATA',
  data
})

export const setResetDelete = ()  => ({
  type: 'SET_RESET_DELETE'
})

export const setLoadMenu = (treeData, position)  => ({
  type: 'SET_LOAD_MENU',
  treeData,
  position
})

export const setHandleMenuName = (menuId, treeData)  => ({
  type: 'SET_HANDLE_MENU_NAME',
  menuId,
  treeData
})

export const setTreeData = (treeData)  => ({
  type: 'SET_TREE_DATA',
  treeData
})

export const setNewMenuName = (newMenuName)  => ({
  type: 'SET_NEW_MENU_NAME',
  newMenuName
})

export const setSelectedMenuName = (selectedMenuName)  => ({
  type: 'SET_SELECTED_MENU_NAME',
  selectedMenuName
})

export const setNewMenuId = (newMenuId)  => ({
  type: 'SET_NEW_MENU_ID',
  newMenuId
})

export const setIdMainMenu = (IdMainMenu)  => ({
  type: 'SET_ID_MAIN_MENU',
  IdMainMenu
})

export const setPageListMenu = (pageList)  => ({
  type: 'SET_PAGE_LIST_MENU',
  pageList
})

export const setMenuStructure = (menuStructure)  => ({
  type: 'SET_MENU_STRUCTURE',
  menuStructure
})

export const setMenuId = (menuId, treeData)  => ({
  type: 'SET_MENU_ID',
  menuId
})

export const setAllPageList = (allPageList)  => ({
  type: 'SET_ALL_PAGE_LIST',
  allPageList
})

export const setAllPostList = (allPostList)  => ({
  type: 'SET_ALL_POST_LIST',
  allPostList
})

export const setCategoryMenu = (categoryList)  => ({
  type: 'SET_CATEGORY_LIST',
  categoryList
})

export const setDisabled = (disabled)  => ({
  type: 'SET_DISABLED',
  disabled
})

export const assignValueToMenuItem = (menuId, name, value) => ({
  type: 'ASSIGN_VALUE_TO_MENU_ITEM',
  menuId,
  name,
  value
});

export const loadmenuSelect = (menuSelect)  => ({
  type: 'LOAD_MENU_SELECT',
  menuSelect
})

export const setprevState = (prevState)  => ({
  type: 'SET_PREV_STATE',
  prevState
})

export const setUrlMenu = (url)  => ({
  type: 'SET_URL_MENU',
  url
})

export const setPosition = (position)  => ({
  type: 'SET_POSITION',
  position
})

export const setmarginRight = (marginRight)  => ({
  type: 'SET_MARGINRIGHT',
  marginRight
})

export const toggleSelectAll = (state, listType) => ({
  type: 'TOGGLE_SELECT_ALL',
  state,
  listType
})

/* 
 * WIDGET MANAGEMENT PAGE ACTION
 */

export const loadWidgetAreasSuccess = (widgetAreas) => ({
  type: 'LOAD_WIDGET_AREAS_SUCCESS',
  widgetAreas
})

export const addWidgetToWidgetArea = (widgetAreaId, widget) => ({
  type: 'ADD_WIDGET_TO_WIDGET_AREA',
  widgetAreaId,
  widget
})

export const removeAllWidgetsFromWidgetArea = (widgetAreaId) => ({
  type: 'REMOVE_ALL_WIDGETS_FROM_WIDGET_AREA',
  widgetAreaId
})

export const removeSingleWidgetFromWidgetArea = (widgetId, widgetAreaId) => ({
  type: 'REMOVE_SINGLE_WIDGET_FROM_WIDGET_AREA',
  widgetId,
  widgetAreaId
})

export const updateWidgetsOrder = (widgetAreaId, widgets) => ({
  type: 'UPDATE_WIDGETS_ORDER',
  widgetAreaId,
  widgets
});

export const loadWidgetsAvailableSuccess = (widgets) => ({
  type: 'LOAD_WIDGETS_AVAILABLE_SUCCESS',
  widgets
});

export const createActiveWidgetsInitialValues = (activeWidgets) => ({
  type: 'CREATE_ACTIVE_WIDGETS_INITIAL_VALUES',
  activeWidgets
})

export const setListOfWidgets = (listOfWidgets) => ({
  type: 'SET_LIST_OF_WIDGETS',
  listOfWidgets
});

export const setWidgetData = (widgetData) => ({
  type: 'SET_WIDGET_DATA',
  widgetData
})
/* 
 * SEARCH ACTIONS
 */

export const setSearchQuery = (search) => ({
  type: 'SET_SEARCH_QUERY',
  search
})

export const setSearchResults = (results) => ({
  type: 'SET_SEARCH_RESULTS',
  results
})


/* 
 * ADMIN ACTIONS
 */


export const toggleUnsavedDataState = (state)  => ({
  type: 'TOGGLE_UNSAVED_DATA',
  state
})

export const toggleConfigLoadState = (state)  => ({
  type: 'TOGGLE_CONFIG_LOAD',
  state
})

export const toggleControlSidebarState = (state)  => ({
  type: 'TOGGLE_CONTROL_SIDEBAR',
  state
})

export const setActivePage = (pageId, actionId, postId)  => ({
  type: 'SET_ACTIVE_PAGE',
  pageId,
  actionId,
  postId
})

export const setActiveMenuId = (menuId) => ({
  type: 'SET_ACTIVE_MENU_ID',
  menuId
})

/*
 * THEME ACTIONS
 */

 export const setActivePageOnPagination = (page) => ({
  type: 'SET_ACTIVE_PAGE',
  page
 })

/*
 * Settings actions
 */

export const setTab = (tab) => ({
  type: 'SET_TAB',
  tab
})
