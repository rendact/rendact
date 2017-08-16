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
      />
  }

  handleSaveButton(e){
    e.preventDefault();
    let widgetAreas = _.cloneDeep(this.props.widgetAreas)

    let toSavedData = {}
    _.forEach(widgetAreas, widgetArea => {
      let widgets = _.map(widgetArea.widgets, widget => ({
        id: widget.id,
        widget: widget.widget.item
      }));
      toSavedData[widgetArea.id] = widgets
    })


    disableForm(true)
    this.props.maskArea(true)
    let value = JSON.stringify(toSavedData, null, 2);
    riques(Query.updateListOfWidget(value), 
      (error, response, data) => {
        if (!error && response.statusCode === 200 && !data.errors){
          this.props.notif.addNotification({
            message: 'List of widgets updated successfully',
            level: 'success',
            position: 'tr',
            autoDismiss: 2,
          });
          let value = JSON.parse(data.data.updateOptions.changedOptions.value)
          let _widgetAreas = toWidgetAreaStructure(this.props.widgetsAvailable, value)

          this.props.loadWidgetAreasSuccess(_widgetAreas)
        } else {
          errorCallback(error, data.errors?data.errors[0].message: null)
        }

        disableForm(false);
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
  widgetsAvailable: state.widgets.widgetsAvailable
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  removeAllWidgets: () => {
    dispatch(removeAllWidgetsFromWidgetArea(ownProps.id))
  },
  orderWidgets: (items) => {
    dispatch(updateWidgetsOrder(ownProps.id, items))
  },
  addToWidgetArea: (widget) => {
    dispatch(addWidgetToWidgetArea(ownProps.id, widget))
  },
  maskArea: (state) => {
    dispatch(maskArea(state))
  },
  loadWidgetAreasSuccess: (widgetAreas) => {
    dispatch(loadWidgetAreasSuccess(widgetAreas))
  },
});

WidgetAreaContainer = DropTarget('available', dropTarget, collectDrop)(WidgetAreaContainer);
WidgetAreaContainer = connect(mapStateToProps, mapDispatchToProps)(WidgetAreaContainer)

export default WidgetAreaContainer;
