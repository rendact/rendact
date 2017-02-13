import React from 'react';
import request from 'request';
import $ from 'jquery';
window.jQuery = $;
import Config from '../../config';
import Query from '../../query';
import Fn from '../lib/functions';
// ES6 Modules
import { default as swal } from 'sweetalert2';


const Pages = React.createClass({


  getInitialState: function(){
    require ('datatables');
    require ('datatables/media/css/jquery.dataTables.min.css');
    require ('./Pages.css');
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
        body: Query.getPageListQry
      }, (error, response, body) => {
        if (body.data) {
          datatable.clear();
          var monthList = ["all"];
          $.each(body.data.viewer.allPosts.edges, function(key, item){
            var dt = new Date(item.node.createdAt);
            var date = dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate();
            var author = item.node.author?item.node.author.username:"";
            var slug = item.node.slug?item.node.slug:"";
            var status = item.node.status?item.node.status:"";

            var sMonth = dt.getFullYear() + "/" + (dt.getMonth() + 1);
            if (monthList.indexOf(sMonth)<0) monthList.push(sMonth);

            datatable.row.add([
              '<input class="pageListCb" type="checkbox" id="cb-'+item.node.id+'" ></input>',
              '<a href="/admin/pages/edit/'+item.node.id+'" >'+item.node.title+'</a>',
              slug,
              '<a href="">'+author+'</a>',
              '<center>'+status+'</center>',
              '<center>'+item.node.comments.edges.length+'</center>',
              '<center>'+date+'</center>'
            ])
          });
          me.setState({monthList: monthList});
          datatable.draw();
        }
    });
  },
  disableForm: function(state){
    $("#filterBtn").attr('disabled',state);
    $("#deleteBtn").attr('disabled',state);
    $("#dateFilter").attr('disabled',state);
    $("#statusFilter").attr('disabled',state);
    this.setState({loadingMsg: state?"Processing...":null});
  },
  handleDeleteBtn: function(event){
    var checkedRow = $("input.pageListCb:checked");
    if (checkedRow.length === 0) {
      //this.setState({errorMsg: "Please choose item to be deleted"});
      swal({
        title: 'Warning!',
        text: 'Please choose item to be deleted',
        timer: 5000
      }).then(
        function () {},
        // handling the promise rejection
        function (dismiss) {
          if (dismiss === 'timer') {
            console.log('I was closed by the timer')
          }
        }
      );
      return;
    }
    var me = this;

    swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(function(isConfirm) {
        if (isConfirm){
          me.disableForm(true);
          var idList =checkedRow.map(function(index, item){ return item.id.split("-")[1]});
          
          request({
            url: Config.scapholdUrl,
            method: "POST",
            json: true,
            headers: {
              "content-type": "application/json",
              "Authorization": "Bearer " + localStorage.token
            },
            body: Query.deletePostQry(idList)
          }, (error, response, body) => {
            if (!error && !body.errors && response.statusCode === 200) {
              console.log(JSON.stringify(body, null, 2));
              me.loadData(me.state.dt);
            } else {
              console.log(error);
              console.log(body.errors);
              console.log(response.statusCode);
              me.setState({errorMsg: error?error:body.errors});
            }
            me.disableForm(false);
            $( this ).dialog( "close" );
          })}})},
        
  componentDidMount: function(){
    var datatable = $('#pageListTbl').DataTable({
      sDom: '<"H"r>t<"F"ip>',
    });
    
    datatable.columns(1).every( function () {
        var that = this;
 
        $('#searchBox', this.footer() ).on( 'keyup change', function () {
            if ( that.search() !== this.value ) {
                that
                    .search( this.value )
                    .draw();
            }
        });
    } );
    
    this.setState({dt: datatable});
    this.loadData(datatable);
  },
  handleFilterBtn: function(){
    var status = $("#statusFilter").val();
    var date = $("#dateFilter").val();

    var searchValue = {
      4: status,
      6: date
    }

    this.state.dt.columns([4,6]).every( function () {
        this.search( searchValue[this.index()] ).draw();
    } );
  },
  render: function(){
    return (
      <div className="content-wrapper">
        <div className="container-fluid">
          <section className="content-header" style={{marginBottom:20}}>
            <h1>
              Page List
            </h1>
            <ol className="breadcrumb">
              <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
              <li className="active">Page List</li>
            </ol>
          </section>  
          { this.state.errorMsg &&
            <div className="alert alert-danger alert-dismissible">
              <button type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
              {this.state.errorMsg}
            </div>
          }
          { this.state.loadingMsg &&
            <div className="alert alert-warning alert-dismissible">
              <button type="button" className="close" data-dismiss="warning" aria-hidden="true">×</button>
              {this.state.loadingMsg}
            </div>
          }
          <section className="content">
            <div className="box box-default">
              <div className="box-body">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-xs-12">
                      <div style={{marginTop: 10, marginBottom: 20}}>
                          <button className="btn btn-default btn-flat" id="deleteBtn" style={{marginRight:10}} onClick={this.handleDeleteBtn}>Delete</button>
                          <select className="btn select" id="dateFilter" style={{marginRight:5,height:35}}>
                            {this.state.monthList.map(function(item){
                              if (item==="all")
                                return <option key="0" value="">All</option>
                              var s = item.split("/");
                              var monthList = Fn.getMonthList();
                              var month = monthList[parseInt(s[1])-1];
                              var year = s[0];
                              return <option key={item} value={item}>{month+" "+year}</option>
                            })}
                          </select>
                          <select className="btn select" id="statusFilter" style={{marginRight:5,height:35}}>
                            <option value="">All</option>
                            <option value="published">Published</option>
                            <option value="draft">Draft</option>
                          </select>
                          <button className="btn btn-default btn-flat" id="filterBtn" onClick={this.handleFilterBtn}>Filter</button>
                        <input className="pull-right" placeholder="Search..." id="searchBox" />
                      </div>                   
                      <table id="pageListTbl" className="display">
                        <thead>
                          <tr>
                            <th style={{width:7}}><input type="checkbox" id="selectAll"></input></th>
                            <th style={{textAlign: 'center'}}>Title</th>
                            <th style={{textAlign: 'center'}}>Slug</th>
                            <th style={{textAlign: 'center'}}>Author</th>
                            <th style={{textAlign: 'center'}}>Post Status</th>
                            <th style={{textAlign: 'center'}}>Comments</th>                             
                            <th style={{textAlign: 'center'}}>Publish Date</th>
                          </tr>
                      </thead>
                      <tbody><tr key="0"><td></td><td>Loading data...</td><td></td><td></td><td></td><td></td><td></td></tr></tbody>
                    </table>
                  </div>
                </div>
              </div>
             </div>
            </div>
          </section>
        </div>
      </div>
    )},
});

export default Pages;