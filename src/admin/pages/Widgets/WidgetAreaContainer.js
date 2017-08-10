import React from 'react'
import _ from 'lodash';
import {DropTarget} from 'react-dnd';
import BoxItem from './BoxItem';
import { Nestable } from '../../lib/react-dnd-nestable/react-dnd-nestable'
import { connect } from 'react-redux'
import {
  removeAllWidgetsFromWidgetArea
} from '../../../actions'
import {swalert} from '../../../utils';

const dropTarget = {
  drop(props, monitor, container){
    let droppedItem = monitor.getItem();
    let widgetId = props.id;
    // add to widgetarea id
    props.addToWidgetArea(widgetId, droppedItem);
  }
}

const collectDrop = (connect, monitor) => ({
  connectDropToDom: connect.dropTarget()
});


class WidgetAreaContainer extends React.Component {
    constructor(props) {
        super(props);


      this.handleClearAll = this.handleClearAll.bind(this);
      this.renderItem = this.renderItem.bind(this);
      this.onUpdate = this.onUpdate.bind(this);
    }

    handleClearAll(e){
        e.preventDefault();

        swalert("warning", "Sure want to remove all widgets?", "You might lost some data",
            () => {
                this.props.removeAllWidgets(this.props.id);
            });
    }
  renderItem(props){
    return  <BoxItem 
      widget={props.item.widget} 
      uuid={props.item.id}
      removeSingleWidget={this.props.handleRemoveSingleWidget}
      widgetAreaId={this.props.id}
      />
  }

  onUpdate(newItems){
    this.props.sortWidgets(this.props.id, newItems);
  }

  render(){

    return this.props.connectDropToDom(
      <div id={this.props.id} className="col-md-6">
                <div className="box box-default collapsed-box">
                    <div className="box-header with-border">
                        <h3 className="box-title">{this.props.title}</h3>
                        <div className="box-tools pull-right">
                            <button className="btn btn-box-tool btn-primary" data-widget="collapse">
                                <i className="fa fa-plus"></i>
                            </button>
                        </div>
                    </div>
                    <div className="box-body">
                        <Nestable
                          items={this.props.widgets}
                          renderItem={this.renderItem}
                          maxDepth={ 1 }
                          onUpdate={this.onUpdate}
                        />
                    </div>
                    <div className="box-footer">
                        <button onClick={this.handleClearAll} className="btn btn-danger">Clear All</button>
                        <button className="btn btn-success pull-right">Save</button>
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
  removeAllWidgets: function (widgetAreaId) {
    dispatch(removeAllWidgetsFromWidgetArea(widgetAreaId))
  }
});

WidgetAreaContainer = connect(mapStateToProps, mapDispatchToProps)(WidgetAreaContainer)

WidgetAreaContainer = DropTarget('available', dropTarget, collectDrop)(WidgetAreaContainer);
export default WidgetAreaContainer;
