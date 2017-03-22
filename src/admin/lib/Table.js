import React from 'react';
import $ from 'jquery';
window.jQuery = $;
import _ from 'lodash';


const Table = React.createClass({
	getInitialState: function(){
    require ('datatables');
    require ('datatables/media/css/jquery.dataTables.min.css');
    
    return {
    	tableHead: []
    }
  },
  getDefaultProps: function(){
  	return {
  		id: "myTable",
  		columns: [
  			{label: "Column1", width: 400}, 
  			{label: "Column2", width: 400}, 
  		]
  	}
  },
  componentDidMount: function(){
  	var _tableHead = [];
  	_.forEach(this.props.columns, function(item){
  		_tableHead.push(<th style={{width: item.width, textAlign: 'center'}}>{item.label}</th>)
  	});
  	debugger;
  	this.setState({tableHead: _tableHead});
  	var datatable = $('#'+this.props.id).DataTable({sDom: '<"H"r>t<"F"ip>'}); 
  },
  render: function(){
  	return (
  		<table id={this.props.id} className="display">
         <thead>
          <tr>
            {this.state.tableHead}
          </tr>
        </thead>
        <tbody>
        	<tr key="0">
	        	
        	</tr>
        </tbody>
      </table>

  	)
  }
});

export default Table;