import React from 'react';
import $ from 'jquery';
import Query from '../query';
import Fn from '../lib/functions';
import _ from 'lodash';
import Notification from 'react-notification-system';
import Halogen from 'halogen';
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
        isProcessing: false,
        opacity: 1,
        loading:[],
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
                 
            //var tag = "";
            var tags = [];
            _.forEach(item.node.tag.edges, function(item){ 
              if (item.node.tag)
                tags.push(item.node.tag.name)
            });
            if (tags.length===0)
              tags = "Untag";
            var like = _.find(item.node.meta.edges,{"node": {"item": "like"}})?_.find(item.node.meta.edges,{"node": {"item": "like"}}).node.value:"0";

            _dataArr.push({
              "postId": item.node.id,
              "title": item.node.title,
              "slug": item.node.slug?item.node.slug:"",
              "author": item.node.author?item.node.author.username:"",
              "category": categories,
              "tag": tags,
              "likes": like,
              "status": item.node.status?item.node.status:"",
              "comments": item.node.comments.edges.length,
              "published": dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate()
            });

            var sMonth = dt.getFullYear() + "/" + (dt.getMonth() + 1);
            if (monthList.indexOf(sMonth)<0) monthList.push(sMonth);
          });

          var bEdit = hasRole('modify-page');
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
      me.disableForm(true, true);
      riques(Query.deletePostQry(idList), 
        function(error, response, body) {
          if (!error && !body.errors && response.statusCode === 200) {
            var here = me;
            var cb = function(){here.disableForm(false, false)}
            me.loadData("All", cb);
          } else {
            errorCallback(error, body.errors?body.errors[0].message:null);
            me.disableForm(false, false);
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
      me.disableForm(true, true);
      riques(Query.deletePostPermanentQry(idList), 
        function(error, response, body) {
          if (!error && !body.errors && response.statusCode === 200) {
            var here = me;
            var cb = function(){here.disableForm(false, false)}
            me.loadData("Deleted", cb);
          } else {
            errorCallback(error, body.errors?body.errors[0].message:null);
            me.disableForm(false, false);
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
      me.disableForm(true, true);
      riques(Query.deletePostPermanentQry(idList), 
        function(error, response, body) {
          if (!error && !body.errors && response.statusCode === 200) {
            var here = me;
            var cb = function(){here.disableForm(false, false)}
            me.loadData("Deleted", cb);
          } else {
            errorCallback(error, body.errors?body.errors[0].message:null);
            me.disableForm(false, false);
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
      me.disableForm(true, true);
      riques(Query.recoverPostQry(idList), 
        function(error, response, body) {
          if (!error && !body.errors && response.statusCode === 200) {
            console.log(JSON.stringify(body, null, 2));
            var here = me;
            var cb = function(){here.disableForm(false, false)}
            me.loadData("Deleted", cb);
          } else {
            errorCallback(error, body.errors?body.errors[0].message:null);
            me.disableForm(false, false);
          }
        }
      );
  })},
  handleAddNewBtn: function(event) {
    this.props.handleNav('posts','new');
  },
  handleStatusFilter: function(event){
    this.disableForm(true, true);
    var status = event.target.text;
    this.setState({activeStatus: status});
    if (status==='Deleted'){
      var me = this;
      this.loadData("Deleted", function(){
        me.setState({deleteMode: true});
        me.disableForm(false, false);
        me.setState({opacity: 1});
      });
    }else{
      var re = this;
      this.loadData(status, function(){
        re.setState({deleteMode: false});
        re.disableForm(false, false);
        re.setState({opacity: 1});
      })
    } ;
  },
  handleDateFilter: function(event){
    this.disableForm(true, true);
    var status = this.state.activeStatus;
    if (status==='Deleted'){
      var me = this;
      this.loadData(this.state.dt, "Deleted", function(){
        me.setState({deleteMode: true});
        me.disableForm(false, false);
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
        te.disableForm(false, false);
      })
    } ;
  },
  disableForm: function(state, processingState){
    var spinner = this.state.loading;
    var color = '#4DAF7C';
    var style = {
            display: '-webkit-flex',
            display: 'flex',
            WebkitFlex: '0 1 auto',
            flex: '0 1 auto',
            WebkitFlexDirection: 'column',
            flexDirection: 'column',
            WebkitFlexGrow: 1,
            flexGrow: 1,
            WebkitFlexShrink: 0,
            flexShrink: 0,
            WebkitFlexBasis: '25%',
            flexBasis: '25%',
            maxWidth: '25%',
            height: '200px',
            top: '50%',
            left: '50%',
            position: 'absolute',
            WebkitAlignItems: 'center',
            alignItems: 'center',
            WebkitJustifyContent: 'center',
            justifyContent: 'center'
      };
    spinner.push(
      <div style={style}><Halogen.PulseLoader color={color}/></div>
      );
    var me = this;
    _.forEach(document.getElementsByTagName('input'), function(el){ el.disabled = state;})
    _.forEach(document.getElementsByTagName('button'), function(el){ 
      if (_.indexOf(me.state.dynamicStateBtnList, el.id) < 0)
        el.disabled = state;
    })
    _.forEach(document.getElementsByTagName('select'), function(el){ el.disabled = state;})
    this.setState({isProcessing: processingState});
    this.setState({opacity: 0.8});
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
			<div className="content-wrapper" style={{opacity:this.state.opacity}}>
        <div className="container-fluid">
          <section className="content-header" style={{marginBottom:20}}>
            <h1>
              Post List
              { hasRole('modify-page') &&
              (<small style={{marginLeft: 5}}>
                <button className="btn btn-default btn-primary add-new-post-btn" onClick={this.handleAddNewBtn}>Add new</button>
              </small>)
              }
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
                      { this.state.isProcessing &&
                          this.state.loading
                      }                   
                      <Table 
                          id="postList"
                          columns={[
                            {id: 'title', label: "Title", width: 400, type: "link", target: "", cssClass:"titleText"},
                            {id: 'slug', label: "Slug", textAlign:"center"},
                            {id: 'author', label: "Author", textAlign:"center"},
                            {id: 'category', label: "Category", textAlign:"center"},
                            {id: 'tag', label: "Tags", textAlign:"center"},
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