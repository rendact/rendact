const contentTypeNew = (state = [], action) => {
  switch (action.type) {
    case 'UPDATE_SLUG':
      return [
        ...state,
        {
          slug: action.slug,
          permalinkEditing: action.isEditorEnabled
        }
      ]
    case 'TOGGLE_PERMALINK_PROCESS_STATE':
      return [
        ...state,
        {
          permalinkInProcess: action.state
        }
      ]
    case 'UPDATE_POST_STATUS':
      return [
        ...state,
        {
          status: action.status
        }
      ]
    case 'RESET_POST_EDITOR':
      return [
        ...state,
        {title:"", slug:"", content:"", summary:"", featuredImage: null, imageGallery:"",
        status:"Draft", immediately:"", immediatelyStatus:false, visibilityTxt:"Public",
        permalinkEditing: false, mode: "create", titleTagLeftCharacter: 65, metaDescriptionLeftCharacter: 160}
      ]
    case 'SET_CATEGORY_LIST':
      return [
        ...state,
        {
          postCategoryList: action.catList
        }
      ]
    case 'SET_TAG_LIST':
      return [
        ...state,
        {
          postTagListInit: action.tagListInit,
          postTagList: action.tagList
        }
      ]
    case 'SET_IMAGE_GALLERY_LIST':
      return [
        ...state,
        {
          imageGallery: action.imageList
        }
      ]
    case 'SET_CONNECTION_VALUE_LIST':
      return [
        ...state,
        {
          connectionValue: action.connectionValueList
        }
      ]
    case 'SET_CONTENT_FORM':
      return [
        ...state,
        {
          title: action.values.title, content: action.values.content, summary: action.values.summary, 
          status: action.values.status, visibilityTxt: action.values.visibility, 
          publishDate: action.values.pubDate, publishDateReset: action.values.pubDate, 
          slug: action.values.slug, featuredImage: action.values.featuredImage
        }
      ]
    case 'TOGGLE_SAVE_IMMEDIATELY_MODE':
      return [
        ...state,
        {
          immediatelyStatus: action.state,
          immediately: action.time
        }
      ]
    case 'TOGGLE_PERMALINK_EDITING_STATE':
      return [
        ...state,
        {
          immediately: action.state
        }
      ]
    case 'SET_VISIBILITY_MODE':
      return [
        ...state,
        {
          visibilityTxt: action.mode
        }
      ]
    case 'SET_POST_TITLE':
      return [
        ...state,
        {
          title: action.title
        }
      ]
    case 'SET_POST_CONTENT':
      return [
        ...state,
        {
          content: action.content
        }
      ]
    case 'SET_POST_SUMMARY':
      return [
        ...state,
        {
          summary: action.summary
        }
      ]
    case 'UPDATE_TITLE_TAG_LEFT_CHAR':
      return [
        ...state,
        {
          titleTagLeftCharacter: action.length
        }
      ]
    case 'UPDATE_META_DESCRIPTION_LEFT_CHAR':
      return [
        ...state,
        {
          metaDescriptionLeftCharacter: action.length
        }
      ]
    case 'SET_POST_PUBLISH_DATE':
      return [
        ...state,
        {
          immediatelyStatus: action.immediatelyState,
          publishDate: action.date
        }
      ]
    default:
      return state
  }
}

export default contentTypeNew
