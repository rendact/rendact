import React from 'react';
import {connect} from 'react-redux';
import {
  removeSingleWidgetFromWidgetArea,
} from '../../../actions'
import {swalert} from '../../../utils'


class BoxItem extends React.Component {

   render() {
     let widget = this.props.widget;
     let widgetValue = JSON.parse(widget.value);
     let isDragging = this.props.isDragging
     let backgroundColor = isDragging && 'white'
     let border = isDragging && '1px dashed gray'
     let color = isDragging && 'white'
     let isDraggingStyle = {backgroundColor, border, color}

     let box;

     if (isDragging) {
       box = <div className="box box-default" style={{borderRadius: 0, ...isDraggingStyle}}>
         <div className="box-header with-border">&nbsp;</div>
       </div>
     } else {

      box =  (<div className="box box-default collapsed-box box-solid" style={{borderRadius: 0}}>
<div className="box-header with-border">
    <h3 className="box-title">{widgetValue.title}</h3>
    <div className="box-tools pull-right">
        <button type="button" className="btn btn-box-tool" data-widget="collapse" title="Expand to setting widget">
            <i className="fa fa-plus"></i>
        </button>
        {/*<button type="button" className="btn btn-box-tool btn-danger"  onClick={(e) => (this.props.removeWidget())} >
            <i className="fa fa-times"></i>
        </button>*/}
    </div>
</div>
<div className="box-body" style={{display: "none"}}>
    <div className="form-group">
        <label htmlFor="title">Title</label>
        <input type="text" className="form-control"/>
    </div>
    <div className="form-group">
        <label htmlFor="title">Text</label>
        <textarea className="form-control" id="" name="" cols="30" rows="10"></textarea>
    </div>
    <button onClick={(e) => (this.props.removeWidget())} className="btn btn-danger btn-xs">Remove</button>
</div>
</div>
      )}
     return box;
   }
}

const mapStateToProps = (state) => ({state});
const mapDispatchToProps = (dispatch, ownProps) => ({
  removeWidget: () => {
      swalert("warning", "Sure want to remove this widget?", "", () => {
        dispatch(removeSingleWidgetFromWidgetArea(ownProps.uuid, ownProps.widgetAreaId))
      })
  },
});

BoxItem = connect(mapStateToProps, mapDispatchToProps)(BoxItem)

export default BoxItem;
