import React from 'react';
import {DragSource} from 'react-dnd';
import AddToWidgetAreaForm from './AddToWidgetAreaForm';


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
      <AddToWidgetAreaForm widget={widget} widgetAreas={this.props.widgetAreas} />
    </div>
  </div>
    )
  }

}


BoxItemAvailable = DragSource('available', dragSource, dragCollect)(BoxItemAvailable);


export default BoxItemAvailable;
