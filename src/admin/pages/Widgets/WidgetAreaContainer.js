import React from 'react'
import _ from 'lodash';


class WidgetAreaContainer extends React.Component {
    constructor(props) {
        super(props);

        this.handleClearAll = this.handleClearAll.bind(this);
    }

    handleClearAll(e){
        e.preventDefault();
        this.props.clearAllWidget(this.props.id);
    }
  render(){

    return <div id={this.props.id} className="col-md-6">
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
                        <ul id="dragablePanelList" className="widgets list-unstyled">
                        {this.props.widgetAreas && 
                            _.map(this.props.widgets, (widget, index) => (
                                                                <li key={index}>
                                                                        {widget}
                                                                </li>
                                                                ))
                        }
                    </ul>
                    </div>
                    <div className="box-footer">
                        <button onClick={this.handleClearAll} className="btn btn-danger">Clear All</button>
                        <button className="btn btn-success pull-right">Save</button>
                    </div>
                </div>
            </div>
    }
}


export default WidgetAreaContainer;
