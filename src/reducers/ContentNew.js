const generateDefaultField = () => ([
  {id:"title", label: "Title", type: "link", deletable: false},
  {id:"slug", label: "Slug", type: "text", deletable: false}
])

const INITIAL_VALUES =  [{
      defaultFields: generateDefaultField(),
      providedFields: generateDefaultField(),
      providedFieldsDefault: [
        {id:"author", label: "Author", type: "link"},
        {id:"summary", label: "Summary", type: "link"},
        {id:"content", label: "Content", type: "text"},
        {id:"image", label: "Image", type: "text"},
        {id:"like", label: "Like", type: "text"},
        {id:"featuredImage", label: "Featured Image", type: "text"},
        {id:"gallery", label: "Gallery", type: "text"}
      ]
}]

const contentNew = (state = INITIAL_VALUES, action) => {
  console.log(action.type)
  switch (action.type) {

    case 'SET_PROV_FIELDS':
      return state.map(item =>  ({...item, providedFields: action.providedFields}))

    case 'SET_CUSTOM_FIELDS':
      return state.map(item =>  ({...item, customFields: action.customFields}))

    case 'SET_FIELDS':
      return state.map(item =>  ({...item, fields: action.fields}))

    case 'TOGGLE_CHECKING_SLUG':
      return state.map(item =>  ({...item, checkingSlug: action.checkingSlug, slug: action.slug}))

    case 'SET_LABELS':
      return state.map(item =>  ({...item, label: action.label, labelSingular: action.labelSingular, labelAddNew: action.labelAddNew, labelEdit: action.labelEdit}))

    case 'TOGGLE_STATUS_EDIT_MODE':
      return state.map(item =>  ({...item, mode: action.mode}))

    case 'MASK_AREA':
      return state.map(item =>  ({...item, isProcessing: action.isMasked, opacity: action.isMasked?0.4:1}))
      
    default:
      return state
  }
}

export default contentNew
