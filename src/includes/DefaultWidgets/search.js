import React from 'react'
import _ from 'lodash'
import {reduxForm, Field} from 'redux-form'


class Widget extends React.Component {
  render(){
    return <form onSubmit={this.props.handleSubmit(() => {})}>
        <p>
        <Field className="form-control input" component="input" type="text" name="search" placeholder="type key to search"/>
        </p>
      </form>
  }
}

Widget = reduxForm({form: 'searchForm'})(Widget)

const WidgetFn = (widgetData) => {
	return (
    <Widget/>
	)
}

export default WidgetFn;
