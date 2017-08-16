import React from 'react';
import {connect} from 'react-redux';
import {
  removeSingleWidgetFromWidgetArea,
} from '../../../actions'
import {swalert} from '../../../utils'
import {reduxForm, Field} from 'redux-form';


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

      box =  (<div className="box box-default collapsed-box box-solid" style={{borderRadius: 0, cursor: 'move'}}>
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
  <form onSubmit={this.props.handleSubmit(value => console.log(value))}>
    <div className="form-group">
        <label htmlFor="title">Title</label>
        <Field name={this.props.uuid+'.title'} className="form-control" component="input" type="text"/>
    </div>
    <div className="form-group">
        <label htmlFor="description">Text</label>
        <Field name={this.props.uuid+".description"} className="form-control" component='textarea'/>
    </div>
    
    <button onClick={(e) => {e.preventDefault();this.props.removeWidget()}} className="btn btn-danger btn-xs">Remove</button>
    <button className="btn btn-primary btn-xs pull-right" type="submit">Save</button>
  </form>
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
BoxItem = reduxForm({form: 'widgetBox'})(BoxItem)

export default BoxItem;
