import React from 'react';
import $ from 'jquery';
import Query from '../query';
import _ from 'lodash';
import Notification from 'react-notification-system';
import {riques, hasRole, errorCallback, setValue, getValue, removeTags, disableForm} from '../../utils';
import { default as swal } from 'sweetalert2';
import AdminConfig from '../AdminConfig';
import { Table, SearchBox, DeleteButtons} from '../lib/Table';

const Tag = React.createClass({
  getInitialState: function(){
      require ('./Posts.css');

      return {
        name:"",
        postId:"",
        dt: null,
        errorMsg: null,
        loadingMsg: null,
        monthList: [],
        deleteMode: false,
        statusList: ["All", "Published", "Draft", "Pending Review", "Deleted"],
        dynamicStateBtnList: ["deleteBtn", "recoverBtn", "deletePermanentBtn"],
        activeStatus: "All",
        itemSelected: false,
        mode: "create",
      }
  },
  loadData: function(postId, callback) {
    var me = this;
    var qry = Query.getAllTagQry;
    riques(qry, 
      function(error, response, body) { 
        if (body.data) { 
          var monthList = ["all"];
          var _dataArr = [];

          _.forEach(body.data.viewer.allTags.edges, function(item){
            _dataArr.push({
              "postId": item.node.id,
              "name": item.node.name,
              "description": "",
              "count": ""
            });
          });

          var bEdit = hasRole('modify-tag');
          me.table.loadData(_dataArr, bEdit);
          me.setState({monthList: monthList});

          if (callback) callback.call();
        } else {
          errorCallback(error, body.errors?body.errors[0].message:null);
        }
      }
    );
  },
  handleDeleteBtn: function(event){
    var me = this;
    var checkedRow = $("input.tagCb:checked");
    var idList =checkedRow.map(function(index, item){ return item.id.split("-")[1]});
    
    swal(_.merge({
      title: 'Sure want to delete?',
      text: "You might lost some data!",
      type: 'warning',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    },AdminConfig.defaultSwalStyling)).then(function () {
      me.disableForm(true);
      riques(Query.deleteTagPermanentQry(idList), 
        function(error, response, body) {
          if (!error && !body.errors && response.statusCode === 200) {
            var here = me;
            var cb = function(){here.disableForm(false)}
            me.loadData("All", cb);
          } else {
            errorCallback(error, body.errors?body.errors[0].message:null);
            me.disableForm(false);
          }
        }
      );
  })},
  disableForm: function(state){
    disableForm(state, this.notif)
  },
  resetForm: function(){
    document.getElementById("tagForm").reset();
    this.setState({name:"", mode: "create"});
    this.handleNameChange();
    window.history.pushState("", "", '/admin/tag');
  },
  checkDynamicButtonState: function(){
    var checkedRow = $("input.tagCb:checked");
    this.setState({itemSelected: checkedRow.length>0})
  },
  handleNameChange: function(event){
    var name = $("#name").val();
    this.setState({name: name})
  },
  onAfterTableLoad: function(){
    var me = this;
    $(".nameText").click(function(event){
      event.preventDefault();
      var index = this.id.split("-")[0];
      var row = me.table.datatable.data()[index];
      var postId = this.id.split("-")[1];
      var name = removeTags(row[1]);
      //setValue("postId", postId);
      setValue("name", name);
      me.setState({postId: postId});
      me.setState({mode: "update"});
    });
  },
  
  handleSubmit: function(event){
    event.preventDefault();
    var me = this;
    var name = getValue("name");
    var postId = this.state.postId;
    this.disableForm(true);
    var qry = "", noticeTxt = "";

    if (this.state.mode==="create"){
      qry = Query.createTag(name);
      noticeTxt = 'Tag Published!';
    }else{
      qry = Query.UpdateTag(postId, name);
      noticeTxt = 'Tag Updated!';
    }

    riques(qry, 
      function(error, response, body) { 
        if (!error && !body.errors && response.statusCode === 200) {
          me.notif.addNotification({
                  message: noticeTxt,
                  level: 'success',
                  position: 'tr',
                  autoDismiss: 2
          });
          me.resetForm();
          var here = me;
          var cb = function(){here.disableForm(false)}
          me.loadData("All", cb);
        } else {
          errorCallback(error, body.errors?body.errors[0].message:null);
        }
        me.disableForm(false);
      });
  },
  componentDidMount: function(){
    this.notif = this.refs.notificationSystem;
    this.table = this.refs.rendactTable;
    var datatable = this.table.datatable;
    this.refs.rendactSearchBox.bindToTable(datatable);
    this.setState({dt: datatable});
    this.loadData("All");
  },

  render: function(){
    return (
      <div className="content-wrapper">
        <div className="container-fluid">
          <section className="content-header" style={{marginBottom:20}}>
            <h1>
              Tags
            </h1>
            <ol className="breadcrumb">
              <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
              <li className="active">Tags</li>
            </ol>
            <div style={{borderBottom:"#eee" , borderBottomStyle:"groove", borderWidth:2, marginTop: 10}}></div>
          </section>  
          <Notification ref="notificationSystem" /> 
          <section className="content">
            <div className="box box-default">
              <div className="box-body">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-xs-4" style={{marginTop: 40}}>
                    <form onSubmit={this.handleSubmit} id="tagForm" method="get">
                      <div className="form-group">
                        <h4><b>{this.state.mode==="create"?"Add New Tag":"Edit Tag"}</b></h4>
                      </div>
                      <div className="form-group">
                          <label htmlFor="name" >Name</label>
                          <div >
                            <input type="text" name="name" id="name" className="form-control" required="true" onChange={this.handleNameChange}/>
                            <p className="help-block">The name appears on your site</p>
                          </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="homeUrl" >Description</label>
                        <div >
                          <textarea name="description" id="description" className="form-control"></textarea>
                          <p className="help-block">The description is not prominent by default; however, some themes may show it.</p>
                        </div>
                      </div>
                       <div className="form-group">
                          <button type="submit" id="submit" className="btn btn-primary btn-flat" 
                          disabled={this.state.name===""}>{this.state.mode==="update"?"Save Changes":"Add New Tag"}</button>
                      </div>
                    </form>
                    </div>
                    <div className="col-xs-8">
                      <div style={{marginTop: 10, marginBottom: 20}}>
                          <DeleteButtons 
                            deleteMode={this.state.deleteMode}
                            itemSelected={this.state.itemSelected}
                            onDelete={this.handleDeleteBtn}
                            onRecover={this.handleRecover}
                            onDeletePermanent={this.handleDeletePermanent}
                            onEmptyTrash={this.handleEmptyTrash}
                          />                  
                        <div className="box-tools pull-right">
                          <SearchBox datatable={this.table} ref="rendactSearchBox"/>
                        </div>
                      </div>                   
                      <Table
                          id="tag"
                          columns={[
                            {id: 'name', label: "Name", type: "link", target: "", cssClass:"nameText"},
                            {id: 'description', label: "Description", textAlign:"center", width: 400},
                            {id: 'count', label: "Count", textAlign:"center"}
                          ]}
                          checkBoxAtFirstColumn="true"
                          ref="rendactTable"
                          onSelectAll={this.checkDynamicButtonState}
                          onCheckBoxClick={this.checkDynamicButtonState}
                          onAfterLoad={this.onAfterTableLoad}
                        />
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

export default Tag;
