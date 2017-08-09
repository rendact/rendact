import React from 'react'
import _ from 'lodash';
import {DropTarget} from 'react-dnd'
import {BoxItem} from './index'


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
      this.renderWidgetItem = this.renderWidgetItem.bind(this);
    }

    handleClearAll(e){
        e.preventDefault();
        this.props.clearAllWidget(this.props.id);
    }

  renderWidgetItem(widget, index){
    return <BoxItem widget={widget.widget} key={index} uuid={widget.uuid}/>
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
                      {
                        _.map(this.props.widgets, (widget, index) => (
                          this.renderWidgetItem(widget, index)
                        ))
                      }
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

WidgetAreaContainer = DropTarget('available', dropTarget, collectDrop)(WidgetAreaContainer);
export default WidgetAreaContainer;
