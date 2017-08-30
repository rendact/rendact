import React from 'react'
import _ from 'lodash';
import {DropTarget} from 'react-dnd';
import BoxItem from './BoxItem';
import { Nestable } from '../../lib/react-dnd-nestable/react-dnd-nestable'
import { connect } from 'react-redux'
import {
  updateWidgetsOrder,
  addWidgetToWidgetArea, 
  removeAllWidgetsFromWidgetArea,
  loadWidgetAreasSuccess,
  maskArea
} from '../../../actions'
import {toWidgetAreaStructure, swalert, riques, errorCallback, disableForm} from '../../../utils';
import Query from '../../query'
import {addToWidgetArea, orderWidgetArea} from './helpers';
import {graphql, withApollo} from 'react-apollo';
import gql from 'graphql-tag'


const dropTarget = {
  drop(props, monitor, container){
    let droppedItem = monitor.getItem();
    // add to widgetarea id
    props.addToWidgetArea(droppedItem);
  }
}

const collectDrop = (connect, monitor) => ({
  connectDropToDom: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
});


class WidgetAreaContainer extends React.Component {
    constructor(props) {
        super(props);


      this.handleClearAll = this.handleClearAll.bind(this);
      this.renderItem = this.renderItem.bind(this);
      this.handleSaveButton = this.handleSaveButton.bind(this);
    }

    handleClearAll(e){
        e.preventDefault();

        swalert("warning", "Sure want to remove all widgets?", "You might lost some data",
            () => {
                this.props.removeAllWidgets();
            });
    }
  renderItem(props){
    return  <BoxItem 
      widget={props.item.widget} 
      uuid={props.item.id}
      widgetAreaId={this.props.id}
      isDragging={props.isDragging}
      connectDragSource={props.connectDragSource}
      />
  }

  handleSaveButton(e){
    e.preventDefault();
    let listOfWidget = this.props.client.readQuery({query: gql`${Query.getListOfWidget.query}`})
    disableForm(true)
    this.props.maskArea(true)
    this.props.mutate({variables : {
      input : { 
        id: "T3B0aW9uczo1NQ==", 
        value: listOfWidget.getOptions.value
      }
    }}).then(({data}) => {
      console.log(data);
      disableForm(false)
      this.props.maskArea(false)
    });

  }

  render(){

    let backgroundColor;
    let isActive = this.props.canDrop && this.props.isOver

    let text;
    if (this.props.isOver) {
      text = 'release here to drop'
    }

    return this.props.connectDropToDom(
      <div id={this.props.id} className="item">
                <div className="box box-default" style={{backgroundColor}}>
                    <div className="box-header with-border">
                        <h3 className="box-title">{text? text : this.props.title}</h3>
                        <div className="box-tools pull-right">
                            <button className="btn btn-box-tool" data-widget="collapse">
                                <i className="fa fa-minus"></i>
                            </button>
                        </div>
                    </div>
                    <div className="box-body">
                        <Nestable
                          items={this.props.widgets}
                          renderItem={this.renderItem}
                          maxDepth={ 1 }
                          onUpdate={this.props.orderWidgets}
                          useDragHandle
                        />
                    {isActive &&
 <div className="box box-default" style={{borderRadius: 0, color: 'white', backgroundColor: 'white', border: '1px dashed gray'}}>
         <div className="box-header with-border">&nbsp;</div>
       </div>
                    }</div>
                    
                    <div className="box-footer" style={{backgroundColor}}>
                        {/*<button onClick={this.handleClearAll} className="btn btn-danger">Clear All</button>*/}
                        <button onClick={this.handleSaveButton} className="btn btn-primary pull-right">Save</button>
                    </div>
                </div>
            </div>
    )
    }
}

const mapStateToProps = (state) => ({
  widgetAreas: state.widgets.widgetAreas,
  widgetsAvailable: state.widgets.widgetsAvailable,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  removeAllWidgets: () => {
    dispatch(removeAllWidgetsFromWidgetArea(ownProps.id))
  },
  orderWidgets: (items) => {
    orderWidgetArea(ownProps.id, items, ownProps.client)
  },
  addToWidgetArea: (widget) => {
    addToWidgetArea(ownProps.id, widget.widget, ownProps.client)
  },
  maskArea: (state) => {
    dispatch(maskArea(state))
  },
  loadWidgetAreasSuccess: (widgetAreas) => {
    dispatch(loadWidgetAreasSuccess(widgetAreas))
  },
});

let updateListOfWidgetQuery = gql`mutation UpdateListOfWidet($input: UpdateOptionsInput!) {
    updateOptions(input: $input) {
      changedOptions {
        item
        value
      }
    }
  }`

WidgetAreaContainer = graphql(updateListOfWidgetQuery)(WidgetAreaContainer);
WidgetAreaContainer = DropTarget('available', dropTarget, collectDrop)(WidgetAreaContainer);
WidgetAreaContainer = connect(mapStateToProps, mapDispatchToProps)(WidgetAreaContainer)
WidgetAreaContainer = withApollo(WidgetAreaContainer)

export default WidgetAreaContainer;
