import React from 'react';
import $ from 'jquery';
import Query from '../query';
import _ from 'lodash';
import Notification from 'react-notification-system';
import {riques, hasRole, errorCallback, getValue, setValue, removeTags, swalert, disableForm} from '../../utils';
import {Table, SearchBox, DeleteButtons} from '../lib/Table';

const CategoryContent = React.createClass({
  getInitialState: function(){
      require ('../pages/Posts.css');

      return {
        dt: null,
        errorMsg: null,
        loadingMsg: null,
        monthList: [],
        postId:"",
        deleteMode: false,
        mode: "create",
        statusList: ["All", "Published", "Draft", "Pending Review", "Deleted"],
        dynamicStateBtnList: ["deleteBtn", "recoverBtn", "deletePermanentBtn"],
        activeStatus: "All",
        itemSelected: false
      }
  },
  loadData: function(type, callback) {
    var me = this;
    var qry = Query.getAllCategoryQry;
    riques(qry, 
      function(error, response, body) { 
        if (body.data) { 
          var monthList = ["all"];
          var _dataArr = [];

          _.forEach(body.data.viewer.allCategories.edges, function(item){
            _dataArr.push({
              "postId": item.node.id,
              "name": item.node.name,
              "description": "",
              "count": item.node.post.edges.length
            });
          });

          var bEdit = hasRole('modify-category');
          me.table.loadData(_dataArr, bEdit);
          me.setState({monthList: monthList});

          if (callback) callback.call();
        } else {
          errorCallback(error, body.errors?body.errors[0].message:null);
        }
      }
    );
  },
  handleDeleteBtn: function(event){;
    var me = this;
    var checkedRow = $("input.categoryCb:checked");
    var idList = _.map(checkedRow, function(item){ return item.id.split("-")[1]});
    swalert('warning','Sure want to delete?',"You might lost some data!",
      function () {
        me.disableForm(true);
        riques(Query.deleteCategoryPermanentQry(idList), 
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
    disableForm(state, this.notif);
  },
  checkDynamicButtonState: function(){
    var checkedRow = $("input.categoryCb:checked");
    this.setState({itemSelected: checkedRow.length>0})
  },
  handleViewPost: function(postId){
    this.props.handleNav('posts','edit', postId);
  },
  onAfterTableLoad: function(){
    var me = this;
    $(".nameText").click(function(event){
      event.preventDefault();
      var index = this.id.split("-")[0];
      var row = me.table.datatable.data()[index];
      var postId = this.id.split("-")[1];
      var name = removeTags(row[1]);
      setValue("name", name);
      me.setState({mode: "update", postId: postId});
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
  handleSubmit: function(event){
    event.preventDefault();
    var me = this;
    var name = getValue("name");
    var qry = "";
    
    me.disableForm(true);
    if (this.state.mode==="create") {
      qry = Query.createCategory(name);
      this.setState({mode: "update"});
    } else {
      qry = Query.updateCategory(this.state.postId, name);
    }
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
      });
  },
  resetForm: function(){
    document.getElementById("pageForm").reset();
    setValue("name", "");
    this.setState({mode: "create"});
    window.history.pushState("", "", '/admin/category');
  },

  render: function(){
    return (
      <div className="content-wrapper">
        <div className="container-fluid">
          <section className="content-header" style={{marginBottom:20}}>
            <h1>
              Categories
            </h1>
            <ol className="breadcrumb">
              <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
              <li className="active">Categories</li>
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
                    <form onSubmit={this.handleSubmit} id="pageForm" method="get">
                      <div className="form-group">
                        <h4><b>{this.state.mode==="create"?"Add New Category":"Edit Category"}</b></h4>
                      </div>
                      <div className="form-group">
                          <label htmlFor="name" >Name</label>
                          <div >
                            <input type="text" name="name" id="name" className="form-control" required="true"/>
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
                          
                            <input type="submit" name="submit" id="submit" value={this.state.mode==="create"?"Add New Category":"Edit Category"} className="btn btn-primary btn-sm" />
                            <input type="button" value="Reset" style={{marginLeft: 10}} onClick={this.resetForm} className="btn btn-primary btn-sm"/>
                            
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
                          id="category"
                          columns={[
                            {id: 'name', label: "Name", type: "link", textAlign:"center", cssClass:"nameText"},
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

export default CategoryContent;