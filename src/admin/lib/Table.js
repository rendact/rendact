import React from 'react';
import $ from 'jquery';
window.jQuery = $;
import _ from 'lodash';


const Table = React.createClass({
	getInitialState: function(){
    require ('datatables');
    require ('datatables/media/css/jquery.dataTables.min.css');
    
    var _tableHead = [];
    _.forEach(this.props.columns, function(item){
    	var width = 'inherit';
    	var textAlign = 'left';
    	if (item.width) width = item.width;
    	if (item.textAlign) textAlign = item.textAlign;

    	if (item.type && item.type==="checkbox") 
    		_tableHead.push(<th style={{width: width}}><input type="checkbox" id="selectAll"/></th>)
    	else
  			_tableHead.push(<th style={{width: width, textAlign: textAlign}}>{item.label}</th>)
  	});

    return {
    	tableHead: _tableHead
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
  loadData: function(dataArr){
  	var me = this;
  	this.datatable.clear();
  	_.forEach(dataArr, function(item){
      var dt = new Date(item.createdAt);
      var date = dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate();
      var author = item.username;
      var slug = item.slug;
      var status = status?item.node.status:"";

      var sMonth = dt.getFullYear() + "/" + (dt.getMonth() + 1);

      var _cols = [];
      _.forEach(me.props.columns, function(col, index){
      	var textAlign = col.textAlign?col.textAlign:'left';
	      var cssClass = col.cssClass?col.cssClass:'';
	      var target = col.target?col.target:'#';

      	if (col.type && col.type==="checkbox") 
      		_cols.push('<input class="'+cssClass+'" type="checkbox" ></input>');
      	else if (col.type && col.type==="link") {
      		_cols.push('<span id="'+item.id+'-'+item.postId+'" class="'+cssClass+'" style="text-align: '+textAlign+'; width:100%; display: block">'+
      			'<a href="'+target+'">'+item[col.id]+'</a>'+
      			'</span>')
      	}
      	else {
      		_cols.push('<span id="'+item.id+'-'+item.postId+'" class="'+cssClass+'" style="text-align: '+textAlign+'; width:100%; display: block">'+item[col.id]+'</span>',)
      	}
      });
      me.datatable.row.add(_cols);
    });

    this.datatable.draw();
  },
  componentDidMount: function(){
  	var datatable = $('#'+this.props.id).DataTable({sDom: '<"H"r>t<"F"ip>'}); 
  	this.datatable = datatable;
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
	        	{this.state.tableHead.map(function(item, index){
	        		if (index===1)
	        			return <td>Loading...</td>
	        		else 
	        			return <td></td>
	        	})}
        	</tr>
        </tbody>
      </table>

  	)
  }
});

export default Table;