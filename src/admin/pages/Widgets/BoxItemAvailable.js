import React from 'react';
import {DragSource} from 'react-dnd';
import {connect} from 'react-redux';
import {
  addWidgetToWidgetArea,
} from '../../../actions';
import {reduxForm, Field} from 'redux-form';


let AddToWidgetAreaForm = props => {
  const {handleSubmit} = props;

  return (
    <form onSubmit={handleSubmit}>

        <div className="input-group">
        <span className="input-group-btn">
            <button className="btn btn-default" type="submit">Add to</button>
        </span>
        <Field name="widgetAreaId" component="select" className="form-control select">
        <option>---widget area---</option>
        {
          props.widgetAreas.map((widgetArea, index) => (
            <option value={widgetArea.id} key={index}>{widgetArea.id}</option>
          ))
          }

        </Field>
      </div>
    </form>
    )
}

AddToWidgetAreaForm = reduxForm({form: 'addToWidgetAreaForm'})(AddToWidgetAreaForm)

const mapStateToPropsAddToWidgetAreaForm = (state) => ({
  widgetAreas: state.widgets.widgetAreas
});

const mapDispatchToPropsAddToWidgetAreaForm = (dispatch, ownProps) => ({
  onSubmit: value => dispatch(addWidgetToWidgetArea(value.widgetAreaId, {widget: ownProps.widget})),
})

AddToWidgetAreaForm = connect(mapStateToPropsAddToWidgetAreaForm, mapDispatchToPropsAddToWidgetAreaForm)(AddToWidgetAreaForm)


const dragSource = {
  beginDrag(props, monitor, component){
    return {widget: props.widget}
  },
}


const dragCollect = (connect, monitor) => ({
  connectDragToDom: connect.dragSource(),
  isDragging: monitor.isDragging()
});

class BoxItemAvailable extends React.Component {

  render(){

    var widget = this.props.widget;
    var widgetValue = JSON.parse(widget.value);
    var widgetAreas = this.props.widgetAreas;
    var {connectDragToDom, isDragging} = this.props;

    let opacity = isDragging? 0.5 : 1;

    return connectDragToDom(
    <div className="box box-default collapsed-box box-solid" style={{opacity, cursor: 'move'}} id={widget.item}>
      <div className="box-header with-border">
        <h3 className="box-title">{widgetValue.title}</h3>
        <div className="box-tools pull-right">
          <button type="button" className="btn btn-box-tool" disabled={this.props.selectedMenuName===""} data-widget="collapse"><i className="fa fa-plus"></i>
          </button>
        </div>
      </div>
    <div className="box-body">
        <p>{widgetValue.help}</p>
    </div>
    <div className="box-footer text-center">
      <AddToWidgetAreaForm widget={widget} />
    </div>
  </div>
    )
  }

}


BoxItemAvailable = DragSource('available', dragSource, dragCollect)(BoxItemAvailable);


export default BoxItemAvailable;
