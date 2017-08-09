import React from 'react';

class BoxItemAvailable extends React.Component {

  constructor(props){
      super(props);

      this.state = {
        widgetAreaId: '',
      }

    this.handleWidgetAreaChange = this.handleWidgetAreaChange.bind(this);
    this.handleWidgetAreaSubmit = this.handleWidgetAreaSubmit.bind(this);

  }

  handleWidgetAreaChange(e){
      e.preventDefault();
      this.setState({widgetAreaId: e.currentTarget.value})
  }

  handleWidgetAreaSubmit(e){
      e.preventDefault();
      if (this.state.widgetAreaId === "" || this.state.widgetAreaId === "---widget area---"){
          return null
      } this.props.handleAddToWidgetArea(this.state.widgetAreaId, this.props.widget);
  }

  render(){

    var widget = this.props.widget;
    var widgetValue = JSON.parse(widget.value);
    var widgetAreas = this.props.widgetAreas;

    return <div className="box box-info box-solid" id={widget.item}>
    <div className="box-header with-border">
        <h3 className="box-title">{widgetValue.title}</h3>
    </div>
    <div className="box-body">
        <p>{widgetValue.help}</p>
    </div>
    <div className="box-footer text-center">
        <div className="input-group">
        <span className="input-group-btn">
            <button className="btn btn-default" onClick={this.handleWidgetAreaSubmit}>Add to</button>
        </span>
        <select onChange={this.handleWidgetAreaChange} className="form-control select">
        <option>---widget area---</option>
        {
          widgetAreas.map((widgetArea, index) => (
            <option value={widgetArea.id} key={index}>{widgetArea.id}</option>
          ))
        }

        </select>
        </div>
    </div>
  </div>
  }

}


export default BoxItemAvailable;
