const INITIAL_VALUES =  [{
      isProcessing: false,
      opacity: 1,
      deleteMode: false,
      activeStatus: "All",
      itemSelected: false
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

    case 'SET_CHECKING_SLUG':
      return state.map(item =>  ({...item, checkingSlug: action.checkingSlug}))

    case 'TOGGLE_CHECKING_SLUG':
      return state.map(item =>  ({...item, checkingSlug: action.checkingSlug, slug: action.slug}))

    case 'NAME_BLUR':
      return state.map(item =>  ({...item, label: action.label, labelSingular: action.labelSingular, labelAddNew: action.labelAddNew, labelEdit: action.labelEdit}))

    case 'ADD_PRO_FIELD':
      return state.map(item =>  ({...item, providedFields: action.providedFields, fields:action.fields}))

    case 'SET_MODE':
      return state.map(item =>  ({...item, mode: action.mode}))










    case 'UPDATE_GENERAL_SETTING':
      return [...state]

    case 'UPDATE_META_SETTING':
      return [...state]

    case 'MASK_AREA':
      return [
        {
          isProcessing: action.isMasked,
          opacity: action.isMasked?0.4:1
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

export default contentNew
