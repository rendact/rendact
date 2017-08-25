import _ from 'lodash';

const contentTypeNew = (state = [], action) => {
  console.log(action.type)
  switch (action.type) {
    case 'EMPTY_POST_ID':
      return state.map(item => ({...item, postId: ""}))

    case 'MASK_AREA':
      return state.map(item =>  ({...item, isProcessing: action.isMasked, opacity: action.isMasked?0.4:1}))
    
    case 'UPDATE_SLUG':
      return state.map(item =>  ({...item, permalink: action.slug, permalinkEditing: action.isEditorEnabled}))
    
    case 'TOGGLE_PERMALINK_PROCESS_STATE':
      return state.map(item =>  ({...item, permalinkInProcess: action.state}))
    
    case 'UPDATE_POST_STATUS':
      return state.map(item =>  ({...item, status: action.status}))
    
    case 'RESET_POST_EDITOR':
        let data = {postId: "", initialValues:{}, data:{}, title:"", permalink: "", content:"", summary:"", featuredImage: null, imageGallery:[],
        status:"Draft", immediately:"", immediatelyStatus:false, visibilityTxt:"Public",
        permalinkEditing: false, mode: "create", titleTagLeftCharacter: 65, metaDescriptionLeftCharacter: 160}
      return state.map(item => ({...item, ...data}))
    
    case 'SET_CATEGORY_LIST':
      return state.map(item =>  ({...item, postCategoryList: action.catList}))
    
    case 'SET_TAG_LIST':
      return state.map(item =>  ({...item, postTagListInit: action.tagListInit, postTagList: action.tagList}))
    
    case 'SET_IMAGE_GALLERY_LIST':
      return state.map(item =>  ({...item, imageGallery: action.imageList}))
    
    case 'SET_CONNECTION_VALUE_LIST':
      return state.map(item =>  ({...item, connectionValue: action.connectionValueList}))
    
    case 'SET_CONTENT_FORM':
       return state.map(item =>  ({...item,
          title: action.values.title, content: action.values.content, summary: action.values.summary, 
          status: action.values.status, visibilityTxt: action.values.visibility, 
          publishDate: action.values.pubDate, publishDateReset: action.values.pubDate, 
          permalink: action.values.slug, featuredImage: action.values.featuredImage
      }))

    case 'TOGGLE_SAVE_IMMEDIATELY_MODE':
      return state.map(item =>  ({...item, immediatelyStatus: action.state, immediately: action.time}))
    
    case 'TOGGLE_PERMALINK_EDITING_STATE':
      return state.map(item =>  ({...item, permalinkEditing: action.state}))
    
    case 'SET_VISIBILITY_MODE':
      return state.map(item =>  ({...item, visibilityTxt: action.mode}))
    
    case 'SET_POST_TITLE':
      return state.map(item =>  ({...item, title: action.title}))
    
    case 'SET_POST_CONTENT':
      return state.map(item =>  ({...item, content: action.content}))
    
    case 'SET_POST_SUMMARY':
      return state.map(item =>  ({...item,  summary: action.summary}))
   
    case 'UPDATE_TITLE_TAG_LEFT_CHAR':
      return state.map(item =>  ({...item, titleTagLeftCharacter: action.length}))
    
    case 'UPDATE_META_DESCRIPTION_LEFT_CHAR':
      return state.map(item =>  ({...item, metaDescriptionLeftCharacter: action.length}))
    
    case 'SET_POST_PUBLISH_DATE':
      return state.map(item =>  ({...item, immediatelyStatus: action.immediatelyState,publishDate: action.date}))
    
    case 'SET_FEATURED_IMAGE':
      return state.map(item =>  ({...item, featuredImage: action.featuredImage}))
        
    case 'SET_EDITOR_MODE':
      return state.map(item =>  ({...item, mode: action.mode}))
      
    case 'TOGGLE_IMAGE_GALLERY_BINDED':
      return state.map(item =>  ({...item, imageGalleryUnbinded: action.state}))
    
    case 'SET_PAGE_LIST':
      return state.map(item =>  ({...item, pageList: action.pageList}))
    
    case 'SET_ALL_CATEGORY_LIST':
      return state.map(item =>  ({...item, allCategoryList: action.catList}))
    
    case 'SET_TAG_MAP':

      return state.map(item =>  ({...item, tagMap: action.tagMap}))
    
    case 'SET_OPTIONS':
      return state.map(item =>  ({...item, options: action.options}))

    case 'LOAD_FORM_DATA':
      return state.map(item =>  ({...item, data: action.data, permalink: action.data["slug"]}))
    default:
      return state
  }
}

export default contentTypeNew
