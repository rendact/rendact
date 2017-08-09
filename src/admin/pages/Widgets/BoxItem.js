import React from 'react';


class BoxItem extends React.Component {

    constructor(props){
        super(props);
        this.handleRemoveButton = this.handleRemoveButton.bind(this);
    }

    handleRemoveButton(e){
        this.props.removeSingleWidget(this.props.uuid, this.props.widgetAreaId)
    }

    
   render() {
        let widget = this.props.widget;
        let widgetValue = JSON.parse(widget.value);

      return (<div className="box box-default collapsed-box box-solid" style={{borderRadius: 0}}>
<div className="box-header with-border">
    <h3 className="box-title">{widgetValue.title}</h3>
    <div className="box-tools pull-right">
        <button type="button" className="btn btn-box-tool btn-info" data-widget="collapse" title="Expand to setting widget">
            <i className="fa fa-plus"></i>
        </button>
        <button type="button" className="btn btn-box-tool btn-danger"  onClick={this.handleRemoveButton} >
            <i className="fa fa-times"></i>
        </button>
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
    <button onClick={this.handleRemoveButton} className="btn btn-danger btn-xs">Remove</button>
    <button className="btn btn-success btn-xs pull-right">Save</button>
</div>
</div>
)
   }
}

export default BoxItem;
