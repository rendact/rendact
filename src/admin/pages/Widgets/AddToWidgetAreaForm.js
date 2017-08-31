import React from 'react';
import {reduxForm, Field} from 'redux-form';
import {connect} from 'react-redux';
import {withApollo} from 'react-apollo';
import _ from 'lodash';
import {addToWidgetArea} from './helpers'

let AddToWidgetAreaForm = props => {
  const {handleSubmit, widgetAreas} = props;

  return (
    <form onSubmit={handleSubmit}>

        <div className="input-group">
        <span className="input-group-btn">
            <button className="btn btn-default" type="submit">Add to</button>
        </span>
        <Field name="widgetAreaId" component="select" className="form-control select">
        <option>---widget area---</option>
        {
          widgetAreas.map((widgetArea, index) => (
            <option value={widgetArea.id} key={index}>{widgetArea.id}</option>
          ))
          }

        </Field>
      </div>
    </form>
    )
}

AddToWidgetAreaForm = reduxForm({form: 'addToWidgetAreaForm'})(AddToWidgetAreaForm)

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSubmit: value => {
    addToWidgetArea(value.widgetAreaId, ownProps.widget, ownProps.client)
  },
})

AddToWidgetAreaForm = connect(null, mapDispatchToProps)(AddToWidgetAreaForm)
AddToWidgetAreaForm = withApollo(AddToWidgetAreaForm)

export default AddToWidgetAreaForm;
