import React from 'react';
import {reduxForm, Field} from 'redux-form';
import {connect} from 'react-redux';
import {
  addWidgetToWidgetArea,
} from '../../../actions';
import {graphql} from 'react-apollo'
import gql from 'graphql-tag';
import Query from '../../query'
import _ from 'lodash'


let WidgetAreaOptions = (props) => {
   if (!props.data.loading) {
    let value = JSON.parse(props.data.getOptions.value)
    return <Field name="widgetAreaId" component="select" className="form-control select">
    <option>---widget area---</option>
    {
      _.map(_.keys(value), (widgetArea, index) => (
        <option value={widgetArea} key={index}>{widgetArea}</option>
      ))
    }

    </Field>
  }
}

WidgetAreaOptions = graphql(gql`${Query.getListOfWidget.query}`)(WidgetAreaOptions)

let AddToWidgetAreaForm = props => {
  const {handleSubmit} = props;

  return (
    <form onSubmit={handleSubmit}>

        <div className="input-group">
        <span className="input-group-btn">
            <button className="btn btn-default" type="submit">Add to</button>
        </span>
        <WidgetAreaOptions/>
      </div>
    </form>
    )
}

AddToWidgetAreaForm = reduxForm({form: 'addToWidgetAreaForm'})(AddToWidgetAreaForm)

const mapStateToProps = (state) => ({
  widgetAreas: state.widgets.widgetAreas
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSubmit: value => dispatch(addWidgetToWidgetArea(value.widgetAreaId, {widget: ownProps.widget})),
})

AddToWidgetAreaForm = connect(mapStateToProps, mapDispatchToProps)(AddToWidgetAreaForm)

export default AddToWidgetAreaForm;
