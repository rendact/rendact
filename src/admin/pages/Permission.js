import React from 'react';
import $ from 'jquery';
window.jQuery = $;
import _ from 'lodash';
import Notification from 'react-notification-system';
import Query from '../query';
import Fn from '../lib/functions';
import {riques} from '../../utils';
import { default as swal } from 'sweetalert2';
import Config from '../../config';


const errorCallback = function(msg1, msg2){
  if (msg1) swal('Failed!', msg1, 'warning')
  else if (msg2) swal('Failed!', msg2, 'warning')
  else swal('Failed!', 'Unknown error','warning')
}

const Permission = React.createClass({
  getInitialState: function(){
    require ('datatables');
    require ('datatables/media/css/jquery.dataTables.min.css');

    return {
      dt: null,
      itemSelected: false,
      notification: null,
      itemList: []
    }
  },
  loadData: function(datatable) {
    datatable.clear();
    var permissionConfig = Config.permissionConfig;
    var roleList = Config.roleList;

    _.forEach(Config.permissionList, function(item){
      var row = ['<td>'+item.label+'</td>']
      var roleId = item.id;

      _.forEach(roleList, function(item){
        var checked = "";
        if (_.indexOf(permissionConfig[item], roleId)>-1)
          checked = "checked";
        row.push('<td style="textAlign: center"><input type="checkbox" '+checked+'/></td>');
      });

      datatable.row.add(row);
    });
    datatable.draw();
  },
  disableForm: function(state){
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
              Permission Settings
            </h1>
            <ol className="breadcrumb">
              <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
              <li className="active">Permission Settings</li>
            </ol>
          </section>
          <Notification ref="notificationSystem" /> 
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
                              Config.roleList.map(function(item){
                                return <th style={{width: 80, textAlign: 'center'}}>{item}</th>    
                              })
                            }
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Loading data...</td>
                            {
                              Config.roleList.map(function(item, index){
                                return (<td></td>)
                              })
                            }
                          </tr>
                        </tbody>
                    </table>
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

export default Permission;