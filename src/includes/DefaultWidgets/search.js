import React from 'react'
import _ from 'lodash'
import {reduxForm, Field} from 'redux-form'
import {connect} from 'react-redux'


class Widget extends React.Component {
  constructor(props){
    super(props)

    this.onSearch = this.onSearch.bind(this)
  }

  onSearch(value){
    this._reactInternalInstance._context.history.push("/search/"+value.search)
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
])(Widget)

const WidgetFn = (widgetData) => {
	return (
    <Widget/>
	)
}

export default WidgetFn;
