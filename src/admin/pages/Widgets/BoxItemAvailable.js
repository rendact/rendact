import React from 'react';
import {DragSource} from 'react-dnd';
import {connect} from 'react-redux';
import {
  addWidgetToWidgetArea,
} from '../../../actions';


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

  constructor(props){
      super(props);

      this.state = {
        widgetAreaId: '',
      }

    this.handleWidgetAreaChange = this.handleWidgetAreaChange.bind(this);
    this.handleWidgetAreaSubmit = this.handleWidgetAreaSubmit.bind(this);

  }

  handleWidgetAreaChange(e){
      e.preventDefault();
      this.setState({widgetAreaId: e.currentTarget.value})
  }

  handleWidgetAreaSubmit(e){
      e.preventDefault();
      if (this.state.widgetAreaId === "" || this.state.widgetAreaId === "---widget area---"){
          return null
      } this.props.addToWidgetArea(this.state.widgetAreaId);
  }

  render(){

    var widget = this.props.widget;
    var widgetValue = JSON.parse(widget.value);
    var widgetAreas = this.props.widgetAreas;
    var {connectDragToDom, isDragging} = this.props;

    let opacity = isDragging? 0.5 : 1;

    return connectDragToDom(
    <div className="box box-default collapsed-box box-solid" style={{opacity}} id={widget.item}>
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
        <div className="input-group">
        <span className="input-group-btn">
            <button className="btn btn-default" onClick={this.handleWidgetAreaSubmit}>Add to</button>
        </span>
        <select onChange={this.handleWidgetAreaChange} className="form-control select">
        <option>---widget area---</option>
        {
          widgetAreas.map((widgetArea, index) => (
            <option value={widgetArea.id} key={index}>{widgetArea.id}</option>
          ))
        }

        </select>
        </div>
    </div>
  </div>
    )
  }

}

const mapStateToProps = (state) => ({
  widgetAreas: state.widgets.widgetAreas
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  addToWidgetArea: (widgetAreaId) => {
    dispatch(addWidgetToWidgetArea(widgetAreaId, {widget: ownProps.widget}))
  },
});

BoxItemAvailable = DragSource('available', dragSource, dragCollect)(BoxItemAvailable);
BoxItemAvailable = connect(mapStateToProps, mapDispatchToProps)(BoxItemAvailable)


export default BoxItemAvailable;
