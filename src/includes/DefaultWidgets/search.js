import React from 'react'
import _ from 'lodash'
import {reduxForm, Field} from 'redux-form'
import {connect} from 'react-redux'
import {setSearchQuery} from '../../actions'
import {swalert} from '../../utils'


class Widget extends React.Component {
  constructor(props){
    super(props)

    this.onSearch = this.onSearch.bind(this)
  }

  onSearch({search}){
    if(search !== '""' &&  search ){
      this._reactInternalInstance._context.history.push("/search/"+search)
      this.props.dispatch(setSearchQuery(search))
    } else {
      swalert("error", "", "invalid input")
    }
    this.props.reset()
  }

  render(){
    return <form onSubmit={this.props.handleSubmit(this.onSearch)}>
        <p>
        <Field className="form-control input" component="input" type="text" name="search" placeholder="type key to search"/>
        </p>
      </form>
  }
}

Widget = _.flow([
  reduxForm({form: 'searchForm'}),
  connect(),
])(Widget)

const WidgetFn = (widgetData) => {
	return (
    <Widget/>
	)
}

export default WidgetFn;
