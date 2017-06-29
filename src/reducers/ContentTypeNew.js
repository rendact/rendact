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
    default:
      return state
  }
}

export default contentTypeNew
