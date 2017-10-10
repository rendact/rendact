import React from 'react';
import Query from '../query';
import _ from 'lodash';
import Notification from 'react-notification-system';
import Halogen from 'halogen'
import {swalert, riques, hasRole, errorCallback, setValue, getValue, removeTags, disableForm, defaultHalogenStyle} from '../../utils';
import {TableTag, SearchBox, DeleteButtons} from './Table';
import {connect} from 'react-redux'
import {initContentList, maskArea, setEditorMode, toggleSelectedItemState, setNameValue} from '../../actions'

let TagContent = React.createClass({
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
    itemSelected: React.PropTypes.bool,
    name:React.PropTypes.string,
    slug:React.PropTypes.string,
    tagId:React.PropTypes.string,
  },
  getDefaultProps: function() {
    return {
      isProcessing: false,
      opacity: 1,
      name:"",
      slug:"",
      postId:"",
      tagId:"",
      monthList: [],
      deleteMode: false,
      statusList: ["All", "Published", "Draft", "Pending Review", "Deleted"],
      dynamicStateBtnList: ["deleteBtn", "recoverBtn", "deletePermanentBtn"],
      activeStatus: "All",
      itemSelected: false,
      mode: "create",
    }
  },
  dt: null,
  loadData: function(postId, callback) {
    var me = this;
    var qry = Query.getAllTagQry(this.props.postType);
    riques(qry, 
      function(error, response, body) { 
        if (body.data) { 
          var monthList = ["all"];
          var _dataArr = [];

          _.forEach(body.data.viewer.allTags.edges, function(item){
            _dataArr.push({
              "postId": item.node.id,
              "name": item.node.name,
              "count": item.node.post.edges.length
            });
          });

          var bEdit = hasRole('modify-tag');
          me.table.loadData(_dataArr, bEdit);
          me.props.dispatch(initContentList(monthList))

          if (callback) callback.call();
        } else {
          errorCallback(error, body.errors?body.errors[0].message:null);
        }
      }
    );
  },
  handleDeleteBtn: function(event){
    var me = this;
    var checkedRow = document.querySelectorAll("input.tag-"+this.props.slug+"Cb:checked");
    var idList = _.map(checkedRow, function(item){ return item.id.split("-")[1]});
    
    swalert('warning','Sure want to delete permanently?','You might lost some data forever!',
      function () {
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
    disableForm(state, this.notif);
    this.props.dispatch(maskArea(state));
  },
  resetForm: function(){
    document.getElementById("tagForm").reset();
    this.props.dispatch(setEditorMode("create"))
    this.handleNameChange();
    setValue("name", "");
    window.history.pushState("", "", '/admin/tag');
  },
  checkDynamicButtonState: function(){
    var checkedRow = document.querySelectorAll("input.tag-"+this.props.slug+"Cb:checked");
    this.props.dispatch(toggleSelectedItemState(checkedRow.length>0));
  },
  handleNameChange: function(event){
    var name = getValue("name");
    this.props.dispatch(setNameValue(name));
  },
  handleViewPage: function(tagId){
    this.props.handleNav(this.props.slug,'bytag', tagId);
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

    var titles = document.getElementsByClassName('nameText');
    _.forEach(titles, function(item){
      item.addEventListener('click',nameLink);
    });

    var postLink = function(event){
      event.preventDefault();
      var tagId = this.id.split("-")[1];
      me.handleViewPage(tagId);
    }

    var title = document.getElementsByClassName('tagText');
    _.forEach(title, function(item){
      item.addEventListener('click',postLink);
    });
  },
  handleSubmit: function(event){
    event.preventDefault();
    var me = this;
    var name = getValue("name");
    var postId = this.props.postId;
    var type = this.props.postType;
    this.disableForm(true);
    var qry = "", noticeTxt = "";

    if (this.props.mode==="create"){
      qry = Query.createTag(name, type);
      noticeTxt = 'Tag Published!';
    }else{
      qry = Query.UpdateTag(postId, name, type);
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
    this.dt = datatable;
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
                        <h4><b>{this.props.mode==="create"?"Add New Tag":"Edit Tag"}</b></h4>
                      </div>
                      <div className="form-group">
                          <label htmlFor="name" >Name</label>
                          <div >
                            <input type="text" name="name" id="name" className="form-control" required="true" onChange={this.handleNameChange}/>
                            <p className="help-block">The name appears on your site</p>
                          </div>
                      </div>
                       <div className="form-group">
                          <button type="submit" id="submit" className="btn btn-primary btn-flat" 
                          disabled={this.props.name===""}>{this.props.mode==="update"?"Save Changes":"Add New Tag"}</button>
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
                      <TableTag
                          id={"tag-"+this.props.slug}
                          columns={[
                            {id: 'name', label: "Name", type: "link", target: "", cssClass:"nameText"},
                            {id: 'count', label: "Count", textAlign:"center", type: "link", target: "", cssClass:"tagText"}
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

const mapStateToProps = function(state){
  if (!_.isEmpty(state.tagContent)) {
    return _.head(state.tagContent)
  } else return {}
}

TagContent = connect(mapStateToProps)(TagContent);
export default TagContent;