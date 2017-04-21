import React from 'react';
import $ from 'jquery';
import Query from '../query';
import Fn from './functions';
import _ from 'lodash';
import Notification from 'react-notification-system';
import Halogen from 'halogen';
import {riques, hasRole, errorCallback, getConfig, defaultHalogenStyle} from '../../utils';
import { default as swal } from 'sweetalert2';
import AdminConfig from '../AdminConfig';
import {Table, SearchBoxPost, DeleteButtons} from './Table';

const ContentType = React.createClass({
  getInitialState: function(){
      require ('../pages/Posts.css');
      
      return {
        dt: null,
        errorMsg: null,
        loadingMsg: null,
        monthList: [],
        deleteMode: false,
        statusList: this.props.statusList,
        statusCount: {},
        dynamicStateBtnList: ["deleteBtn", "recoverBtn", "deletePermanentBtn"],
        activeStatus: "All",
        itemSelected: false,
        isProcessing: false,
        opacity: 1,
        fields: this.props.fields,
        allPostId: []
      }
  },
  loadData: function(status, callback) {
    var me = this;

    riques(this.props.listQuery("Full", this.props.postType), 
      function(error, response, body) { 
        var nodeName = "all"+me.props.tableName+"s";
        var _postArr = body.data.viewer[nodeName].edges;
        var _statusCount = me.state.statusCount;

        _.forEach(me.state.statusList, function(status){
          var found = _.filter(_postArr, {node: {status: status}});
          _statusCount[status] = found?found.length:0;
        });
        _statusCount["All"] = _postArr.length-_statusCount["Trash"];
        me.setState({statusCount: _statusCount});
      }
    );

    var qry = this.props.listQuery(status, this.props.postType);
    var fields = _.map(this.state.fields, function(item){
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
                    roles = _.join(
                      _.map(item.node.roles.edges, function(item){
                        return item.node.name;
                      }), "<br/>");
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
              }
            });

            _dataArr.push(_obj);

            var sMonth = dt.getFullYear() + "/" + (dt.getMonth() + 1);
            if (monthList.indexOf(sMonth)<0) monthList.push(sMonth);
          });

          var bEdit = hasRole(me.props.modifyRole);
          me.table.loadData(_dataArr, bEdit);
          me.setState({monthList: monthList, allPostId: _allPostId});

          if (callback) callback.call();
        } else {
          errorCallback(error, body.errors?body.errors[0].message:null);
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
    this.setState({isProcessing: state, opacity: state?0.4:1});
    if (!state) {
      this.checkDynamicButtonState();
    }
  },
  handleDeleteBtn: function(event){
    var me = this;
    var checkedRow = $("input."+this.props.slug+"ListCb:checked");
    var idList =checkedRow.map(function(index, item){ return item.id.split("-")[1]});
    ;
    swal(_.merge({
      title: 'Sure want to delete?',
      text: "You might lost some data!",
      type: 'warning',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    },AdminConfig.defaultSwalStyling)).then(function () {
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
  })},
  handleDeletePermanent: function(event){
    var checkedRow = $("input."+this.props.slug+"ListCb:checked");
    var me = this;
    var idList =checkedRow.map(function(index, item){ return item.id.split("-")[1]});
    swal(_.merge({
      title: 'Sure want to delete permanently?',
      text: "You might lost some data forever!",
      type: 'warning',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    },AdminConfig.defaultSwalStyling)).then(function () {
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
    })
  },
  handleEmptyTrash: function(event){
    var me = this;
    swal(_.merge({
      title: 'Sure want to empty trash?',
      text: "You might lost some data forever!",
      type: 'warning',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!'
    }, AdminConfig.defaultSwalStyling)).then(function () {
      me.disableForm(true);
      riques(Query.deletePostPermanentQry(me.state.allPostId), 
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
    var checkedRow = $("input."+this.props.slug+"ListCb:checked");
    var me = this;
    var idList =checkedRow.map(function(index, item){ return item.id.split("-")[1]});
    swal(_.merge({
      title: 'Sure want to recover?',
      text: "Please look carefully!",
      type: 'warning',
      confirmButtonText: 'Yes, recover it!',
      cancelButtonText: 'No, cancel!',
    },AdminConfig.defaultSwalStyling)).then(function () {
      me.disableForm(true);
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
  })},
  handleAddNewBtn: function(event) {
    this.props.handleNav(this.props.slug,'new');
  },
  handleStatusFilter: function(event){
    this.disableForm(true);
    var status = event.target.text;
    this.setState({activeStatus: status});
    if (status==='Trash'){
      var me = this;
      this.loadData("Trash", function(){
        me.setState({deleteMode: true});
        me.disableForm(false);
      });
    }else{
      var re = this;
      this.loadData(status, function(){
        re.setState({deleteMode: false});
        re.disableForm(false);
      })
    } ;
  },
  handleDateFilter: function(event){
    this.disableForm(true);
    var status = this.state.activeStatus;
    if (status==='Trash'){
      var me = this;
      this.loadData("Trash", function(){
        me.setState({deleteMode: true});
        me.disableForm(false);
      });
    }else{
      var date = $("#dateFilter").val();
      var searchValue = { 6: date };
      var te = this;
      this.loadData(status, function(){
        te.setState({deleteMode: false});
        te.state.dt.columns([6]).every( function () {
          this.search( searchValue[this.index()] ).draw();
          return null;
        })
        te.disableForm(false);
      })
    } ;
  },
  checkDynamicButtonState: function(){
    var checkedRow = $("input."+this.props.slug+"ListCb:checked");
    this.setState({itemSelected: checkedRow.length>0})
  },
  handleViewPost: function(postId){
    this.props.handleNav(this.props.slug,'edit', postId);
  },
  onAfterTableLoad: function(){
    var me = this;
    $(".titleText").click(function(event){
      event.preventDefault();
      var postId = this.id.split("-")[1];
      me.handleViewPost(postId);
    });
  },
  getStatusCount: function(status){
    if (this.state.statusCount[status]) return this.state.statusCount[status]
    else return 0;
  },
  componentDidMount: function(){
    this.notif = this.refs.notificationSystem;
    this.table = this.refs.rendactTable;
    var datatable = this.table.datatable;
    this.refs.rendactSearchBoxPost.bindToTable(datatable);
    this.setState({dt: datatable});
    this.loadData("All");
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
                          <select className="btn select" id="dateFilter" onChange={this.handleDateFilter} style={{marginRight:10,height:35}}>
                            {this.state.monthList.map(function(item){
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
                            deleteMode={this.state.deleteMode}
                            itemSelected={this.state.itemSelected}
                            onDelete={this.handleDeleteBtn}
                            onRecover={this.handleRecover}
                            onDeletePermanent={this.handleDeletePermanent}
                            onEmptyTrash={this.handleEmptyTrash}
                          />                  
                        <div className="box-tools pull-right">
                          <SearchBoxPost datatable={this.table} ref="rendactSearchBoxPost"/>
                        </div>
                        <div className="box-tools" style={{marginTop: 10}}>
                          <b>Status:</b> {this.state.statusList.map(function(item, index, array){
                            var first = (index===0);
                            var border = first?"":"1px solid";
                            var count = this.getStatusCount(item);
                            if (count===0) return null;

                            var color = item===this.state.activeStatus?{color: "black", fontWeight: "bold"}:{};
                            return <span key={index} style={{paddingRight: 7, paddingLeft: 7, borderLeft: border}}>
                                    <a href="#" onClick={this.handleStatusFilter} style={color}>{item}</a> ({count})
                                   </span>
                          }.bind(this))}
                        </div>
                      </div>
                      { this.state.isProcessing &&
                      <div style={defaultHalogenStyle}><Halogen.PulseLoader color="#4DAF7C"/></div>                   
                      }
                      <Table 
                          id={this.props.slug+"List"}
                          columns={this.state.fields}
                          checkBoxAtFirstColumn="true"
                          ref="rendactTable"
                          onSelectAll={this.checkDynamicButtonState}
                          onCheckBoxClick={this.checkDynamicButtonState}
                          onAfterLoad={this.onAfterTableLoad}
                          style={{opacity: this.state.opacity}}
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

export default ContentType;