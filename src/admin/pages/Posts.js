import React from 'react';
import $ from 'jquery';
import Query from '../query';
import Fn from '../lib/functions';
import _ from 'lodash';
import Notification from 'react-notification-system';
import {riques, hasRole, errorCallback} from '../../utils';
import { default as swal } from 'sweetalert2';
import Config from '../../config';
import {Table, SearchBoxPost, DeleteButtons} from '../lib/Table';

const Posts = React.createClass({
	getInitialState: function(){
	    require ('./Posts.css');

	    return {
	      dt: null,
	      errorMsg: null,
	      loadingMsg: null,
	      monthList: [],
        deleteMode: false,
        statusList: ["All", "Published", "Draft", "Pending Review", "Deleted"],
        dynamicStateBtnList: ["deleteBtn", "recoverBtn", "deletePermanentBtn"],
        activeStatus: "All",
        itemSelected: false
	    }
	},
  loadData: function(type, callback) {
    var me = this;
    var qry = Query.getPostListQry(type);
    riques(qry, 
      function(error, response, body) { 
        if (body.data) { 
          var monthList = ["all"];
          var _dataArr = [];

          _.forEach(body.data.viewer.allPosts.edges, function(item){
            var dt = new Date(item.node.createdAt);
            var categories = [];
            _.forEach(item.node.category.edges, function(item){ 
              if (item.node.category)
                categories.push(item.node.category.name)
            });
            if (categories.length===0)
              categories = "Uncategorized";
              /*_.forEach(item.node.category.edges, function(item){ 
                categories.push(item.node.category,{"name": "Uncategorized"})*/

            var img = "/images/photo1.png"; 
            //var img = "";     
            var tag = "";
            var like = _.find(item.node.meta.edges,{"node": {"item": "like"}})?_.find(item.node.meta.edges,{"node": {"item": "like"}}).node.value:"0";

            _dataArr.push({
              "postId": item.node.id,
              "image": img,
              "title": item.node.title,
              "slug": item.node.slug?item.node.slug:"",
              "author": item.node.author?item.node.author.username:"",
              "category": categories,
              "tags": tag,
              "likes": like,
              "status": item.node.status?item.node.status:"",
              "comments": item.node.comments.edges.length,
              "published": dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate()
            });

            var sMonth = dt.getFullYear() + "/" + (dt.getMonth() + 1);
            if (monthList.indexOf(sMonth)<0) monthList.push(sMonth);
          });

          var bEdit = hasRole('modify-post');
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
    var checkedRow = $("input.postListCb:checked");
    var idList =checkedRow.map(function(index, item){ return item.id.split("-")[1]});
    ;
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
            me.loadData("All", cb);
          } else {
            errorCallback(error, body.errors?body.errors[0].message:null);
            me.disableForm(false);
          }
        }
      );
  })},
  handleDeletePermanent: function(event){
    var checkedRow = $("input.postListCb:checked");
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
    var checkedRow = $("input.postListCb");
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
    var checkedRow = $("input.postListCb:checked");
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
  /*disableForm: function(state){
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
  },*/
  disableForm: function(state){
    var me = this;
    _.forEach(document.getElementsByTagName('input'), function(el){ el.disabled = state;})
    _.forEach(document.getElementsByTagName('button'), function(el){ 
      if (_.indexOf(me.state.dynamicStateBtnList, el.id) < 0)
        el.disabled = state;
    })
    _.forEach(document.getElementsByTagName('select'), function(el){ el.disabled = state;})
    this.notif.addNotification({message: 'Processing...', level: 'warning',position: 'tr'});
    if (!state) {
      this.checkDynamicButtonState();
    }
  },
  checkDynamicButtonState: function(){
    var checkedRow = $("input.postListCb:checked");
    this.setState({itemSelected: checkedRow.length>0})
  },
  handleViewPost: function(postId){
    this.props.handleNav('posts','edit', postId);
  },
  onAfterTableLoad: function(){
    var me = this;
    $(".titleText").click(function(event){
      event.preventDefault();
      var postId = this.id.split("-")[1];
      me.handleViewPost(postId);
    });
  },
  componentWillMount: function(){
    var me = this;
    riques(Query.getAllCategoryQry, 
      function(error, response, body) {
        if (!error) {
          var categoryList = [];
          $.each(body.data.viewer.allCategories.edges, function(key, item){
            categoryList.push((<option key={item.node.id}><input id={item.node.id}
            value={item.node.id} /> {item.node.name}</option>));
          })
          me.setState({categoryList: categoryList});
        }
      }
    );
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
              Post List
            </h1>
            <ol className="breadcrumb">
              <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
              <li className="active">Post List</li>
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
                          <select className="btn select" id="categoryFilter" style={{marginRight:5,height:35}}>
                            {this.state.categoryList}
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
                            var last = (index===(array.length-1));
                            var border = last?"":"1px solid";
                            var color = item===this.state.activeStatus?{color: "black", fontWeight: "bold"}:{};
                            return <span key={index} style={{paddingRight: 7, paddingLeft: 7, borderRight: border}}>
                                    <a href="#" onClick={this.handleStatusFilter} style={color}>{item}</a>
                                   </span>
                          }.bind(this))}
                        </div>
                      </div>                   
                      <Table 
                          id="postList"
                          columns={[
                            {id: 'image', label: "Image", type: "image", width: 10},
                            {id: 'title', label: "Title", width: 400, type: "link", target: "", cssClass:"titleText"},
                            {id: 'slug', label: "Slug", textAlign:"center"},
                            {id: 'author', label: "Author", textAlign:"center"},
                            {id: 'category', label: "Category", textAlign:"center"},
                            {id: 'tags', label: "Tags", textAlign:"center"},
                            {id: 'likes', label: "Likes", textAlign:"center"},
                            {id: 'comments', label: "Comments", width: 30, textAlign:"center"},
                            {id: 'published', label: "Publish Date", textAlign:"center"}
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

export default Posts;