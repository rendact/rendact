import React from 'react';
import {connect} from 'react-redux';
import {
  removeSingleWidgetFromWidgetArea,
  maskArea,
} from '../../../actions'
import {disableForm, errorCallback, swalert, riques} from '../../../utils'
import {reduxForm, Field} from 'redux-form';
import Query from '../../query';
import {withApollo, graphql, compose} from 'react-apollo'
import gql from 'graphql-tag'
import {removeSingleWidget} from './helpers';


class BoxItem extends React.Component {
  constructor(props){
    super(props)
    this.onSubmit = this.onSubmit.bind(this)

  }

  onSubmit(value){
    let toSave = JSON.stringify(value[this.props.uuid], null, 2)
    this.props.maskArea(true)
    disableForm(true)
    let widgetName = "activeWidget#" + this.props.uuid + "#" + this.props.widget.item
    let query = gql` 
    {
      viewer {
        allOptions(where: {item: { eq: "${widgetName}"}}) {
          edges {
            node {
              id
              value
            }
          }
        }
      }
    }`
    this.props.client.query({query: query}).then(({data}) => {
      let found = data.viewer.allOptions.edges
      if (found.length){
        console.log("update")
        //nanti update di sini
        let id = found[0].node.id
        this.props.updateWidget({variables: {input: {id: id, value: toSave}},
          refetchQueries: [
            {query: query}
          ]
        }).then(({data}) => {
          disableForm(false)
          this.props.maskArea(false)
        })
      } else {
        console.log("buat baru")
        this.props.createNew({variables: {input : { item: widgetName, value: toSave}},
          refetchQueries: [
            {query: query }
          ]
        }).
          then(({data}) => {
            disableForm(false)
            this.props.maskArea(false)
          })
      }
    })
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

    let widgetForm = null;

    if (widgetValue.filePath) {
      var widgetClass = require("../../../includes/DefaultWidgets/"+widgetValue.filePath);
      if (widgetClass.widgetForm) { widgetForm = widgetClass.widgetForm(this.props.uuid)
      }
    }
     if (isDragging) {
       box = <div className="box box-default" style={{borderRadius: 0, ...isDraggingStyle}}>
         <div className="box-header with-border">&nbsp;</div>
       </div>
     } else {

      box =  (
      <div className="box box-default collapsed-box box-solid" style={{borderRadius: 0}}>
        {this.props.connectDragSource(
        <div className="box-header with-border" style={{cursor: 'move'}}>
          <h3 className="box-title">{widgetValue.title}</h3>
          <div className="box-tools pull-right">
              <button type="button" className="btn btn-box-tool" data-widget="collapse" title="Expand to setting widget">
                  <i className="fa fa-plus"></i>
              </button>
              {/*<button type="button" className="btn btn-box-tool btn-danger"  onClick={(e) => (this.props.removeWidget())} >
                  <i className="fa fa-times"></i>
              </button>*/}
          </div>
        </div>)}
        <div className="box-body" style={{display: "none"}}>
          <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <Field name={this.props.uuid+'.title'} className="form-control" component="input" type="text"/>
            </div>
            {widgetForm}
          
            <button onClick={(e) => {e.preventDefault();this.props.removeWidget()}} className="btn btn-danger btn-xs">Remove</button>
            <button className="btn btn-primary btn-xs pull-right" type="submit">Save</button>
          </form>
        </div>
      </div>
      )}
     return box;
   }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  removeWidget: () => {
      swalert("warning", "Sure want to remove this widget?", "", () => {
        removeSingleWidget(ownProps.widgetAreaId, ownProps.uuid, ownProps.client)
      })
  },
  maskArea: (state) => {
    dispatch(maskArea(state))
  },
});

BoxItem = connect(null, mapDispatchToProps)(BoxItem)
BoxItem = reduxForm({form: 'widgetBox'})(BoxItem)
BoxItem = withApollo(BoxItem)
BoxItem = compose(
  graphql(gql`${Query.createWidget().query}`, {name: 'createNew'}),
  graphql(gql`${Query.updateWidget().query}`, {name: 'updateWidget'})
)(BoxItem)

export default BoxItem;
