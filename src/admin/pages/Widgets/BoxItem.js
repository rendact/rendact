import React from 'react';
import {connect} from 'react-redux';
import {
  removeSingleWidgetFromWidgetArea,
  maskArea,
} from '../../../actions'
import {disableForm, errorCallback, swalert, riques} from '../../../utils'
import {reduxForm, Field} from 'redux-form';
import Query from '../../query';


class BoxItem extends React.Component {
  constructor(props){
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
    this.newWidget = this.newWidget.bind(this)
    this.updateWidget = this.updateWidget.bind(this)

  }

  newWidget(uuid, value){
    let item = "activeWidget#" + uuid + "#" + this.props.widget.item
    riques(Query.createWidget(item, value),
      (error, response, data) => {
        if (!error) {
          console.log(JSON.stringify(data, null, 2))
        } else {
          errorCallback(error, data.error? data.error[0].message: null)
        }
      }
    );
  }

  updateWidget(id, value){
    riques(Query.updateWidget(id, value),
      (error, response, data) => {
        if (!error) {
          console.log(JSON.stringify(data, null, 2))
        } else {
          errorCallback(error, data.error? data.error[0].message: null)
        }
      }
    );
  }

  onSubmit(value){
    let toSave = JSON.stringify(value[this.props.uuid], null, 2)
    this.props.maskArea(true)
    disableForm(true)
    riques(Query.findWidget(this.props.uuid, this.props.widget.item),
      (error, response, data) => {
        if (!error) {
          let found = data.data.viewer.allOptions.edges
          if (!found.length){
            this.newWidget(this.props.uuid, JSON.stringify(toSave, null, 2))
          } else {
            let id = found[0].node.id
            this.updateWidget(id, JSON.stringify(toSave, null, 2))
          }
        }

        this.props.maskArea(false)
        disableForm(false)
      }
    );
  }

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
  <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
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
  maskArea: (state) => {
    dispatch(maskArea(state))
  },
});

BoxItem = connect(mapStateToProps, mapDispatchToProps)(BoxItem)
BoxItem = reduxForm({form: 'widgetBox'})(BoxItem)

export default BoxItem;
