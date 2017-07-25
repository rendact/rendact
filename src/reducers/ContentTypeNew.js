const contentTypeNew = (state = [], action) => {
  switch (action.type) {
    case 'MASK_AREA':
      return [
        {
          isProcessing: action.isMasked,
          opacity: action.isMasked?0.4:1
        }
      ]
    case 'UPDATE_SLUG':
      return [
        {
          permalink: action.slug,
          permalinkEditing: action.isEditorEnabled
        }
      ]
    case 'TOGGLE_PERMALINK_PROCESS_STATE':
      return [
        {
          permalinkInProcess: action.state
        }
      ]
    case 'UPDATE_POST_STATUS':
      return [
        {
          status: action.status
        }
      ]
    case 'RESET_POST_EDITOR':
      return [
        {title:"", permalink:"", content:"", summary:"", featuredImage: null, imageGallery:"",
        status:"Draft", immediately:"", immediatelyStatus:false, visibilityTxt:"Public",
        permalinkEditing: false, mode: "create", titleTagLeftCharacter: 65, metaDescriptionLeftCharacter: 160}
      ]
    case 'SET_CATEGORY_LIST':
      return [
        {
          postCategoryList: action.catList
        }
      ]
    case 'SET_TAG_LIST':
      return [
        {
          postTagListInit: action.tagListInit,
          postTagList: action.tagList
        }
      ]
    case 'SET_IMAGE_GALLERY_LIST':
      return [
        {
          imageGallery: action.imageList
        }
      ]
    case 'SET_CONNECTION_VALUE_LIST':
      return [
        {
          connectionValue: action.connectionValueList
        }
      ]
    case 'SET_CONTENT_FORM':
      return [
        {
          title: action.values.title, content: action.values.content, summary: action.values.summary, 
          status: action.values.status, visibilityTxt: action.values.visibility, 
          publishDate: action.values.pubDate, publishDateReset: action.values.pubDate, 
          slug: action.values.slug, featuredImage: action.values.featuredImage
        }
      ]
    case 'TOGGLE_SAVE_IMMEDIATELY_MODE':
      return [
        {
          immediatelyStatus: action.state,
          immediately: action.time
        }
      ]
    case 'TOGGLE_PERMALINK_EDITING_STATE':
      return [
        {
          permalinkEditing: action.state
        }
      ]
    case 'SET_VISIBILITY_MODE':
      return [
        {
          visibilityTxt: action.mode
        }
      ]
    case 'SET_POST_TITLE':
      return [
        {
          title: action.title
        }
      ]
    case 'SET_POST_CONTENT':
      return [
        {
          content: action.content
        }
      ]
    case 'SET_POST_SUMMARY':
      return [
        {
          summary: action.summary
        }
      ]
    case 'UPDATE_TITLE_TAG_LEFT_CHAR':
      return [
        {
          titleTagLeftCharacter: action.length
        }
      ]
    case 'UPDATE_META_DESCRIPTION_LEFT_CHAR':
      return [
        {
          metaDescriptionLeftCharacter: action.length
        }
      ]
    case 'SET_POST_PUBLISH_DATE':
      return [
        {
          immediatelyStatus: action.immediatelyState,
          publishDate: action.date
        }
      ]
    case 'SET_FEATURED_IMAGE':
      return [
        {
          featuredImage: action.featuredImage
        }
      ]
    case 'SET_EDITOR_MODE':
      return [
        {
          mode: action.mode
        }
      ]
    case 'TOGGLE_IMAGE_GALLERY_BINDED':
      return [
        {
          imageGalleryUnbinded: action.state,
        }
      ]
    case 'SET_PAGE_LIST':
      return [
        {
          pageList: action.pageList
        }
      ]
    case 'SET_ALL_CATEGORY_LIST':
      return [
        {
          allCategoryList: action.catList
        }
      ]
    case 'SET_TAG_MAP':
      return [
        {
          tagMap: action.tagMap
        }
      ]
    case 'SET_OPTIONS':
      return [
        {
          options: action.options
        }
      ]
    case 'LOAD_FORM_DATA':
      return [
        {
          data: action.data
        }
      ]
    default:
      return state
  }
}

export default contentTypeNew
