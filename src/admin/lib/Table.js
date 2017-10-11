import React from 'react';
import $ from 'jquery';
import _ from 'lodash';
import {hasRole} from '../../utils';

export const SearchBox = React.createClass({
	bindToTable: function(datatable){
    this.datatable = datatable;
    this.datatable.columns(1).every( function () {
        var that = this;
        $('#searchBox', this.footer() ).on( 'keyup change', function () {
            if ( that.search() !== this.value ) {
                that.search( this.value )
                    .draw();
            }
            return null;
        });
        return null;
    } );
  },
	render: function(){
		return (
			<div className="input-group" style={{width: 200}}>
	      <input type="text" id="searchBox" className="form-control" placeholder="Search"/>

	      <div className="input-group-btn">
	        <button className="btn btn-default"><i className="fa fa-search"></i></button>
	      </div>
	    </div>
	   )
	}
});

export const SearchBoxPost = React.createClass({
  bindToTable: function(datatable){
    this.datatable = datatable;
    this.datatable.columns(2).every( function () {
        var that = this;
        $('#searchBox', this.footer() ).on( 'keyup change', function () {
            if ( that.search() !== this.value ) {
                that.search( this.value )
                    .draw();
            }
            return null;
        });
        return null;
    } );
  },
  render: function(){
    return (
      <div className="input-group" style={{width: 200}}>
        <input type="text" id="searchBox" className="form-control" placeholder="Search"/>

        <div className="input-group-btn">
          <button className="btn btn-default"><i className="fa fa-search"></i></button>
        </div>
      </div>
     )
  }
});

export const DeleteButtons = React.createClass({
	render: function(){
		return (
			<span>
			{ (!this.props.deleteMode && hasRole('modify-page')) &&    
        [<button key="deleteBtn" className="btn btn-default btn-flat" id="deleteBtn" onClick={this.props.onDelete} style={{marginRight:10}} 
        disabled={!this.props.itemSelected}><span className="fa fa-trash-o" ></span> Delete</button>]
      }   
      { (this.props.deleteMode && hasRole('modify-page')) && 
        [<button key="recoverBtn" className="btn btn-default btn-flat" id="recoverBtn" style={{marginRight:10}} onClick={this.props.onRecover}
         disabled={!this.props.itemSelected} ><span className="fa fa-support" ></span> Recover</button>,
         <button key="deletePermanentBtn" className="btn btn-default btn-flat" id="deletePermanentBtn" style={{marginRight:10}} onClick={this.props.onDeletePermanent}
         disabled={!this.props.itemSelected}><span className="fa fa-trash-o" ></span> Delete Permanently</button>,
         <button key="emptyTrashBtn" className="btn btn-default btn-flat" id="emptyTrashBtn" onClick={this.props.onEmptyTrash}><span className="fa fa-trash" ></span> Empty Trash</button>]
      }    
      </span>                    
	   )
	}
});

export const Table = React.createClass({
	getInitialState: function(){
    require ('datatables');
    require ('datatables/media/css/jquery.dataTables.min.css');
    
    var _tableHead = [];
    if (this.props.checkBoxAtFirstColumn) {
    	_tableHead.push(<th key="selectAll" style={{width: 7}}><input type="checkbox" id="selectAll"/></th>)
    }

    _.forEach(this.props.columns, function(item){
    	var width = 'inherit';
    	var textAlign = 'left';
    	if (item.width) width = item.width;
    	if (item.textAlign) textAlign = item.textAlign;

  		_tableHead.push(<th key={item.label} style={{width: width, textAlign: textAlign}}>{item.label}</th>)
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
  		],
  		checkBoxAtFirstColumn: false
  	}
  },
  loadData: function(dataArr, canEdit){
  	var me = this;
  	this.datatable.clear();
  	_.forEach(dataArr, function(item, rowIndex){
      var _cols = [];
      if (me.props.checkBoxAtFirstColumn) {
        if (item.postId==="fixed")
      	  _cols.push('<input class="'+me.props.id+'Cb" id="cb-'+item.postId+'" type="checkbox" disabled></input>');
        else
          _cols.push('<input class="'+me.props.id+'Cb" id="cb-'+item.postId+'" type="checkbox"></input>');
      }

      _.forEach(me.props.columns, function(col, index){
      	var textAlign = col.textAlign?col.textAlign:'left';
	      var cssClass = col.cssClass && item.postId!=="fixed"?col.cssClass:'titleText';
	      var target = col.target?col.target:'#';
      	var _link = item.postId==="fixed"?item[col.id]:'<a href="'+target+'">'+item[col.id]+'</a>';

      	if (col.type && col.type==="link" && canEdit) {
      		_cols.push('<span id="'+rowIndex+'-'+item.postId+'" class="'+cssClass+'" style="text-align: '+textAlign+'; width:100%; display: block">'
            +_link+'</span>')
      	} else if (col.type && col.type==="image" && canEdit) {
          _cols.push('<center><img src='+item[col.id]+' width="50" /></center>')
      	} else {
      		_cols.push('<span id="'+rowIndex+'-'+item.postId+'" class="'+cssClass+'" style="text-align: '+textAlign+'; width:100%; display: block">'+item[col.id]+'</span>',)
      	}
      });
      me.datatable.row.add(_cols);
    });
    this.datatable.draw();

    if (me.props.checkBoxAtFirstColumn) {
	    $('#selectAll').click(function () {
	      $(':checkbox').prop('checked', this.checked);
	      me.props.onSelectAll.call();
	    });
	    $("."+me.props.id+"Cb").click( function(){
	      me.props.onCheckBoxClick.call();
	    });
	  }

  },
  componentDidMount: function(){
  	var datatable = $('#'+this.props.id).DataTable({sDom: '<"H"r>t<"F"ip>'}); 
  	this.datatable = datatable;
    $("#" + this.props.id).on('click', '.titleText', this.props.handleTextTitleClick)
  },
  render: function(){
  	return (
  		<table id={this.props.id} className="display" style={this.props.style}>
         <thead>
          <tr>
            {this.state.tableHead}
          </tr>
        </thead>
        <tbody>
        	<tr key="0">
	        	{this.state.tableHead.map(function(item, index){
	        		if (index===1)
	        			return <td key={index}>Loading...</td>
	        		else 
	        			return <td key={index}></td>
	        	})}
        	</tr>
        </tbody>
      </table>

  	)
  }
});


export const TableTagCat = React.createClass({
  getInitialState: function(){
    require ('datatables');
    require ('datatables/media/css/jquery.dataTables.min.css');
    
    var _tableHead = [];
    if (this.props.checkBoxAtFirstColumn) {
      _tableHead.push(<th key="selectAll" style={{width: 7}}><input type="checkbox" id="selectAll"/></th>)
    }

    _.forEach(this.props.columns, function(item){
      var width = 'inherit';
      var textAlign = 'left';
      if (item.width) width = item.width;
      if (item.textAlign) textAlign = item.textAlign;

      _tableHead.push(<th key={item.label} style={{width: width, textAlign: textAlign}}>{item.label}</th>)
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
      ],
      checkBoxAtFirstColumn: false
    }
  },
  loadData: function(dataArr, canEdit){
    var me = this;
    this.datatable.clear();
    _.forEach(dataArr, function(item, rowIndex){
      var _cols = [];
      if (me.props.checkBoxAtFirstColumn) {
        if (item.postId==="fixed")
          _cols.push('<input class="'+me.props.id+'Cb" id="cb-'+item.postId+'" type="checkbox" disabled></input>');
        else
          _cols.push('<input class="'+me.props.id+'Cb" id="cb-'+item.postId+'" type="checkbox"></input>');
      }

      _.forEach(me.props.columns, function(col, index){
        var textAlign = col.textAlign?col.textAlign:'left';
        var cssClass = col.cssClass && item.postId!=="fixed"?col.cssClass:'titleText';
        var target = col.target?col.target:'#';
        var _link = item.postId==="fixed"?item[col.id]:'<a href="'+target+'">'+item[col.id]+'</a>';

        if (col.type && col.type==="link" && canEdit) {
          _cols.push('<span id="'+rowIndex+'-'+item.postId+'" class="'+cssClass+'" style="text-align: '+textAlign+'; width:100%; display: block">'
            +_link+'</span>')
        } else if (col.type && col.type==="image" && canEdit) {
          _cols.push('<center><img src='+item[col.id]+' width="50" /></center>')
        } else {
          _cols.push('<span id="'+rowIndex+'-'+item.postId+'" class="'+cssClass+'" style="text-align: '+textAlign+'; width:100%; display: block">'+item[col.id]+'</span>',)
        }
      });
      me.datatable.row.add(_cols);
    });
    this.datatable.draw();

    if (me.props.checkBoxAtFirstColumn) {
      $('#selectAll').click(function () {
        $(':checkbox').prop('checked', this.checked);
        me.props.onSelectAll.call();
      });
      $("."+me.props.id+"Cb").click( function(){
        me.props.onCheckBoxClick.call();
      });
    }
      if (me.props.onAfterLoad){
       me.props.onAfterLoad.call();
     }
  },
  componentDidMount: function(){
    var datatable = $('#'+this.props.id).DataTable({sDom: '<"H"r>t<"F"ip>'}); 
    this.datatable = datatable;
  },
  render: function(){
    return (
      <table id={this.props.id} className="display" style={this.props.style}>
         <thead>
          <tr>
            {this.state.tableHead}
          </tr>
        </thead>
        <tbody>
          <tr key="0">
            {this.state.tableHead.map(function(item, index){
              if (index===1)
                return <td key={index}>Loading...</td>
              else 
                return <td key={index}></td>
            })}
          </tr>
        </tbody>
      </table>

    )
  }
});