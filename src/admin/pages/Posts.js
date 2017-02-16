import React from 'react';
import request from 'request';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import $ from 'jquery';
window.jQuery = $;
import Config from '../../config';
import Query from '../../query';
import Fn from '../lib/functions';
import { default as swal } from 'sweetalert2';

const Posts = React.createClass({
	getInitialState: function(){
	    require ('datatables');
	    require ('datatables/media/css/jquery.dataTables.min.css');
	    require ('./Posts.css');
	    require ('jquery-ui/themes/base/dialog.css');
	    require ('jquery-ui/ui/widgets/dialog');

	    return {
	      dt: null,
	      errorMsg: null,
	      loadingMsg: null,
	      monthList: []
	    }
	  },
	loadData: function(datatable) {
		var me = this;
	    request({
	        url: Config.scapholdUrl,
	        method: "POST",
	        json: true,
	        headers: {
	          "content-type": "application/json",
	          "Authorization": "Bearer " + localStorage.token
	        },
	        body: Query.getPostListQry
	      }, (error, response, body) => {
	        if (!error && !body.error) {
	       	 
	          if (body.data) {
	            datatable.clear();
	            var monthList = ["all"];
	            $.each(body.data.viewer.allPosts.edges, function(key, item){
	              var dt = new Date(item.node.createdAt);
	              var date = dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate();
	              var author = item.node.author?item.node.author.username:"";
	              var categories = item.node.categories?item.node.categories.edges.node.name:"";
	              
	              var sMonth = dt.getFullYear() + "/" + (dt.getMonth() + 1);
	              if (monthList.indexOf(sMonth)<0) monthList.push(sMonth);
	              var img = "img";
	              var tag = "tag";
	              var like = 20;

	              datatable.row.add([
	                '<input class="pageListCb" type="checkbox" id="cb-'+item.node.id+'" ></input>',
	                '<center>'+img+'</center>',
	                '<a href="#" >'+item.node.title+'</a>',
	                '<a href="">'+author+'</a>',
	                '<center>'+categories+'</center>',
	                '<center>'+tag+'</center>',
	                '<center>'+like+'</center>',
	                '<center>'+date+'</center>'
	              ])
	            });
	            me.setState({monthList: monthList});
	            datatable.draw();
	          }else{
	            if (error)
	              swal(
	                'Failed!',
	                error,
	                'warning'
	              )
	            else if (body.error)
	              swal(
	                'Failed!',
	                body.error,
	                'warning'
	              )
	            else 
	              swal(
	                'Failed!',
	                'Unknown error',
	                'warning'
	              )
	          }
	        }
	      } 
	    );
	  },
	
	componentDidMount: function(){
	    var datatable = $('#postListTbl').DataTable({
	      sDom: '<"H"r>t<"F"ip>',
	    });
	    $('#selectAll').click(function () {
	        $(':checkbox', datatable.rows().nodes()).prop('checked', this.checked);
	    });
	    datatable.columns(1).every( function () {
	        var that = this;
	 
	        $('#searchBox', this.footer() ).on( 'keyup change', function () {
	            if ( that.search() !== this.value ) {
	                that
	                    .search( this.value )
	                    .draw();
	            }
	            return;
	        });
	        return;
	    } );
	    
	    this.setState({dt: datatable});
	    this.loadData(datatable);
	  },



	render: function(){
		return (
			<div className="content-wrapper" style={{height: '100%'}}>
			  <div className="container-fluid">
				<section className="content-header">
			      <h1>
			        Post List
			      </h1>
			      <ol className="breadcrumb">
			        <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
			        <li className="active">Post List</li>
			      </ol>
			    </section>

	        	<section className="content">
	              <div className="row">
	                <div className="col-xs-12">
	                  <div className="box">
	                    <div className="box-header">
	                      <h3 className="box-title"></h3>
	                    </div>
	                    
	                    <div className="box-body">
	                      <table id="postListTbl" className="display">
	                        <thead>
	                          <tr>
	                            <th style={{width:7}}><input type="checkbox" id="selectAll"></input></th>
	                            <th style={{width: 400, textAlign: 'center'}}></th>
	                            <th style={{width: 400, textAlign: 'center'}}>Title</th>
	                            <th style={{width: 400, textAlign: 'center'}}>Author</th>
	                            <th style={{width: 400, textAlign: 'center'}}>Categories</th>
	                            <th style={{width: 400, textAlign: 'center'}}>Tags</th>
	                            <th style={{width: 400, textAlign: 'center'}}>Likes</th>
	                            <th style={{width: 400, textAlign: 'center'}}>Publish Date</th>
	                          </tr>
	                        </thead>
	                        <tbody><tr key="0"><td></td><td>Loading data...</td><td></td><td></td><td></td><td></td><td></td><td></td></tr></tbody>
	                      </table>
	                    </div>

	                  </div>
	                </div>
	              </div>
	            </section>
	           </div>
		    </div>
		)},
});

export default Posts;