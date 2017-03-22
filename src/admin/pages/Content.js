import React from 'react';
import $ from 'jquery';
window.jQuery = $;
import _ from 'lodash';
import Notification from 'react-notification-system';
import Query from '../query';
import {riques} from '../../utils';
import { default as swal } from 'sweetalert2';
import Config from '../../config';


const errorCallback = function(msg1, msg2){
  if (msg1) swal('Failed!', msg1, 'warning')
  else if (msg2) swal('Failed!', msg2, 'warning')
  else swal('Failed!', 'Unknown error','warning')
}

const Content = React.createClass({
  getInitialState: function(){
    require ('datatables');
    require ('datatables/media/css/jquery.dataTables.min.css');
    require ('./Pages.css');

    return {
      dt: null,
      monthList: [],
      deleteMode: false,
      statusList: ["All", "Published", "Draft", "Pending Review", "Deleted"],
      dynamicStateBtnList: ["deleteBtn", "recoverBtn", "deletePermanentBtn"],
      activeStatus: "All",
      itemSelected: false,
      notification: null
    }
  },
  loadData: function(datatable, type, callback) {
    
  },
  disableForm: function(state){
    var me = this;
    _.forEach(document.getElementsByTagName('input'), function(el){ el.disabled = state;})
    _.forEach(document.getElementsByTagName('button'), function(el){ 
      if (_.indexOf(me.state.dynamicStateBtnList, el.id) < 0)
        el.disabled = state;
    })
    _.forEach(document.getElementsByTagName('select'), function(el){ el.disabled = state;})
    this.notification.addNotification({
      message: 'Processing...',
      level: 'warning',
      position: 'tr',
      autoDismiss: 2
    });
    if (!state) {
      this.checkDynamicButtonState();
    }
  },
  checkDynamicButtonState: function(){
    var checkedRow = $("input.pageListCb:checked");
    this.setState({itemSelected: checkedRow.length>0})
  },
  handleDeleteBtn: function(event){
    var me = this;
    var checkedRow = $("input.pageListCb:checked");
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
            var here = me;
            var cb = function(){here.disableForm(false)}
            me.loadData(me.state.dt, "All", cb);
          } else {
            errorCallback(error, body.errors?body.errors[0].message:null);
            me.disableForm(false);
          }
        }
      );
    })},
  handleDeletePermanent: function(event){
    var checkedRow = $("input.pageListCb:checked");
    var me = this;
    var idList =checkedRow.map(function(index, item){ return item.id.split("-")[1]});
    swal(_.merge({
      title: 'Sure want to delete permanently?',
      text: "You might lost some data forever!",
      type: 'warning',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    },Config.defaultSwalStyling)).then(function () {
      me.disableForm(true);
      riques(Query.deletePostPermanentQry(idList), 
        function(error, response, body) {
          if (!error && !body.errors && response.statusCode === 200) {
            var here = me;
            var cb = function(){here.disableForm(false)}
            me.loadData(me.state.dt, "Deleted", cb);
          } else {
            errorCallback(error, body.errors?body.errors[0].message:null);
            me.disableForm(false);
          }
        }
      );
    })
  },
  handleEmptyTrash: function(event){
    var checkedRow = $("input.pageListCb");
    var me = this;
    var idList =checkedRow.map(function(index, item){ return item.id.split("-")[1]});
    swal(_.merge({
      title: 'Sure want to empty trash?',
      text: "You might lost some data forever!",
      type: 'warning',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!'
    }, Config.defaultSwalStyling)).then(function () {
      me.disableForm(true);
      riques(Query.deletePostPermanentQry(idList), 
        function(error, response, body) {
          if (!error && !body.errors && response.statusCode === 200) {
            var here = me;
            var cb = function(){here.disableForm(false)}
            me.loadData(me.state.dt, "Deleted", cb);
          } else {
            errorCallback(error, body.errors?body.errors[0].message:null);
            me.disableForm(false);
          }
        }
      );
    })
  },
  handleRecover: function(event){
    var checkedRow = $("input.pageListCb:checked");
    var me = this;
    var idList =checkedRow.map(function(index, item){ return item.id.split("-")[1]});
    swal(_.merge({
      title: 'Sure want to recover?',
      text: "Please look carefully!",
      type: 'warning',
      confirmButtonText: 'Yes, recover it!',
      cancelButtonText: 'No, cancel!',
    },Config.defaultSwalStyling)).then(function () {
      me.disableForm(true);
      riques(Query.recoverPostQry(idList), 
        function(error, response, body) {
          if (!error && !body.errors && response.statusCode === 200) {
            console.log(JSON.stringify(body, null, 2));
            var here = me;
            var cb = function(){here.disableForm(false)}
            me.loadData(me.state.dt, "Deleted", cb);
          } else {
            errorCallback(error, body.errors?body.errors[0].message:null);
            me.disableForm(false);
          }
        }
      );
    })},
  handleAddNewBtn: function(event) {
    
  },
  handleStatusFilter: function(event){
    this.disableForm(true);
    var status = event.target.text;
    this.setState({activeStatus: status});
    if (status==='Deleted'){
      var me = this;
      this.loadData(this.state.dt, "Deleted", function(){
        me.setState({deleteMode: true});
        me.disableForm(false);
      });
    }else{
      var re = this;
      this.loadData(this.state.dt, status, function(){
        re.setState({deleteMode: false});
        re.disableForm(false);
      })
    } ;
  },
  handleDateFilter: function(event){
    this.disableForm(true);
    var status = this.state.activeStatus;
    if (status==='Deleted'){
      var me = this;
      this.loadData(this.state.dt, "Deleted", function(){
        me.setState({deleteMode: true});
        me.disableForm(false);
      });
    }else{
      var date = $("#dateFilter").val();
      var searchValue = { 6: date };
      var te = this;
      this.loadData(this.state.dt, status, function(){
        te.setState({deleteMode: false});
        te.state.dt.columns([6]).every( function () {
          this.search( searchValue[this.index()] ).draw();
          return null;
        })
        te.disableForm(false);
      })
    } ;
  },
  handleViewPage: function(postId){
    this.props.handleNav('pages','edit', postId);
  },
  componentDidMount: function(){
    var datatable = $('#pageListTbl').DataTable({sDom: '<"H"r>t<"F"ip>'}); 
    this.notification = this.refs.notificationSystem;

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
              Content Type List
              <small style={{marginLeft: 5}}>
                <button className="btn btn-default btn-primary add-new-post-btn" onClick={this.handleAddNewBtn}>Add new</button>
              </small>
            </h1>
            <ol className="breadcrumb">
              <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
              <li className="active">Content Type List</li>
            </ol>
          </section>
          <Notification ref="notificationSystem" /> 
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
                          { this.state.deleteMode && 
                            [<button key="recoverBtn" className="btn btn-default btn-flat" id="recoverBtn" style={{marginRight:10}} onClick={this.handleRecover}
                             disabled={!this.state.itemSelected} ><span className="fa fa-support" ></span> Recover</button>,
                             <button key="deletePermanentBtn" className="btn btn-default btn-flat" id="deletePermanentBtn" style={{marginRight:10}} onClick={this.handleDeletePermanent}
                             disabled={!this.state.itemSelected}><span className="fa fa-trash-o" ></span> Delete Permanently</button>,
                             <button key="emptyTrashBtn" className="btn btn-default btn-flat" id="emptyTrashBtn" onClick={this.handleEmptyTrash}><span className="fa fa-trash" ></span> Empty Trash</button>]
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
                        </div>
                      </div>                   
                      <table id="pageListTbl" className="display">
                        <thead>
                          <tr>
                            <th style={{width:7}}><input type="checkbox" id="selectAll"></input></th>
                            <th style={{width: 500, textAlign: 'center'}}>Content Type Name</th>
                            <th style={{textAlign: 'center'}}>ID</th>
                            <th style={{textAlign: 'center'}}>Status</th>
                            <th style={{textAlign: 'center'}}>Published</th>
                          </tr>
                      </thead>
                      <tbody>
                        <tr key="0">
                          <td><input type="checkbox" id="news" /></td>
                          <td>News</td>
                          <td style={{textAlign: 'center'}}>news</td>
                          <td style={{textAlign: 'center'}}>Active</td>
                          <td style={{textAlign: 'center'}}>16/03/2017</td>
                        </tr>
                      </tbody>
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

export default Content;