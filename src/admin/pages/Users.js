import React from 'react';
import _ from 'lodash';
import $ from 'jquery';
window.jQuery = $;
import Query from '../query';
import {riques} from '../../utils';
import { default as swal } from 'sweetalert2';

const Users = React.createClass({

  getInitialState: function(){
    require ('datatables');
    require ('datatables/media/css/jquery.dataTables.min.css');
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
    console.log(Query.getUserListQry)

    riques(Query.getUserListQry, 
      function(error, response, body) {
        if (!error && !body.error) {
          if (body.data) {
            datatable.clear();
            _.forEach(body.data.viewer.allUsers.edges, function(item){
              var img = "<img src='/images/photo1.png' width='100' />";
              datatable.row.add([
                '<input class="userListCb" type="checkbox" id="cb-'+item.node.id+'" ></input>',
                '<center>'+img+'</center>',
                '<a href="/admin/users/edit/'+item.node.id+'" >'+item.node.username+'</a>',
                '<center>'+item.node.email+'</center>',
                '<center>'+item.node.fullName+'</center>',
                '<center>'+item.node.gender+'</center>',
                '<center>'+item.node.posts.edges.length+'</center>',
                '<center>'+item.node.lastLogin+'</center>'
              ])
            });

            if (callback) callback.call();
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
                body.errors[0].message,
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
  disableForm: function(state){
    document.getElementById("filterBtn").attributes.disabled = state;
    document.getElementById("deleteBtn").attributes.disabled = state;
    document.getElementById("dateFilter").attributes.disabled = state;
    document.getElementById("statusFilter").attributes.disabled = state;
    this.setState({loadingMsg: state?"Processing...":null});
  },
  handleDeleteBtn: function(event){
    var checkedRow = $("input.userListCb:checked");
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
    var datatable = $('#userListTbl').DataTable({
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
  render: function(){
    return (
      <div className="content-wrapper">
        <div className="container-fluid">
          <section className="content-header" style={{marginBottom:20}}>
            <h1>
              User List
            </h1>
            <ol className="breadcrumb">
              <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
              <li className="active">User List</li>
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
                        <input className="pull-right" placeholder="Search..." id="searchBox" />
                      </div>                   
                      <table id="userListTbl" className="display">
                        <thead>
                          <tr>
                            <th style={{width:7}}><input type="checkbox" id="selectAll"></input></th>
                            <th style={{width: 400, textAlign: 'center'}}>Avatar</th>
                            <th style={{textAlign: 'center'}}>Username</th>
                            <th style={{textAlign: 'center'}}>Email</th>
                            <th style={{textAlign: 'center'}}>Full Name</th>
                            <th style={{textAlign: 'center'}}>Gender</th>
                            <th style={{width:30, textAlign: 'center'}}>Posts</th>                             
                            <th style={{textAlign: 'center'}}>Last Login</th>
                          </tr>
                      </thead>
                      <tbody><tr key="0"><td></td><td>Loading data...</td><td></td><td></td><td></td><td></td><td></td><td></td></tr></tbody>
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

export default Users;