import React from 'react';
import Query from '../query';
import _ from 'lodash';
import Notification from 'react-notification-system';
import Halogen from 'halogen'
import {riques, hasRole, errorCallback, getValue, setValue, removeTags, swalert, disableForm, defaultHalogenStyle} from '../../utils';
import {Table, SearchBox, DeleteButtons} from '../lib/Table';
import {connect} from 'react-redux'
import {initContentList, maskArea, setEditorMode, toggleSelectedItemState} from '../../actions'

let CategoryContent = React.createClass({
  propTypes: {
    isProcessing: React.PropTypes.bool.isRequired,
    opacity: React.PropTypes.number.isRequired,
    errorMsg: React.PropTypes.string,
    loadingMsg: React.PropTypes.string,
    postId: React.PropTypes.string,
    mode: React.PropTypes.string,
    deleteMode: React.PropTypes.bool,
    statusList: React.PropTypes.arrayOf(React.PropTypes.string),
    dynamicStateBtnList: React.PropTypes.arrayOf(React.PropTypes.string),
    activeStatus: React.PropTypes.string,
    itemSelected: React.PropTypes.bool
  },
  getDefaultProps: function() {
    return {
      isProcessing: false,
      opacity: 1,
      monthList: [],
      deleteMode: false,
      mode: "create",
      statusList: ["All", "Published", "Draft", "Pending Review", "Deleted"],
      dynamicStateBtnList: ["deleteBtn", "recoverBtn", "deletePermanentBtn"],
      activeStatus: "All",
      itemSelected: false
    }
  },
  dt: null,
  loadData: function(type, callback) {
    var me = this;
    var qry = Query.getAllCategoryQry(this.props.postType);
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
          me.props.dispatch(initContentList(monthList))
          if (callback) callback.call();
        } else {
          errorCallback(error, body.errors?body.errors[0].message:null);
        }
      }
    );
  },
  handleDeleteBtn: function(event){;
    var me = this;
    var checkedRow = document.querySelectorAll("input.category-"+this.props.slug+"Cb:checked");
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
    this.props.dispatch(maskArea(state));
  },
  checkDynamicButtonState: function(){
    var checkedRow = document.querySelectorAll("input.category-"+this.props.slug+"Cb:checked");
    this.props.dispatch(toggleSelectedItemState(checkedRow.length>0));
  },
  handleViewPage: function(categoryId){
    this.props.handleNav(this.props.slug,'bycategory', categoryId);
  },
  handleTextTitleClick: function(e){
  debugger
    e.preventDefault()
    let postId = e.currentTarget.id.split("-")[1]
    this.handleViewPost(postId)
  },
  onAfterTableLoad: function(){
    var me = this;
    var nameLink = function(event){
      event.preventDefault();
      var index = this.id.split("-")[0];
      var row = me.table.datatable.data()[index];
      var postId = this.id.split("-")[1];
      var name = removeTags(row[1]);
      setValue("name", name);
      me.props.dispatch(setEditorMode("update", postId))
    }

    var names = document.getElementsByClassName('nameText');
    _.forEach(names, function(item){
      item.addEventListener('click',nameLink);
    });

    var postLink = function(event){
      event.preventDefault();
      var categoryId = this.id.split("-")[1];
      me.handleViewPage(categoryId);
    }

    var titles = document.getElementsByClassName('categoryText');
    _.forEach(titles, function(item){
      item.addEventListener('click',postLink);
    });
  },
  componentDidMount: function(){
    require ('../pages/Posts.css');
    this.notif = this.refs.notificationSystem;
    this.table = this.refs.rendactTable;
    var datatable = this.table.datatable;
    this.refs.rendactSearchBox.bindToTable(datatable);
    this.dt = datatable;
    this.loadData("All");
  },
  handleSubmit: function(event){
    event.preventDefault();
    var me = this;
    var name = getValue("name");
    var type = me.props.postType;
    var qry = "", noticeTxt = "";
    
    me.disableForm(true);
    if (this.props.mode==="create") {
      qry = Query.createCategory(name, type);
      noticeTxt = 'Category Published!';
    } else {
      qry = Query.updateCategory(this.props.postId, name, type);
      noticeTxt = 'Category Updated!';
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
    this.props.dispatch(setEditorMode("create"))
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
                        <h4><b>{this.props.mode==="create"?"Add New Category":"Edit Category"}</b></h4>
                      </div>
                      <div className="form-group">
                          <label htmlFor="name" >Category name</label>
                          <div >
                            <input type="text" name="name" id="name" className="form-control name" required="true"/>
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
                          
                            <input type="submit" name="submit" id="submit" value={this.props.mode==="create"?"Add New Category":"Edit Category"} className="btn btn-primary btn-sm" />
                            <input type="button" value="Reset" style={{marginLeft: 10}} onClick={this.resetForm} className="btn btn-primary btn-sm"/>
                            
                      </div>
                    </form>
                    </div>
                    <div className="col-xs-8">
                      <div style={{marginTop: 10, marginBottom: 20}}>
                          <DeleteButtons 
                            deleteMode={this.props.deleteMode}
                            itemSelected={this.props.itemSelected}
                            onDelete={this.handleDeleteBtn}
                            onRecover={this.handleRecover}
                            onDeletePermanent={this.handleDeletePermanent}
                            onEmptyTrash={this.handleEmptyTrash}
                          />                  
                        <div className="box-tools pull-right">
                          <SearchBox datatable={this.table} ref="rendactSearchBox"/>
                        </div>
                      </div>    
                      { this.props.isProcessing &&
                      <div style={defaultHalogenStyle}><Halogen.PulseLoader color="#4DAF7C"/></div>                   
                      }               
                      <Table 
                          id={"category-"+this.props.slug}
                          columns={[
                            {id: 'name', label: "Name", type: "link", textAlign:"center", cssClass:"nameText"},
                            {id: 'description', label: "Description", textAlign:"center", width: 400},
                            {id: 'count', label: "Count", textAlign:"center", type: "link", target: "", cssClass:"categoryText"}
                          ]}
                          checkBoxAtFirstColumn="true"
                          ref="rendactTable"
                          onSelectAll={this.checkDynamicButtonState}
                          onCheckBoxClick={this.checkDynamicButtonState}
                          onAfterLoad={this.onAfterTableLoad}
                          style={{opacity: this.props.opacity}}
                          handleTextTitleClick={this.handleTextTitleClick}
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

const mapStateToProps = function(state){
  if (!_.isEmpty(state.categoryContent)) {
    return _.head(state.categoryContent)
  } else return {}
}

CategoryContent = connect(mapStateToProps)(CategoryContent)
export default CategoryContent;