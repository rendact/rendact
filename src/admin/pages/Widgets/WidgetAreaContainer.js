import React from 'react'
import _ from 'lodash';
import {DropTarget} from 'react-dnd';
import BoxItem from './BoxItem';
import { Nestable } from '../../lib/react-dnd-nestable/react-dnd-nestable'
import { connect } from 'react-redux'
import {
  updateWidgetsOrder,
  addWidgetToWidgetArea, 
  removeAllWidgetsFromWidgetArea
} from '../../../actions'
import {swalert} from '../../../utils';

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
      />
  }

  render(){

    let backgroundColor;
    let isActive = this.props.canDrop && this.props.isOver

    if (isActive) {
      backgroundColor = 'darkgreen'
    } else if (this.props.canDrop) {
      backgroundColor = 'darkkhaki'
    }

    let text;
    if (this.props.isOver) {
      text = 'release here to drop'
    }

    return this.props.connectDropToDom(
      <div id={this.props.id} className="col-md-6">
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
                    </div>
                    <div className="box-footer" style={{backgroundColor}}>
                        <button onClick={this.handleClearAll} className="btn btn-danger">Clear All</button>
                        <button className="btn btn-primary pull-right">Save</button>
                    </div>
                </div>
            </div>
    )
    }
}

const mapStateToProps = (props) => (
  {props}
);

const mapDispatchToProps = (dispatch, ownProps) => ({
  removeAllWidgets: () => {
    dispatch(removeAllWidgetsFromWidgetArea(ownProps.id))
  },
  orderWidgets: (items) => {
    dispatch(updateWidgetsOrder(ownProps.id, items))
  },
  addToWidgetArea: (widget) => {
    dispatch(addWidgetToWidgetArea(ownProps.id, widget))
  }
});

WidgetAreaContainer = DropTarget('available', dropTarget, collectDrop)(WidgetAreaContainer);
WidgetAreaContainer = connect(mapStateToProps, mapDispatchToProps)(WidgetAreaContainer)

export default WidgetAreaContainer;
