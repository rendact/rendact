import React from 'react';
import $ from 'jquery';
window.jQuery = $;
import Query from '../query';
import Fn from '../lib/functions';
import {riques} from '../../utils';
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
  loadData: function(datatable, callback) {
    var me = this;
    riques(Query.getPageListQry, 
      function(error, response, body) {
        if (body.data) {
          datatable.clear();
          var monthList = ["all"];
          var here = me;
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
              '<a class="tableItem" href="#" id="tableItem-'+item.node.id+'" >'+item.node.title+'</a>',
              slug,
              '<a href="">'+author+'</a>',
              '<center>'+status+'</center>',
              '<center>'+item.node.comments.edges.length+'</center>',
              '<center>'+date+'</center>'
            ])
          });

          me.setState({monthList: monthList});
          datatable.draw();

          $(".tableItem").click(function(event){
            event.preventDefault();
            var postId = this.id.split("-")[1];
            here.handleViewPage(postId);
          });

          if (callback) callback.call();
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
    );
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
    var idList =checkedRow.map(function(index, item){ return item.id.split("-")[1]});
    swal({
      title: 'Sure want to delete?',
      text: "You might lost some data!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      confirmButtonClass: 'btn swal-btn-success',
      cancelButtonClass: 'btn swal-btn-danger',
      buttonsStyling: true
    }).then(function () {
      me.disableForm(true);
      riques(Query.deletePostQry(idList), 
        function(error, response, body) {
          if (!error && !body.errors && response.statusCode === 200) {
            console.log(JSON.stringify(body, null, 2));
            var here = me;
            var cb = function(){here.disableForm(false)}
            me.loadData(me.state.dt, cb);
          } else {
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
            me.disableForm(false);
          }
        }
      );
    })},
        
  componentDidMount: function(){
    var datatable = $('#pageListTbl').DataTable({
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
            return null;
        });
        return null;
    } );
    
    this.setState({dt: datatable});
    this.loadData(datatable);
  },
  handleAddNewBtn: function(event) {
    this.props.handleAddNewPage();
  },
  handleFilterBtn: function(datatable, callback){
    var datatable = $('#pageListTbl').DataTable();
    var status = $("#statusFilter").val();
    if(status==='deleted'){
      var me = this;
      riques(Query.getPageDelQry, 
        function(error, response, body) {
          if (body.data) {
            datatable.clear();
            var monthList = ["all"];
            var here = me;
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
                '<a class="tableItem" href="#" id="tableItem-'+item.node.id+'" >'+item.node.title+'</a>',
                slug,
                '<a href="">'+author+'</a>',
                '<center>'+status+'</center>',
                '<center>'+item.node.comments.edges.length+'</center>',
                '<center>'+date+'</center>'
              ])
            });

            me.setState({monthList: monthList});
            datatable.draw();

            $(".tableItem").click(function(event){
              event.preventDefault();
              var postId = this.id.split("-")[1];
              here.handleViewPage(postId);
            });

            if (callback) callback.call();
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
      );
    }else{
        var status = $("#statusFilter").val();
        var date = $("#dateFilter").val();
        var searchValue = {
          4: status,
          6: date
        };
        this.loadData(
          this.state.dt.columns([4,6]).every( function () {
            this.search( searchValue[this.index()] ).draw();
            return null;
          })
        )
    } ;
  },
  handleViewPage: function(postId){
    this.props.handleViewPage('pages','edit', postId);
  },
  render: function(){
    return (
      <div className="content-wrapper">
        <div className="container-fluid">
          <section className="content-header" style={{marginBottom:20}}>
            <h1>
              Page List
              <small style={{marginLeft: 5}}>
                <button className="btn btn-default btn-primary add-new-post-btn" onClick={this.handleAddNewBtn}>Add new</button>
              </small>
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
                                return (<option key="0" value="">All</option>);
                              var s = item.split("/");
                              var monthList = Fn.getMonthList();
                              var month = monthList[parseInt(s[1],10)-1];
                              var year = s[0];
                              return <option key={item} value={item}>{month+" "+year}</option>
                            })}
                          </select>
                          <select className="btn select" id="statusFilter" style={{marginRight:5,height:35}}>
                            <option value="">All</option>
                            <option value="published">Published</option>
                            <option value="draft">Draft</option>
                            <option value="deleted">Deleted</option>
                          </select>
                          <button className="btn btn-default btn-flat" id="filterBtn" onClick={this.handleFilterBtn}>Filter</button>
                        <input className="pull-right" placeholder="Search..." id="searchBox" />
                      </div>                   
                      <table id="pageListTbl" className="display">
                        <thead>
                          <tr>
                            <th style={{width:7}}><input type="checkbox" id="selectAll"></input></th>
                            <th style={{width: 400, textAlign: 'center'}}>Title</th>
                            <th style={{textAlign: 'center'}}>Slug</th>
                            <th style={{textAlign: 'center'}}>Author</th>
                            <th style={{textAlign: 'center'}}>Post Status</th>
                            <th style={{width:30, textAlign: 'center'}}>Comments</th>                             
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