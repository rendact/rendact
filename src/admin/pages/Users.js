import React from 'react';
import $ from 'jquery';
window.jQuery = $;
import _ from 'lodash';
import Query from '../query';
import Fn from '../lib/functions';
import {riques} from '../../utils';
import { default as swal } from 'sweetalert2';
import Config from '../../config';

const errorCallback = function(msg1, msg2){
  if (msg1) swal('Failed!', msg1, 'warning')
  else if (msg2) swal('Failed!', msg2, 'warning')
  else swal('Failed!', 'Unknown error','warning')
}

const Users = React.createClass({
  getInitialState: function(){
    require ('datatables');
    require ('datatables/media/css/jquery.dataTables.min.css');
    require ('./Pages.css');

    return {
      dt: null,
      errorMsg: null,
      loadingMsg: null,
      monthList: [],
      deleteMode: false,
      statusList: ["All", "Administrator", "Editor", "Author", "Subscriber", "Guest"],
      dynamicStateBtnList: ["deleteBtn", "recoverBtn", "deletePermanentBtn"],
      activeStatus: "All",
      itemSelected: false
    }
  },
  loadData: function(datatable, type, callback) {
    var me = this;

    riques(Query.getUserListQry, 
      function(error, response, body) {
        if (!error && !body.error) {
          if (body.data) {
            var here = me;
            datatable.clear();
            _.forEach(body.data.viewer.allUsers.edges, function(item){
              var img = "<img src='/images/photo1.png' width='100' />";
              datatable.row.add([
                '<input class="userListCb" type="checkbox" id="cb-'+item.node.id+'" ></input>',
                '<center>'+img+'</center>',
                '<a class="tableItem" href="#" id="tableItem-'+item.node.id+'" >'+item.node.username+'</a>',
                '<center>'+item.node.email+'</center>',
                '<center>'+item.node.fullName+'</center>',
                '<center>'+item.node.gender+'</center>',
                '<center>Administrator</center>',
                '<center>'+item.node.posts.edges.length+'</center>'
              ])
            });

            datatable.draw();

            $(".tableItem").click(function(event){
              event.preventDefault();
              var userId = this.id.split("-")[1];
              here.handleViewUser(userId);
            });
            $(".userListCb").click( function(){
              here.checkDynamicButtonState();
            });
            $('#selectAll').click(function () {
              $(':checkbox', datatable.rows().nodes()).prop('checked', this.checked);
              here.checkDynamicButtonState();
            });

            if (callback) callback.call();
            datatable.draw();
          }else{ errorCallback(error, body.errors?body.errors[0].message:null); }
        }
      }
    );
  },
  disableForm: function(state){
    var me = this;
    _.forEach(document.getElementsByTagName('input'), function(el){ el.disabled = state;})
    _.forEach(document.getElementsByTagName('button'), function(el){ 
      if (_.indexOf(me.state.dynamicStateBtnList, el.id) < 0)
        el.disabled = state;
    })
    _.forEach(document.getElementsByTagName('select'), function(el){ el.disabled = state;})
    this.setState({loadingMsg: state?"Processing...":null});
    if (!state) {
      this.checkDynamicButtonState();
    }
  },
  checkDynamicButtonState: function(){
    var checkedRow = $("input.userListCb:checked");
    this.setState({itemSelected: checkedRow.length>0})
  },
  handleDeleteBtn: function(event){
    var checkedRow = $("input.userListCb:checked");
    var me = this;
    var idList =checkedRow.map(function(index, item){ return item.id.split("-")[1]});
    swal(_.merge({
      title: 'Sure want to delete?',
      text: "You might lost some data!",
      type: 'warning',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    },Config.defaultSwalStyling)).then(function () {
      me.disableForm(true);
      riques(Query.deletePostQry(idList), 
        function(error, response, body) {
          if (!error && !body.errors && response.statusCode === 200) {
            console.log(JSON.stringify(body, null, 2));
            var here = me;
            var cb = function(){here.disableForm(false)}
            me.loadData(me.state.dt, cb);
          } else {
            errorCallback(error, body.errors?body.errors[0].message:null);
            me.disableForm(false);
          }
        }
      );
    })
  },
  handleAddNewBtn: function(event) {
    this.props.handleNav('users','new');
  },
  handleStatusFilter: function(event){
    this.disableForm(true);
    var status = event.target.text;
    this.setState({activeStatus: status});
    var re = this;
    this.loadData(this.state.dt, status, function(){
      re.setState({deleteMode: false});
      re.disableForm(false);
    })  
  },
  handleViewUser: function(userId){
    this.props.handleNav('users','edit', userId);
  },
  componentDidMount: function(){
    var datatable = $('#userListTbl').DataTable({sDom: '<"H"r>t<"F"ip>'}); 
    
    datatable.columns(1).every( function () {
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
    
    this.setState({dt: datatable});
    this.loadData(datatable, "All");
  },
  render: function(){
    return (
      <div className="content-wrapper">
        <div className="container-fluid">
          <section className="content-header" style={{marginBottom:20}}>
            <h1>
              User List
              <small style={{marginLeft: 5}}>
                <button className="btn btn-default btn-primary add-new-post-btn" onClick={this.handleAddNewBtn}>Add new</button>
              </small>
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
                          { !this.state.deleteMode &&    
                            [<button className="btn btn-default btn-flat" id="deleteBtn" onClick={this.handleDeleteBtn} style={{marginRight:10}} 
                            disabled={!this.state.itemSelected}><span className="fa fa-trash-o" ></span> Delete</button>]
                          }   
                        <div className="box-tools pull-right">
                          <div className="input-group" style={{width: 200}}>
                            <input type="text" id="searchBox" className="form-control" placeholder="Search"/>

                            <div className="input-group-btn">
                              <button className="btn btn-default"><i className="fa fa-search"></i></button>
                            </div>
                          </div>
                        </div>
                        <div className="box-tools" style={{marginTop: 10}}>
                          <b>Status:</b> {this.state.statusList.map(function(item, index, array){
                            var last = (index===(array.length-1));
                            var border = last?"":"1px solid";
                            var color = item===this.state.activeStatus?{color: "black", fontWeight: "bold"}:{};
                            return <span key={index} style={{paddingRight: 7, paddingLeft: 7, borderRight: border}}>
                                    <a href="#" onClick={this.handleStatusFilter} style={color}>{item}</a>
                                   </span>
                          }.bind(this))}
                        </div>
                      </div>                   
                      <table id="userListTbl" className="display">
                        <thead>
                          <tr>
                            <th style={{width:7}}><input type="checkbox" id="selectAll"></input></th>
                            <th style={{width: 10, textAlign: 'center'}}>Avatar</th>
                            <th style={{textAlign: 'center'}}>Username</th>
                            <th style={{textAlign: 'center'}}>Email</th>
                            <th style={{textAlign: 'center'}}>Full Name</th>
                            <th style={{textAlign: 'center'}}>Gender</th>
                            <th style={{textAlign: 'center'}}>Role</th>
                            <th style={{width:30, textAlign: 'center'}}>Posts</th>                             
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