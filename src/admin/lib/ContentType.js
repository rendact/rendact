import React from 'react'
import Query from '../query'
import Fn from './functions'
import _ from 'lodash'
import Notification from 'react-notification-system'
import Halogen from 'halogen'
import {riques, hasRole, errorCallback, getConfig, defaultHalogenStyle, swalert, getValue} from '../../utils'
import {Table, SearchBoxPost, DeleteButtons} from './Table'
import {connect} from 'react-redux'
import {setStatusCounter, initContentList, maskArea, toggleDeleteMode, toggleSelectedItemState} from '../../actions'

let ContentType = React.createClass({
  propTypes: {
    isProcessing: React.PropTypes.bool.isRequired,
    opacity: React.PropTypes.number.isRequired,
    errorMsg: React.PropTypes.string,
    loadingMsg: React.PropTypes.string,
    monthList: React.PropTypes.arrayOf(React.PropTypes.string),
    deleteMode: React.PropTypes.bool,
    statusList: React.PropTypes.arrayOf(React.PropTypes.string),
    statusCount: React.PropTypes.object,
    dynamicStateBtnList: React.PropTypes.arrayOf(React.PropTypes.string),
    activeStatus: React.PropTypes.string,
    itemSelected: React.PropTypes.bool,
    //isProcessing: React.PropTypes.bool,
    fields: React.PropTypes.array,
    allPostId: React.PropTypes.array,
    replaceStatusWithRole: React.PropTypes.bool
    
  },
  getDefaultProps: function() {
    return {
      isProcessing: false,
      opacity: 1,
      monthList: [],
      statusCount: {},
      dynamicStateBtnList: ["deleteBtn", "recoverBtn", "deletePermanentBtn"],
      replaceStatusWithRole: false
    }
  },
  dt: null,
  loadData: function(status, callback) {
    var me = this;
    var metaItemList = _.map(this.props.customFields, function(item) { return item.id });
    riques(this.props.listQuery("Full", this.props.postType, this.props.tagId, this.props.cateId), 
      function(error, response, body) { 
        var nodeName = "all"+me.props.tableName+"s";
        var _postArr = body.data.viewer[nodeName].edges;
        var _statusCount = me.props.statusCount;

        if (me.props.replaceStatusWithRole){
          var _postArr0 = _postArr;
          _.forEach(_postArr0, function(item, index){
            var role = "";
            
            if (item.node.roles.edges.length>0)
              role = item.node.roles.edges[0].node.name
            _postArr[index].node.status = role;
          })
        }
        _.forEach(me.props.statusList, function(status){
          var found = _.filter(_postArr, {node: {status: status}});
          _statusCount[status] = found?found.length:0;
        });
        
        if (me.props.replaceStatusWithRole){
          _statusCount["All"] = _postArr.length;
        } else {
          _statusCount["All"] = _postArr.length-_statusCount["Trash"];
        }
        me.props.dispatch(setStatusCounter(_statusCount))
      }
    );

    var qry = this.props.listQuery(status, this.props.postType, this.props.tagId, this.props.cateId);
    var fields = _.map(this.props.fields, function(item){
      return item.id
    });
    
    riques(qry, 
      function(error, response, body) { 
        
        if (body.data) { 
          var monthList = ["all"];
          var _dataArr = [];
          var _allPostId = [];
          var nodeName = "all"+me.props.tableName+"s";
          var _postArr = body.data.viewer[nodeName].edges;

          _.forEach(_postArr, function(item){
            var dt = new Date(item.node.createdAt);
            var _obj = {postId: item.node.id};
            _allPostId.push(item.node.id);
            _.forEach(fields, function(fld){
              if (_.has(item.node, fld)) { 
                if (fld==="createdAt") {
                  _obj[fld] = dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate();
                }
                else if (fld==="comments")
                  _obj[fld] = item.node.comments.edges.length;
                else if (fld==="author")
                  _obj[fld] = item.node.author?item.node.author.username:"";
                else if (fld==="category"){
                  var categories = [];
                  _.forEach(item.node.category.edges, function(item){ 
                    if (item.node.category)
                      categories.push(item.node.category.name)
                  });
                  if (categories.length===0)
                    categories = "Uncategorized";
                  _obj[fld] = categories;
                }
                else if (fld==="tag"){
                  var tags = [];
                  _.forEach(item.node.tag.edges, function(item){ 
                    if (item.node.tag)
                      tags.push(item.node.tag.name)
                  });
                  if (tags.length===0)
                    tags = "";
                  _obj[fld] = tags;
                } else if (fld==="image"){
                  _obj[fld] = item.node.image?item.node.image:getConfig('rootUrl')+"/images/avatar-default.png"
                } else if (fld==="roles") {
                  var roles = "No Role";
                  var rolesLen = item.node.roles.edges.length;
                  if (rolesLen>0) {
                    var isOwner = _.find(item.node.roles.edges, {node: {name: "Owner"}} );
                    if (isOwner) roles = "Owner";
                    else {
                      roles = _.join(
                        _.map(item.node.roles.edges, function(item){
                          return item.node.name;
                        }), "<br/>");
                    }
                  }
                  if (status==="No Role"){
                    if (rolesLen>0) return;
                  }
                  _obj[fld] = roles;
                } else if (fld==="posts") {
                  _obj[fld] = item.node.posts.edges.length
                }
                else
                  _obj[fld] = item.node[fld];
              } else {
                if (fld==="like"){
                  var likeNode = _.find(item.node.meta.edges,{"node": {"item": "like"}});
                  var likes = likeNode?likeNode.node.value:"0";
                  _obj[fld] = likes;
                }

                if (_.indexOf(metaItemList, fld)>-1) {
                  var _edge = _.find(item.node.meta.edges,{"node": {"item": fld}});
                  var _val = _edge?_edge.node.value:"";
                  _obj[fld] = _val; 
                }
              }
            });

            _dataArr.push(_obj);

            var sMonth = dt.getFullYear() + "/" + (dt.getMonth() + 1);
            if (monthList.indexOf(sMonth)<0) monthList.push(sMonth);
          });

          var bEdit = hasRole(me.props.modifyRole);
          me.table.loadData(_dataArr, bEdit);
          me.props.dispatch(initContentList(monthList, _allPostId))

          if (callback) callback.call();
        } else {
          errorCallback(error, body.errors?body.errors[0].message:null);
        }
      }
    );
  },
  disableForm: function(isDisabled){
    var me = this;
    _.forEach(document.getElementsByTagName('input'), function(el){ el.disabled = isDisabled;})
    _.forEach(document.getElementsByTagName('button'), function(el){ 
      if (_.indexOf(me.props.dynamicStateBtnList, el.id) < 0)
        el.disabled = isDisabled;
    })
    _.forEach(document.getElementsByTagName('select'), function(el){ el.disabled = isDisabled;})
    this.props.dispatch(maskArea(isDisabled))
    if (!isDisabled) { this.checkDynamicButtonState();}
  },
  isWidgetActive: function(name){
    return _.indexOf(this.props.widgets, name) > -1;
  },
  handleDeleteBtn: function(event){
    var me = this;
    var checkedRow = document.querySelectorAll("input."+this.props.slug+"ListCb:checked");
    var idList = _.map(checkedRow, function(item){ return item.id.split("-")[1]});
   
      me.disableForm(true);
      riques(Query.deletePostQry(idList), 
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
  },
  handleDeletePermanent: function(event){
    var checkedRow = document.querySelectorAll("input."+this.props.slug+"ListCb:checked");
    var me = this;
    var idList = _.map(checkedRow, function(item){ return item.id.split("-")[1]});
    swalert('warning','Sure want to delete permanently?','You might lost some data forever!',
      function () {
        me.disableForm(true);
        riques(Query.deletePostPermanentQry(idList), 
          function(error, response, body) {
            if (!error && !body.errors && response.statusCode === 200) {
              var here = me;
              var cb = function(){here.disableForm(false)}
              me.loadData("Trash", cb);
            } else {
              errorCallback(error, body.errors?body.errors[0].message:null);
              me.disableForm(false);
            }
          }
        );
      }
    );
  },
  handleEmptyTrash: function(event){
    var me = this;
    swalert('warning','Sure want to empty trash?','You might lost some data forever!',
      function () {
        me.disableForm(true);
        riques(Query.deletePostPermanentQry(me.props.allPostId), 
          function(error, response, body) {
            if (!error && !body.errors && response.statusCode === 200) {
              var here = me;
              var cb = function(){here.disableForm(false)}
              me.loadData("Trash", cb);
            } else {
              errorCallback(error, body.errors?body.errors[0].message:null);
              me.disableForm(false);
            }
          }
        );
    })
  },
  handleRecover: function(event){
    var checkedRow = document.querySelectorAll("input."+this.props.slug+"ListCb:checked");
    var me = this;
    var idList = _.map(checkedRow, function(item){ return item.id.split("-")[1]});
   
      this.disableForm(true);
      riques(Query.recoverPostQry(idList), 
        function(error, response, body) {
          if (!error && !body.errors && response.statusCode === 200) {
            console.log(JSON.stringify(body, null, 2));
            var here = me;
            var cb = function(){here.disableForm(false)}
            me.loadData("Trash", cb);
          } else {
            errorCallback(error, body.errors?body.errors[0].message:null);
            me.disableForm(false);
          }
        }
      );
  },
  handleAddNewBtn: function(event) {
    this.props.handleNav(this.props.slug,'new');
  },
  handleStatusFilter: function(event){
    event.preventDefault();
    this.disableForm(true);
    var status = event.target.text;
    if (status==='Trash'){
      var me = this;
      this.loadData("Trash", function(){
        me.props.dispatch(toggleDeleteMode(status, true));
        me.disableForm(false);
      });
    }else{
      var re = this;
      this.loadData(status, function(){
        re.props.dispatch(toggleDeleteMode(status, false));
        re.disableForm(false);
      })
    } ;
  },
  handleDateFilter: function(event){
    this.disableForm(true);
    var status = this.props.activeStatus;
    if (status==='Trash'){
      var me = this;
      this.loadData("Trash", function(){
        me.props.dispatch(toggleDeleteMode(status, true));
        me.disableForm(false);
      });
    }else{
      var date = getValue("dateFilter");
      var searchValue = { 6: date };
      var te = this;
      this.loadData(status, function(){
        te.props.dispatch(toggleDeleteMode(status, false));
        te.dt.columns([6]).every( function () {
          this.search( searchValue[this.index()] ).draw();
          return null;
        })
        te.disableForm(false);
      })
    } ;
  },
  handleSetOwnerButton: function(e){
    var checkedRow = document.querySelectorAll("input."+this.props.slug+"ListCb:checked");
    if (checkedRow.length > 1) {
      swalert('error','Only one user','Only one user allowed to be an owner');
      return;
    }

    this.disableForm(true);
    var selectedId = checkedRow[0].id.split("-")[1];
    var qry = Query.setAsOwner(selectedId, this.props.allPostId, "admin");
    var me = this;
    
    riques(qry, 
      function(error, response, body){
        if(!error && !body.errors) {
          var here = me;
          me.notif.addNotification({
              message: 'Role updated',
              level: 'success',
              position: 'tr',
              autoDismiss: 2
            })
          here.disableForm(false);
          here.loadData("All");
        } else {
          errorCallback(error, body.errors?body.errors[0].message:null);
          me.disableForm(false);
        }
        me.notif.removeNotification('saving');
      }, true
    );
  },
  checkDynamicButtonState: function(){
    var checkedRow = document.querySelectorAll("input."+this.props.slug+"ListCb:checked");
    this.props.dispatch(toggleSelectedItemState(checkedRow.length>0));
  },
  handleViewPost: function(postId){
    this.props.handleNav(this.props.slug,'edit', postId);
  },
  isOwner: function(){
    var p = JSON.parse(localStorage.getItem("profile"));
    var roles = p["roles"];
    return _.indexOf("Owner", roles) > -1;
  },
  onAfterTableLoad: function(){
    var me = this;

    var postLink = function(event){
      event.preventDefault();
      var postId = this.id.split("-")[1];
      me.handleViewPost(postId);
    }

    var titles = document.getElementsByClassName('titleText');
    _.forEach(titles, function(item){
      item.addEventListener('click',postLink);
    });
  },
  getStatusCount: function(status){
    if (this.props.statusCount && this.props.statusCount[status])
      return this.props.statusCount[status]
    else return 0;
  },
  componentDidMount: function(){
    this.notif = this.refs.notificationSystem;
    this.table = this.refs.rendactTable;
    var datatable = this.table.datatable;
    this.refs.rendactSearchBoxPost.bindToTable(datatable);
    this.dt=datatable;
    this.loadData("All");
    this.props.dispatch(maskArea(true))
  },
  render: function(){
    return (
      <div className="content-wrapper">
        <div className="container-fluid">
          <section className="content-header" style={{marginBottom:20}}>
            <h1>
              {this.props.name} List
              { hasRole(this.props.modifyRole) &&
              (<small style={{marginLeft: 5}}>
                <button className="btn btn-default btn-primary add-new-post-btn" onClick={this.handleAddNewBtn}>Add new</button>
              </small>)
              }
            </h1>
            <ol className="breadcrumb">
              <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
              <li className="active">{this.props.name}</li>
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
                          <select className="btn select" id="dateFilter" name="dateFilter" onChange={this.handleDateFilter} style={{marginRight:10,height:35}}>
                            {this.props.monthList.map(function(item){
                              if (item==="all")
                                return (<option key="0" value="">Show all months</option>);
                              var s = item.split("/");
                              var monthList = Fn.getMonthList();
                              var month = monthList[parseInt(s[1],10)-1];
                              var year = s[0];
                              return <option key={item} value={item}>{month+" "+year}</option>
                            })}
                          </select>     
                          <DeleteButtons 
                            deleteMode={this.props.deleteMode}
                            itemSelected={this.props.itemSelected}
                            onDelete={this.handleDeleteBtn}
                            onRecover={this.handleRecover}
                            onDeletePermanent={this.handleDeletePermanent}
                            onEmptyTrash={this.handleEmptyTrash}
                          />  
                          {
                            (this.isWidgetActive("ownerButton") /* && this.isOwner() */ ) && 
                            <button className="btn btn-default" onClick={this.handleSetOwnerButton} disabled={!this.props.itemSelected}>Set as owner</button>
                          }                
                        <div className="box-tools pull-right">
                          <SearchBoxPost datatable={this.table} ref="rendactSearchBoxPost"/>
                        </div>
                        <div className="box-tools" style={{marginTop: 10}}>
                          <b>Status:</b> {this.props.statusList.map(function(item, index, array){
                            var first = (index===0);
                            var border = first?"":"1px solid";
                            var count = this.getStatusCount(item);
                            if (count===0) return null;

                            var color = item===this.props.activeStatus?{color: "black", fontWeight: "bold"}:{};
                            return <span key={index} style={{paddingRight: 7, paddingLeft: 7, borderLeft: border}}>
                                    <a href="#" onClick={this.handleStatusFilter} style={color}>{item}</a> ({count})
                                   </span>
                          }.bind(this))}
                        </div>
                      </div>
                      { this.props.isProcessing &&
                      <div style={defaultHalogenStyle}><Halogen.PulseLoader color="#4DAF7C"/></div>                   
                      }
                      <Table 
                          id={this.props.slug+"List"}
                          columns={this.props.fields}
                          checkBoxAtFirstColumn="true"
                          ref="rendactTable"
                          onSelectAll={this.checkDynamicButtonState}
                          onCheckBoxClick={this.checkDynamicButtonState}
                          onAfterLoad={this.onAfterTableLoad}
                          style={{opacity: this.props.opacity}}
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
  if (!_.isEmpty(state.contentType)) {
    return _.head(state.contentType)
  } else return {}
}

ContentType = connect(mapStateToProps)(ContentType)
export default ContentType;