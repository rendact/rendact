import React from 'react';
import $ from 'jquery';
window.jQuery = $;
import _ from 'lodash';
import Query from '../query';
import Halogen from 'halogen';
import Notification from 'react-notification-system';
import {riques, hasRole, errorCallback, getConfig} from '../../utils';
import { default as swal } from 'sweetalert2';
import Config from '../../config';
import {TableUser, SearchBoxPost, DeleteButtons} from '../lib/Table';

const Users = React.createClass({
  getInitialState: function(){
    require ('./Pages.css');

    return {
      dt: null,
      monthList: [],
      deleteMode: false,
      isProcessing: false,
      opacity: 1,
      loading:[],
      statusList: _.concat(["All"],Config.roleList),
      dynamicStateBtnList: ["deleteBtn", "recoverBtn", "deletePermanentBtn"],
      activeStatus: "All",
      itemSelected: false
    }
  },
  loadData: function(type, callback) {
    var me = this;
    var qry = Query.getUserListByTypeQry(type);

    riques(qry, 
      function(error, response, body) {
          if (body.data) {
            var _dataArr = [];
            _.forEach(body.data.viewer.allUsers.edges, function(item){
              var roles = "No Role";
              var img = item.node.image?item.node.image:getConfig('rootUrl')+"/images/avatar-default.png";
              var rolesLen = item.node.roles.edges.length;
              if (rolesLen>0) {
                roles = _.join(
                  _.map(item.node.roles.edges, function(item){
                    return item.node.name;
                  }), "<br/>");
              }
              if (type==="No Role"){
                if (rolesLen>0) return;
              }

              _dataArr.push({
                image: item.node.image?item.node.image:getConfig('rootUrl')+"/images/avatar-default.png",
                userId: item.node.id,
                username: item.node.username,
                email: item.node.email,
                fullName: item.node.fullName,
                gender: item.node.gender,
                role: roles,
                posts: item.node.posts.edges.length
              })
            });

            var bEdit = hasRole('modify-user');
            me.table.loadData(_dataArr, bEdit);
            if (callback) callback.call();
          }else{ 
            errorCallback(error, body.errors?body.errors[0].message:null); 
          }
        }
    );
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
    var checkedRow = $("input.userListTblCb:checked");
    this.setState({itemSelected: checkedRow.length>0})
  },
  handleDeleteBtn: function(event){
    var checkedRow = $("input.userListTblCb:checked");
    var me = this;
    var idList =checkedRow.map(function(index, item){ return item.id.split("-")[1]});
    swal(_.merge({
      title: 'Sure want to delete?',
      text: "You might lost some data!",
      type: 'warning',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    },Config.defaultSwalStyling)).then(function () {
      me.disableForm(true, true);
      riques(Query.deleteUserQry(idList), 
        function(error, response, body) {
          ;
          if (!error && !body.errors && response.statusCode === 200) {
            console.log(JSON.stringify(body, null, 2));
            var here = me;
            var cb = function(){here.disableForm(false, false)}
            me.loadData("All", cb);
          } else {
            errorCallback(error, body.errors?body.errors[0].message:null);
            me.disableForm(false, false);
          }
        }
      );
    })
  },
  handleAddNewBtn: function(event) {
    this.props.handleNav('users','new');
  },
  handleStatusFilter: function(event){
    this.disableForm(true, true);
    var status = event.target.text;
    this.setState({activeStatus: status});
    var re = this;
    this.loadData(status, function(){
      re.setState({deleteMode: false});
      re.disableForm(false, false);
      re.setState({opacity: 1});
    })
      
  },
  handleViewUser: function(userId){
    this.props.handleNav('users','edit', userId);
  },
  onAfterTableLoad: function(){
    var me = this;
    $(".titleText").click(function(event){
      event.preventDefault();
      var userId = this.id.split("-")[1];
      me.handleViewUser(userId);
    });
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
              User List
              { hasRole('modify-user') &&
              (<small style={{marginLeft: 5}}>
                <button className="btn btn-default btn-primary add-new-post-btn" onClick={this.handleAddNewBtn}>Add new</button>
              </small>)
              }
            </h1>
            <ol className="breadcrumb">
              <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
              <li className="active">User List</li>
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
                            onDelete={this.handleDeleteBtn}/>   
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
                      <TableUser 
                          id="userListTbl"
                          columns={[
                            {id: 'image', label: "Image", type: "image", width: 10},
                            {id: 'username', label: "Username", width: 400, type: "link", target: "", cssClass:"titleText"},
                            {id: 'email', label: "Email"},
                            {id: 'fullName', label: "Full name"},
                            {id: 'gender', label: "Gender", textAlign:"center"},
                            {id: 'role', label: "Role", textAlign:"center"},
                            {id: 'posts', label: "Posts", width: 30, textAlign:"center"}
                          ]}
                          checkBoxAtFirstColumn="true"
                          ref="rendactTable"
                          onSelectAll={this.checkDynamicButtonState}
                          onCheckBoxClick={this.checkDynamicButtonState}
                          onAfterLoad={this.onAfterTableLoad}/>
                        
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

export default Users;