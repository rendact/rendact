import React from 'react';
import $ from 'jquery';
window.jQuery = $;
import _ from 'lodash';
import Notification from 'react-notification-system';
import Query from '../query';
import {riques, disableForm, errorCallback} from '../../utils';
import AdminConfig from '../AdminConfig';

const Permission = React.createClass({
  getInitialState: function(){
    require ('datatables');
    require ('datatables/media/css/jquery.dataTables.min.css');

    return {
      dt: null,
      itemSelected: false,
      notification: null,
      itemList: [],
      optionId: null
    }
  },
  loadData: function(datatable) {
    datatable.clear();
    var here = this;
    var qry = Query.getPermissionConfigQry;

    this.disableForm(true);
    riques(qry, 
      function(error, response, body) {
        if (!error && !body.errors && response.statusCode === 200) {
          var roleList = AdminConfig.RoleList;

          if (body.data.viewer.allOptions.edges.length>0) {
            var item = body.data.viewer.allOptions.edges[0];
            here.setState({optionId: item.node.id});
            var permissionConfig = JSON.parse(item.node.value);

            _.forEach(AdminConfig.PermissionList, function(item){
              var row = ['<td>'+item.label+'</td>']
              var roleId = item.id;

              _.forEach(roleList, function(item){
                var checked = "";
                var disabled = "";
                var val = item + "~" + roleId;
                if (_.indexOf(permissionConfig[item], roleId)>-1) {
                  checked = "checked";
                }
                if (item==="Admin" || item==="Owner") disabled="disabled";
                row.push('<td style="textAlign: center"><center><input type="checkbox" class="permissionChk" name="permissionCheckbox" value="'+val+'" '+checked+' '+disabled+'/></center></td>');

              });

              datatable.row.add(row);
            });
            datatable.draw();
            here.disableForm(false); 
          }
        } else {
          errorCallback(error, body.errors?body.errors[0].message:null);
        }
      }
    );
  },
  handleSubmit: function(event) {
    event.preventDefault();
    this.disableForm(true);
    var here = this;
    var checkboxList = $('input[name="permissionCheckbox"]:checked');

    var _config = {}
    _.forEach(checkboxList, function(item){
      var chkValue = item.value;
      var roleName = chkValue.split("~")[0];
      var permissionName = chkValue.split("~")[1]

      if (_.has(_config, roleName)) {
        _config[roleName].push(permissionName);  
      } else {
        _config[roleName] = [permissionName]; 
      }
    });
    var isi = JSON.stringify(_config); 
    var _objData = {
      item: "permissionConfig",
      value: isi
    };
    if (this.state.optionId) _objData["id"] = this.state.optionId;
    var qry = Query.createUpdateSettingsMtn([_objData]);

    riques(qry, 
      function(error, response, body) {
        if (!error && !body.errors && response.statusCode === 200) {
          here.notification.addNotification({
            message: 'Config saved!',
            level: 'success',
            position: 'tr'
          });
          here.disableForm(false);
        } else {
          errorCallback(error, body.errors?body.errors[0].message:null);
        }
      }
    );
  },
  disableForm: function(state){
    disableForm(state, this.notification, ["permissionChk"]);
  },
  componentDidMount: function(){
    var datatable = $('#pageListTbl').DataTable({
        "paging"  : false,
        "searching": false,
        "ordering": false,
        "info"    : false
      }); 
    this.notification = this.refs.notificationSystem;
    this.loadData(datatable);
  },
  render: function(){
    return (
      <div className="content-wrapper">
        <div className="container-fluid">
          <section className="content-header" style={{marginBottom:20}}>
            <h1>
              Permissions Settings
            </h1>
            <ol className="breadcrumb">
              <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
              <li className="active">Permissions Settings</li>
            </ol>
            <div style={{borderBottom:"#eee" , borderBottomStyle:"groove", borderWidth:2, marginTop: 10}}></div>
          </section>
          <Notification ref="notificationSystem" />
          <form onSubmit={this.handleSubmit} id="permissionForm" method="get"> 
          <section className="content">
            <div className="box box-default">
              <div className="box-body">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-xs-12">
                      <div style={{marginTop: 10, marginBottom: 20}}>
                        <div className="box-tools pull-right">
                        </div>
                        <div className="box-tools" style={{marginTop: 10}}>
                        </div>
                      </div>                   
                      <table id="pageListTbl" className="display">
                        <thead>
                          <tr>
                            <th style={{width: 500, color: 'blue'}}>Functionality</th>
                            {
                              AdminConfig.RoleList.map(function(item){
                                return <th key={item} style={{width: 80, textAlign: 'center'}}>{item}</th>    
                              })
                            }
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Loading data...</td>
                            {
                              AdminConfig.RoleList.map(function(item, index){
                                return (<td key={index}></td>)
                              })
                            }
                          </tr>
                        </tbody>
                    </table>
                    <br/>
                    <button type="submit" id="saveBtn" className="btn btn-primary btn-flat pull-right">Save</button>
                  </div>
                </div>
              </div>
             </div>
            </div>
          </section>
          </form>
        </div>
      </div>
    )},
});

export default Permission;