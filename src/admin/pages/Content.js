import React from 'react';
import _ from 'lodash';
import Notification from 'react-notification-system';
import Query from '../query';
import {riques, hasRole, errorCallback, disableForm, swalert} from '../../utils';
import AdminConfig from '../AdminConfig';
import {Table, SearchBoxPost, DeleteButtons} from '../lib/Table';

const Content = React.createClass({
  getInitialState: function(){

    return {
      deleteMode: false,
      activeStatus: "All",
      itemSelected: false,
      fixedContent: {
        "postId": "fixed",
        "name": "Posts",
        "slug": "post",
        "fields": this._fieldTemplate(AdminConfig.PostFields),
        "status": "active",
        "createdAt": null
      }
    }
  },
  loadData: function(type, callback) {
    var me = this;
    var qry = Query.getContentListQry();
    
    riques(qry, 
      function(error, response, body) { 
        if (body.data) { 
          var _dataArr = [me.state.fixedContent];

          _.forEach(body.data.viewer.allContents.edges, function(item){
            var dt = new Date(item.node.createdAt);
            
            _dataArr.push({
              "postId": item.node.id,
              "name": item.node.name,
              "fields": me._fieldTemplate(item.node.fields),
              "slug": item.node.slug?item.node.slug:"",
              "status": item.node.status?item.node.status:"inactive",
              "createdAt": dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate()
            });

          });

          var bEdit = hasRole('modify-content');
          me.table.loadData(_dataArr, bEdit);

          if (callback) callback.call();
        } else {
          errorCallback(error, body.errors?body.errors[0].message:null);
        }
      }
    );
  },
  _fieldTemplate: function(arr){
    var fields = "<ul>";
    _.forEach(arr, function(item){ 
      var type = item.type?item.type:"text";
      fields += "<li>"+item.label+" ("+type+")</li>"
    })
    fields += "</ul>";

    return fields;
  },
  disableForm: function(state){
    disableForm(state, this.notification)
  },
  checkDynamicButtonState: function(){
    var checkedRow = document.querySelectorAll("input.contentListCb:checked");
    this.setState({itemSelected: checkedRow.length>0})
  },
  handleDeleteBtn: function(event){
    var me = this;
    var checkedRow = document.querySelectorAll("input.contentListCb:checked");
    var idList = _.map(checkedRow, function(item){ return item.id.split("-")[1]});
    swalert('warning', 'Sure want to delete?', "You might lost some data!",
      function () {
        me.disableForm(true);
        var qry = Query.deleteContentQry(idList);
        riques(qry, 
          function(error, response, body) {
            if (!error && !body.errors && response.statusCode === 200) {
              var here = me;
              var cb = function(){here.disableForm(false)}
              me.loadData("All", cb);
            } else {
              errorCallback(error, body.errors?body.errors[0].message:null);
            }
            me.disableForm(false);
          }
        );
      }
    );
  },
  handleAddNewBtn: function(postId){
    this.props.handleNav('content','new');
  },
  handleViewPage: function(postId){
    this.props.handleNav('content','edit', postId);
  },
  onAfterTableLoad: function(){
    var me = this;
    var linkFn = function(event){
      event.preventDefault();
      var postId = this.id.split("-")[1];
      me.handleViewPage(postId);
    }
    var titles = document.getElementsByClassName('contentName');
    _.forEach(titles, function(item){
      item.addEventListener("click", linkFn);
    });
  },
  componentDidMount: function(){
    this.notif = this.refs.notificationSystem;
    this.table = this.refs.rendactTable;
    var datatable = this.table.datatable;
    this.refs.rendactSearchBoxPost.bindToTable(datatable);
    this.loadData("All");
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
              <li className="active">Content Type</li>
            </ol>
            <div style={{borderBottom:"#eee" , borderBottomStyle:"groove", borderWidth:2, marginTop: 10}}></div>
          </section>
          <Notification ref="notificationSystem" /> 
          <section className="content">
            <div className="box box-default">
              <div className="box-body">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-xs-12">
                      <div style={{marginTop: 10, marginBottom: 20}}>
                        <DeleteButtons 
                          deleteMode={this.state.deleteMode}
                          itemSelected={this.state.itemSelected}
                          onDelete={this.handleDeleteBtn}
                        />                                          
                        <div className="box-tools pull-right">
                          <SearchBoxPost datatable={this.table} ref="rendactSearchBoxPost"/>
                        </div>
                      <div className="box-tools" style={{marginTop: 10}}>
                      </div>
                    </div>                   
                    <Table 
                      id="contentList"
                      columns={[
                        {id: 'name', label: "Content Type Name", type: "link", width: 250, cssClass: "contentName"},
                        {id: 'slug', label: "Slug", width: 50},
                        {id: 'fields', label: "Fields", width: 250},
                        {id: 'status', label: "Status", textAlign:"center"},
                        {id: 'createdAt', label: "Publish Date", textAlign:"center"}
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

export default Content;