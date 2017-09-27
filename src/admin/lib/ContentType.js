import $ from 'jquery'
import React from 'react'
import Query from '../query'
import Fn from './functions'
import _ from 'lodash'
import Notification from 'react-notification-system'
import Halogen from 'halogen'
import {riques, hasRole, errorCallback, getConfig, defaultHalogenStyle, swalert, getValue, disableForm} from '../../utils'
import {Table, SearchBoxPost, DeleteButtons} from './Table'
import {connect} from 'react-redux'
import {setStatusCounter, initContentList, setloadData, maskArea, toggleDeleteMode, toggleSelectedItemState, setPostListStatus, setMonthList} from '../../actions'
import {graphql, withApollo} from 'react-apollo';
import gql from 'graphql-tag';


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
    fields: React.PropTypes.array,
    allPostId: React.PropTypes.array,
    replaceStatusWithRole: React.PropTypes.bool,
    _dataArr: React.PropTypes.array,
    bEdit: React.PropTypes.bool,
  },
  getDefaultProps: function() {
    return {
      isProcessing: false,
      opacity: 1,
      monthList: [],
      _allPostId: [],
      _dataArr: [],
      bEdit: false,
      statusCount: {},
      dynamicStateBtnList: ["deleteBtn", "recoverBtn", "deletePermanentBtn"],
      replaceStatusWithRole: false,
      activeStatus: "",
    }
  },
  dt: null,

  handleStatusFilter: function(event){
    event.preventDefault();
    this.disableForm(true);
    var status = event.target.text;
    this.props.dispatch(setPostListStatus(status))
    if (status==='Trash'){
      this.loadData("Trash");
      this.props.dispatch(toggleDeleteMode(status, true));
      this.disableForm(false);
    }else{
      this.loadData(status)
      this.props.dispatch(toggleDeleteMode(status, false));
      this.disableForm(false);
    } ;
  },
  filterByStatus: function(status, allPost) {
    let allPosts
    let statusAll = _.filter(allPost, item => item.status !== "Trash")
    if (status === "All") {
      allPosts = statusAll
    } else {
      allPosts = _.filter(allPost, item => item.status === status)
    }
    return allPosts
  },
  monthListShape: function() {
      debugger
    var monthList = ["all"];
    _.forEach(this.props.allPost, function(item){
      var dt = new Date(item.createdAt);
      var sMonth = dt.getFullYear() + "/" + (dt.getMonth() + 1);
      if (monthList.indexOf(sMonth)<0) monthList.push(sMonth);
    })
      debugger;
    return monthList
  },
  processDataShape: function(allPosts) {
    let me = this;
    var metaItemList = _.map(this.props.customFields, function(item) { return item.id });
    var fields = _.map(this.props.fields, function(item){
      return item.id
    });
      var monthList = ["all"];
      var _dataArr = [];
      var _allPostId = [];

      _.forEach(allPosts, function(item){
        var dt = new Date(item.createdAt);
        var _obj = {postId: item.id};
        _allPostId.push(item.id);
        _.forEach(fields, function(fld){
          if (_.has(item, fld)) { 
            if (fld==="createdAt") {
              _obj[fld] = dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate();
            }
            else if (fld==="comments")
              _obj[fld] = item.comments.edges.length;
            else if (fld==="author")
              _obj[fld] = item.author?item.author.username:"";
            else if (fld==="category"){
              var categories = [];
              _.forEach(item.category.edges, function(item){ 
                if (item.category)
                  categories.push(item.category.name)
              });
              if (categories.length===0)
                categories = "Uncategorized";
              _obj[fld] = categories;
            }
            else if (fld==="tag"){
              var tags = [];
              _.forEach(item.tag.edges, function(item){ 
                if (item.tag)
                  tags.push(item.tag.name)
              });
              if (tags.length===0)
                tags = "";
              _obj[fld] = tags;
            } else if (fld==="image"){
              _obj[fld] = item.image?item.image:getConfig('rootUrl')+"/images/avatar-default.png"
            } else if (fld==="roles") {
              var roles = "No Role";
              var rolesLen = item.roles.edges.length;
              if (rolesLen>0) {
                var isOwner = _.find(item.roles.edges,  {name: "Owner"} );
                if (isOwner) roles = "Owner";
                else {
                  roles = _.join(
                    _.map(item.roles.edges, function(item){
                      return item.name;
                    }), "<br/>");
                }
              }
              if (status==="No Role"){
                if (rolesLen>0) return;
              }
              _obj[fld] = roles;
            } else if (fld==="posts") {
              _obj[fld] = item.posts.edges.length
            }
            else
              _obj[fld] = item[fld];
          } else {
            if (fld==="like"){
              var likeNode = _.find(item.meta.edges, {"item": "like"});
              var likes = likeNode?likeNode.value:"0";
              _obj[fld] = likes;
            }

            if (_.indexOf(metaItemList, fld)>-1) {
              var _edge = _.find(item.meta.edges,{"node": {"item": fld}});
              var _val = _edge?_edge.value:"";
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
      me.props.dispatch(setMonthList(monthList))
      //me.disableForm(false);
  },

  loadData: function(postListStatus){
    this.props.dispatch(setStatusCounter(this.props._statusCount))
    let allPosts = this.filterByStatus(postListStatus, this.props.allPost)
    this.processDataShape(allPosts)
  },
  disableForm: function(isFormDisabled){
    disableForm(isFormDisabled, this.notification);
    this.props.dispatch(maskArea(isFormDisabled));
  },
  isWidgetActive: function(name){
    return _.indexOf(this.props.widgets, name) > -1;
  },
  handleDeleteBtn: function(event){
    var me = this;
    var checkedRow = document.querySelectorAll("input."+this.props.slug+"ListCb:checked");
    var idList = _.map(checkedRow, function(item){ return item.id.split("-")[1]});
    
    let listOfData = this.props.client.mutate({mutation: gql`${Query.deletePostQry(idList).query}`})
    listOfData.then(function() {
      me.props.refetchAllMenuData().then(function() {
        
      })
      me.loadData("All");
    })

    // swalert('warning','Sure want to delete?','Be sure before continue!',
    // function () {
    //   me.disableForm(true);
    //   riques(Query.deletePostQry(idList), 
    //     function(error, response, body) {
    //       if (!error && !body.errors && response.statusCode === 200) {
    //         var here = me;
    //         var cb = function(){here.disableForm(false)}
    //         me.loadData("All");
    //       } else {
    //         errorCallback(error, body.errors?body.errors[0].message:null);
    //         me.disableForm(false);
    //       }
    //     }
    //   );
    // });
  },
  handleDeletePermanent: function(event){
    var checkedRow = document.querySelectorAll("input."+this.props.slug+"ListCb:checked");
    var me = this;
    var idList = _.map(checkedRow, function(item){ return item.id.split("-")[1]});


    let listOfData = this.props.client.mutate({mutation: gql`${Query.deletePostPermanentQry(idList).query}`})
    listOfData.then(function() {
      me.props.refetchAllMenuData().then(function() {
        me.loadData("Trash");
      })
    })


    // swalert('warning','Sure want to delete permanently?','You might lost some data forever!',
    //   function () {
    //     me.disableForm(true);
    //     riques(Query.deletePostPermanentQry(idList), 
    //       function(error, response, body) {
    //         if (!error && !body.errors && response.statusCode === 200) {
    //           var here = me;
    //           var cb = function(){here.disableForm(false)}
    //           me.loadData("Trash", cb);
    //         } else {
    //           errorCallback(error, body.errors?body.errors[0].message:null);
    //           me.disableForm(false);
    //         }
    //       }
    //     );
    //   }
    // );
  },
  handleEmptyTrash: function(event){
    var me = this;

    let listOfData = this.props.client.mutate({mutation: gql`${Query.deletePostPermanentQry(me.props.allPostId).query}`})
    listOfData.then(function() {
      me.props.refetchAllMenuData().then(function() {
        me.loadData("All");
      })
    })


    // swalert('warning','Sure want to empty trash?','You might lost some data forever!',
    //   function () {
    //     me.disableForm(true);
    //     riques(Query.deletePostPermanentQry(me.props.allPostId), 
    //       function(error, response, body) {
    //         if (!error && !body.errors && response.statusCode === 200) {
    //           var here = me;
    //           var cb = function(){here.disableForm(false)}
    //           me.loadData("Trash", cb);
    //         } else {
    //           errorCallback(error, body.errors?body.errors[0].message:null);
    //           me.disableForm(false);
    //         }
    //       }
    //     );
    // })
  },
  handleRecover: function(event){
    var checkedRow = document.querySelectorAll("input."+this.props.slug+"ListCb:checked");
    var me = this;
    var idList = _.map(checkedRow, function(item){ return item.id.split("-")[1]});

    let listOfData = this.props.client.mutate({mutation: gql`${Query.recoverPostQry(idList).query}`})
    listOfData.then(function() {
      me.props.refetchAllMenuData().then(function() {
        me.loadData("Trash");
      })
    })
   
      // this.disableForm(true);
      // riques(Query.recoverPostQry(idList), 
      //   function(error, response, body) {
      //     if (!error && !body.errors && response.statusCode === 200) {
      //       console.log(JSON.stringify(body, null, 2));
      //       var here = me;
      //       var cb = function(){here.disableForm(false)}
      //       me.loadData("Trash", cb);
      //     } else {
      //       errorCallback(error, body.errors?body.errors[0].message:null);
      //       me.disableForm(false);
      //     }
      //   }
      // );
  },
  handleAddNewBtn: function(event) {
    this.props.handleNav(this.props.slug,'new');
    $(".menu-item").removeClass("active");
    $("#menu-posts-new").addClass("active");
  },
  handleDateFilter: function(event){
    this.disableForm(true);
    var status = this.props.activeStatus;
    if (status==='Trash'){
      var me = this;
      this.loadData("Trash", function(){
      this.props.dispatch(toggleDeleteMode(status, true));
      this.disableForm(false);
      });
    }else{
      var date = getValue("dateFilter");
      var searchValue = { 6: date };
      var te = this;
      this.loadData(status)
      te.props.dispatch(toggleDeleteMode(status, false));
      te.dt.columns([6]).every( function () {
        this.search( searchValue[this.index()] ).draw();
        return null;
      })
      te.disableForm(false);
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
  componentWillReceiveProps(props){
    this.props.dispatch(setStatusCounter(props._statusCount))
    let allPosts = this.filterByStatus(props.postListStatus, props.allPost)
    this.processDataShape(allPosts)
    //this.monthListShape(allPosts)

    // if(props._allPostId.length && !this.props._allPostId.length){
    //   this.loadData("All");
    //   this.table.loadData(props._dataArr, props.bEdit);
    //   this.props.dispatch(setStatusCounter(props._statusCount))
    //   this.props.dispatch(initContentList(props.monthList, props._allPostId))
    // }
  },
  componentDidMount: function(){
    this.notif = this.refs.notificationSystem;
    this.table = this.refs.rendactTable;
    var datatable = this.table.datatable;
    this.refs.rendactSearchBoxPost.bindToTable(datatable);
    this.dt=datatable;
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
                            {this.monthListShape().map(function(item){
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

let getAllPosts = gql`
query getAllPosts ($type: String!){
  viewer { 
    allPosts(where: {type: {eq: $type}}) {
      edges { 
        node { 
          id,
          title,
          content,
          slug,
          author{username},
          status,
          meta{edges{node{id,item,value}}},
          category{edges{node{id,category{id, name}}}},
          tag{edges{node{tag{id, name}}}},
          comments{edges{node{id,content,name,email,website}}},
          file{edges{node{id,value}}}, 
          featuredImage,
          createdAt
        }
      }
    }
  }
}
`

ContentType = graphql(getAllPosts,
  { 
    options: props => ({
      variables: {
        type: props.postType,
      },
    }),
    props: ({ownProps, data}) => {
      if (!data.loading) {
          let allPost = data.viewer.allPosts.edges;
          allPost = _.map(allPost, item => item.node)

          //Show status
          var _postArr = data.viewer.allPosts.edges;
          var _statusCount = {};
          _.forEach(ownProps.statusList, function(status){
            var found = _.filter(_postArr, {node: {status: status}});
            _statusCount[status] = found?found.length:0;
          });
          _statusCount["All"] = _postArr.length-_statusCount["Trash"];

          return{
            isLoading: false,
            allPost : allPost,
            refetchAllMenuData : data.refetch,
            _statusCount: _statusCount,
          }
      } else { 
        return {
          isLoading: true
        }
      }
    }
})(ContentType)
ContentType = withApollo(ContentType);

export default ContentType;