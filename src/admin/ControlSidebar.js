import React from 'react';
import $ from 'jquery';
import Query from './query';
import _ from 'lodash';
import {riques} from '../utils';
import { default as swal } from 'sweetalert2';

window.$ = $;

const errorCallback = function(msg1, msg2){
  if (msg1) swal('Failed!', msg1, 'warning')
  else if (msg2) swal('Failed!', msg2, 'warning')
  else swal('Failed!', 'Unknown error','warning')
}

const mySkins = [
    "skin-blue",
    "skin-black",
    "skin-red",
    "skin-yellow",
    "skin-purple",
    "skin-green",
    "skin-blue-light",
    "skin-black-light",
    "skin-red-light",
    "skin-yellow-light",
    "skin-purple-light",
    "skin-green-light"
    ];

const ControlSidebar = React.createClass({
  getInitialState: function(){
    return {
      isSaving: false,
      errorMsg: null,
      noticeTxt: null
    }
  },
  componentDidMount: function(){
    require('./lib/app.js');
    
    this.changeLayout('fixed');
    this.setup();
  },

  changeLayout(cls) {
    
    $("body").toggleClass(cls);
    //$.AdminLTE.layout.fixSidebar();
    //Fix the problem with right sidebar and layout boxed
    if (cls === "layout-boxed")
      $.AdminLTE.controlSidebar._fix($(".control-sidebar-bg"));

    if ($('body').hasClass('fixed') && cls === 'fixed') {
      //AdminLTE.pushMenu.expandOnHover();
      //AdminLTE.layout.activate();
    }

    if (cls === "profile-hide") {
      $(".user-panel").toggleClass("user-panel-hidden");
      localStorage.setItem("user-panel-box", !$(".user-panel").hasClass("user-panel-hidden"));
    }
    //AdminLTE.controlSidebar._fix($(".control-sidebar-bg"));
    //$.AdminLTE.controlSidebar._fix($(".control-sidebar"));
  },

  changeSkin: function(cls){
    if (cls===null) cls = 'skin-blue';
    $.each(mySkins, function (i) {
      $("body").removeClass(mySkins[i]);
    });

    $("body").addClass(cls);
    this.setLSValue('skin', cls);
    return false;
  },

  disableForm: function(state){
    _.forEach(document.getElementsByTagName('input'), function(el){ el.disabled = state;})
    _.forEach(document.getElementsByTagName('button'), function(el){ el.disabled = state;})
  },

  handleCheckBox: function(){
    var checked = $("input.setting:checked");
    if (checked){
      alert("a");
    }
  },

  handleDataSkin: function(e){
    if($(this).hasClass('knob'))
        return;
    e.preventDefault();
    var skinName = e.currentTarget.getAttribute("data-skin");
    this.changeSkin(skinName);
    this.setLSValue('skin', skinName);
  },

  handleDataLayout: function(e){
    var configName = e.target.getAttribute("data-layout");
    var checked = e.target.checked;
    
    if (configName==="profile-hide") {
      if (checked) $(".user-panel").removeClass("user-panel-hidden");
      else $(".user-panel").addClass("user-panel-hidden");
      this.setLSValue('user-panel-box', checked);
    }
    if (configName==="sidebar-collapse") {
      if (checked) $("body").addClass("sidebar-collapse");
      else $("body").removeClass("sidebar-collapse");
      this.setLSValue('sidebar-collapse', checked);
    }
    if (configName==="expand-on-hover") {
      e.target.setAttribute('disabled', checked);
      if (checked){
        $.AdminLTE.pushMenu.expandOnHover();
        if (!$('body').hasClass('sidebar-collapse')) $("body").addClass("sidebar-collapse");
      }
      else {
        $("body").removeClass("sidebar-collapse");
      }
      this.setLSValue('sidebar-expand-on-hover', checked);
    }

    if (configName==="control-sidebar-open") {
      $.AdminLTE.options.controlSidebarOptions.slide = checked;
      if (checked) {
        $('.control-sidebar').addClass('control-sidebar-open');
        $('body').addClass('control-sidebar-open');
      } else {
        $('.control-sidebar').removeClass('control-sidebar-open');
        $('body').removeClass('control-sidebar-open');
      }
      this.setLSValue('control-sidebar-open', checked);
    }
  },

  handleSetting: function(e){
    var configName = e.target.getAttribute("data-setting");
    var checked = e.target.checked;

    if (configName==="report-panel-usage") {
      this.setLSValue('report-panel-usage', checked);
    }

    if (configName==="allow-email-redirect") {
      this.setLSValue('allow-email-redirect', checked);
    }

    if (configName==="expose-author-name") {
      this.setLSValue('expose-author-name', checked);
    }

    if (configName==="show-as-online") {
      this.setLSValue('show-as-online', checked);
    }

    if (configName==="turn-off-notification") {
      this.setLSValue('turn-off-notification', checked);
    }    

  },

  handleSaveBtn: function(event){
    this.disableForm(true);
    var userPrefConfig = {
      "profile-hide": this.getLSValue('user-panel-box'),
      "sidebar-collapse": this.getLSValue('sidebar-collapse'),
      "sidebar-expand-on-hover": this.getLSValue('sidebar-expand-on-hover'),
      "control-sidebar-open": this.getLSValue('control-sidebar-open'),
      "skin": this.getLSValue('skin'),
      "report-panel-usage": this.getLSValue('report-panel-usage'),
      "allow-email-redirect": this.getLSValue('allow-email-redirect'),
      "expose-author-name": this.getLSValue('expose-author-name'),
      "show-as-online": this.getLSValue('show-as-online'),
      "turn-off-notification": this.getLSValue('turn-off-notification')
    }

    var userPrefConfigStr = JSON.stringify(userPrefConfig);
    var p = JSON.parse(localStorage.getItem("profile"));
    var me = this;
    var qry = '';
    var userMetaData = [];

    var metaIdList = JSON.parse(localStorage.getItem("metaIdList"));
    if (metaIdList.userPrefConfig && metaIdList.userPrefConfig!=="" && metaIdList.userPrefConfig!==null) {
      userMetaData = [{id: metaIdList.userPrefConfig, item: "userPrefConfig", value: userPrefConfigStr}]
      qry = Query.saveUserMetaMtn(localStorage.getItem("userId"), userMetaData) 
    } else {
      userMetaData = [{item: "userPrefConfig", value: userPrefConfigStr}]
      qry = Query.createUserMetaMtn(localStorage.getItem("userId"), userMetaData)
    }

    riques(qry, 
      function(error, response, body){
        if(!error && !body.errors) {
          var cfg = _.find(body.data, {changedUserMeta: {item: "userPrefConfig"}});
          if (cfg) {
            p["userPrefConfig"] = cfg.changedUserMeta.value;
            localStorage.setItem("profile", JSON.stringify(p));
          }
        } else {
          errorCallback(error, body.errors?body.errors[0].message:null);
        }
        me.disableForm(false);
        me.setState({isSaving: false});
      }
    );
  },

  resetOption: function(){
    if ($('body').hasClass('sidebar-collapse')) {
      $("[data-layout='sidebar-collapse']").attr('checked', 'checked');
    }
  },

  setup: function() {
    var skin = this.getLSValue('skin');

    if (skin===null || skin==="null" ) {
      this.setLSValue("skin", "skin-blue");
      skin = "skin-blue";
    }

    if (skin && $.inArray(skin, mySkins))
      this.changeSkin(skin);
    
    //Load profile box config
    var profileBox = this.getLSValue('user-panel-box');

    $("[data-layout='profile-hide']").prop('checked', profileBox==='true');
    if (profileBox==="true" && $(".user-panel").hasClass("user-panel-hidden")) {
      $(".user-panel").removeClass("user-panel-hidden")
    }

    var sidebarCollapse = this.getLSValue('sidebar-collapse');
    $("[data-layout='sidebar-collapse']").prop('checked', sidebarCollapse==='true');
    if (sidebarCollapse==="true") {
      $("body").addClass("sidebar-collapse")
    } else if ($("body").hasClass("sidebar-collapse")){
      $("body").removeClass("sidebar-collapse")
    }

    var sidebarExpandHover = this.getLSValue('sidebar-expand-on-hover');
    $("[data-layout='expand-on-hover']").prop('checked', sidebarExpandHover==='true');
    if (sidebarExpandHover==="true"){
      $.AdminLTE.pushMenu.expandOnHover();
      if (!$('body').hasClass('sidebar-collapse')) $("body").addClass("sidebar-collapse");
    }
    else if (sidebarExpandHover==="false") {
      $("body").removeClass("sidebar-collapse");
    }    
  },

  getLSValue: function(item){
    return localStorage.getItem(item)
  },

  setLSValue: function(item, value){
    return localStorage.setItem(item, value)
  },

  render: function(){
    let p = JSON.parse(localStorage.getItem("profile"));
    return (
      <aside className="control-sidebar control-sidebar-dark">
          <ul className="nav nav-tabs nav-justified control-sidebar-tabs">
            <li className="active"><a href="#control-sidebar-theme-demo-options-tab" data-toggle="tab"><i className="fa fa-wrench"></i></a></li>
            {/* <li><a href="#control-sidebar-home-tab" data-toggle="tab"><i className="fa fa-home"></i></a></li> */}
            <li><a href="#control-sidebar-settings-tab" data-toggle="tab"><i className="fa fa-gears"></i></a></li>
          </ul>
          <div className="tab-content">
            <div className="tab-pane active" id="control-sidebar-theme-demo-options-tab">
                <h4 className="control-sidebar-heading">Layout Options</h4>
                <div className='form-group'>
                  <label className='control-sidebar-subheading'>
                    <input type='checkbox' onClick={this.handleDataLayout} data-layout='profile-hide' className='pull-right' />
                    Show Profile Box
                  </label>
                  <p>Show the profile box in the left sidebar</p>
                </div>
                
                <div className='form-group'>
                  <label className='control-sidebar-subheading'>
                    <input type='checkbox' onClick={this.handleDataLayout} data-layout='sidebar-collapse' className='pull-right'/>
                    Collapse Sidebar
                  </label>
                  <p>Collapse the left sidebars state</p>
                </div>
                
                <div className='form-group'>
                  <label className='control-sidebar-subheading'>
                    <input type='checkbox' onClick={this.handleDataLayout} data-layout='expand-on-hover' className='pull-right'/>
                    Sidebar Expand on Hover
                  </label>
                  <p>Let the sidebar mini expand on hover</p>
                </div>
                
                <div className='form-group'>
                  <label className='control-sidebar-subheading'>
                    <input type='checkbox' onClick={this.handleDataLayout} data-layout='control-sidebar-open' className='pull-right'/>
                    Toggle Right Sidebar Slide
                  </label>
                  <p>Toggle between slide over content and push content effects</p>
                </div>
                
                <h4 className='control-sidebar-heading'>Skins</h4>
                <ul className="list-unstyled clearfix">
                  <li style={{float:"left", width: "33.33333%", padding: 5}}>
                    <a href='#' onClick={this.handleDataSkin} data-skin='skin-blue' style={{display: "block", boxShadow: "0 0 3px rgba(0,0,0,0.4)"}} className='clearfix full-opacity-hover'>
                        <div><span style={{display:"block", width: "20%", float: "left", height: 7, background: "#367fa9"}}></span><span className='bg-light-blue' style={{display:"block", width: "80%", float: "left", height: 7}}></span></div>
                        <div><span style={{display:"block", width: "20%", float: "left", height: 20, background: "#222d32"}}></span><span style={{display:"block", width: "80%", float: "left", height: 20, background: "#f4f5f7"}}></span></div>
                      </a>
                      <p className='text-center no-margin'>Blue</p>
                  </li>
                  <li style={{float:"left", width: "33.33333%", padding: 5}}>
                    <a href='#' onClick={this.handleDataSkin} data-skin='skin-black' style={{display: "block", boxShadow: "0 0 3px rgba(0,0,0,0.4)"}} className='clearfix full-opacity-hover'>
                        <div style={{boxShadow: "0 0 2px rgba(0,0,0,0.1)"}} className='clearfix'><span style={{display:"block", width: "20%", float: "left", height: 7, background: "#fefefe"}}></span><span style={{display:"block", width: "80%", float: "left", height: 7, background: "#fefefe"}}></span></div>
                        <div><span style={{display:"block", width: "20%", float: "left", height: 20, background: "#222d32"}}></span><span style={{display:"block", width: "80%", float: "left", height: 20, background: "#f4f5f7"}}></span></div>
                      </a>
                      <p className='text-center no-margin'>Black</p>
                  </li>
                  <li style={{float:"left", width: "33.33333%", padding: 5}}>
                    <a href='#' onClick={this.handleDataSkin} data-skin='skin-purple' style={{display: "block", boxShadow: "0 0 3px rgba(0,0,0,0.4)"}} className='clearfix full-opacity-hover'>
                        <div><span style={{display:"block", width: "20%", float: "left", height: 7}} className='bg-purple-active'></span><span className='bg-purple' style={{display:"block", width: "80%", float: "left", height: 7}}></span></div>
                        <div><span style={{display:"block", width: "20%", float: "left", height: 20, background: "#222d32"}}></span><span style={{display:"block", width: "80%", float: "left", height: 20, background: "#f4f5f7"}}></span></div>
                      </a>
                      <p className='text-center no-margin'>Purple</p>
                  </li>
                  <li style={{float:"left", width: "33.33333%", padding: 5}}>
                    <a href='#' onClick={this.handleDataSkin} data-skin='skin-green' style={{display: "block", boxShadow: "0 0 3px rgba(0,0,0,0.4)"}} className='clearfix full-opacity-hover'>
                        <div><span style={{display:"block", width: "20%", float: "left", height: 7}} className="bg-green-active"></span><span className='bg-green' style={{display:"block", width: "80%", float: "left", height: 7}}></span></div>
                        <div><span style={{display:"block", width: "20%", float: "left", height: 20, background: "#222d32"}}></span><span style={{display:"block", width: "80%", float: "left", height: 20, background: "#f4f5f7"}}></span></div>
                      </a>
                      <p className='text-center no-margin'>Green</p>
                  </li>
                  <li style={{float:"left", width: "33.33333%", padding: 5}}>
                    <a href='#' onClick={this.handleDataSkin} data-skin='skin-red' style={{display: "block", boxShadow: "0 0 3px rgba(0,0,0,0.4)"}} className='clearfix full-opacity-hover'>
                        <div><span style={{display:"block", width: "20%", float: "left", height: 7}} className="bg-red-active"></span><span className='bg-red' style={{display:"block", width: "80%", float: "left", height: 7}}></span></div>
                        <div><span style={{display:"block", width: "20%", float: "left", height: 20, background: "#222d32"}}></span><span style={{display:"block", width: "80%", float: "left", height: 20, background: "#f4f5f7"}}></span></div>
                      </a>
                      <p className='text-center no-margin'>Red</p>
                  </li>
                  <li style={{float:"left", width: "33.33333%", padding: 5}}>
                    <a href='#' onClick={this.handleDataSkin} data-skin='skin-yellow' style={{display: "block", boxShadow: "0 0 3px rgba(0,0,0,0.4)"}} className='clearfix full-opacity-hover'>
                        <div><span style={{display:"block", width: "20%", float: "left", height: 7}} className="bg-yellow-active"></span><span className='bg-yellow' style={{display:"block", width: "80%", float: "left", height: 7}}></span></div>
                        <div><span style={{display:"block", width: "20%", float: "left", height: 20, background: "#222d32"}}></span><span style={{display:"block", width: "80%", float: "left", height: 20, background: "#f4f5f7"}}></span></div>
                      </a>
                      <p className='text-center no-margin'>Yellow</p>
                  </li>
                  <li style={{float:"left", width: "33.33333%", padding: 5}}>
                    <a href='#' onClick={this.handleDataSkin} data-skin='skin-blue-light' style={{display: "block", boxShadow: "0 0 3px rgba(0,0,0,0.4)"}} className='clearfix full-opacity-hover'>
                        <div><span style={{display:"block", width: "20%", float: "left", height: 7, background: "#367fa9"}}></span><span className='bg-light-blue' style={{display:"block", width: "80%", float: "left", height: 7}}></span></div>
                        <div><span style={{display:"block", width: "20%", float: "left", height: 20, background: "#f9fafc"}}></span><span style={{display:"block", width: "80%", float: "left", height: 20, background: "#f4f5f7"}}></span></div>
                      </a>
                      <p className='text-center no-margin'>Blue Light</p>
                  </li>
                  <li style={{float:"left", width: "33.33333%", padding: 5}}>
                    <a href='#' onClick={this.handleDataSkin} data-skin='skin-black-light' style={{display: "block", boxShadow: "0 0 3px rgba(0,0,0,0.4)"}} className='clearfix full-opacity-hover'>
                        <div style={{boxShadow: "0 0 2px rgba(0,0,0,0.1)"}} className='clearfix'><span style={{display:"block", width: "20%", float: "left", height: 7, background: "#fefefe"}}></span><span style={{display:"block", width: "80%", float: "left", height: 7, background: "#fefefe"}}></span></div>
                        <div><span style={{display:"block", width: "20%", float: "left", height: 20, background: "#f9fafc"}}></span><span style={{display:"block", width: "80%", float: "left", height: 20, background: "#f4f5f7"}}></span></div>
                      </a>
                      <p className='text-center no-margin'>Black Light</p>
                  </li>
                  <li style={{float:"left", width: "33.33333%", padding: 5}}>
                    <a href='#' onClick={this.handleDataSkin} data-skin='skin-purple-light' style={{display: "block", boxShadow: "0 0 3px rgba(0,0,0,0.4)"}} className='clearfix full-opacity-hover'>
                        <div><span style={{display:"block", width: "20%", float: "left", height: 7}} className="bg-purple-active"></span><span className='bg-purple' style={{display:"block", width: "80%", float: "left", height: 7}}></span></div>
                        <div><span style={{display:"block", width: "20%", float: "left", height: 20, background: "#f9fafc"}}></span><span style={{display:"block", width: "80%", float: "left", height: 20, background: "#f4f5f7"}}></span></div>
                      </a>
                      <p className='text-center no-margin'>Purple Light</p>
                  </li>
                  <li style={{float:"left", width: "33.33333%", padding: 5}}>
                    <a href='#' onClick={this.handleDataSkin} data-skin='skin-green-light' style={{display: "block", boxShadow: "0 0 3px rgba(0,0,0,0.4)"}} className='clearfix full-opacity-hover'>
                        <div><span style={{display:"block", width: "20%", float: "left", height: 7}} className="bg-green-active"></span><span className='bg-green' style={{display:"block", width: "80%", float: "left", height: 7}}></span></div>
                        <div><span style={{display:"block", width: "20%", float: "left", height: 20, background: "#f9fafc"}}></span><span style={{display:"block", width: "80%", float: "left", height: 20, background: "#f4f5f7"}}></span></div>
                      </a>
                      <p className='text-center no-margin'>Green Light</p>
                  </li>
                  <li style={{float:"left", width: "33.33333%", padding: 5}}>
                    <a href='#' onClick={this.handleDataSkin} data-skin='skin-red-light' style={{display: "block", boxShadow: "0 0 3px rgba(0,0,0,0.4)"}} className='clearfix full-opacity-hover'>
                        <div><span style={{display:"block", width: "20%", float: "left", height: 7}} className="bg-red-active"></span><span className='bg-red' style={{display:"block", width: "80%", float: "left", height: 7}}></span></div>
                        <div><span style={{display:"block", width: "20%", float: "left", height: 20, background: "#f9fafc"}}></span><span style={{display:"block", width: "80%", float: "left", height: 20, background: "#f4f5f7"}}></span></div>
                      </a>
                      <p className='text-center no-margin'>Red Light</p>
                  </li>
                  <li style={{float:"left", width: "33.33333%", padding: 5}}>
                    <a href='#' onClick={this.handleDataSkin} data-skin='skin-yellow-light' style={{display: "block", boxShadow: "0 0 3px rgba(0,0,0,0.4)"}} className='clearfix full-opacity-hover'>
                        <div><span style={{display:"block", width: "20%", float: "left", height: 7}} className="bg-yellow-active"></span><span className='bg-yellow' style={{display:"block", width: "80%", float: "left", height: 7}}></span></div>
                        <div><span style={{display:"block", width: "20%", float: "left", height: 20, background: "#f9fafc"}}></span><span style={{display:"block", width: "80%", float: "left", height: 20, background: "#f4f5f7"}}></span></div>
                      </a>
                      <p className='text-center no-margin'>Yellow Light</p>
                  </li>
                </ul>
                <div className="form-group">
                  <input type="button" onClick={this.handleSaveBtn} className="btn btn-primary" style={{width: "100%"}} value="Save" />
                </div>
            </div>

            {/* 
            <div className="tab-pane" id="control-sidebar-home-tab">
              <h3 className="control-sidebar-heading">Recent Activity</h3>
              <ul className="control-sidebar-menu">
                <li>
                  <a href="#">
                    <i className="menu-icon fa fa-birthday-cake bg-red"></i>

                    <div className="menu-info">
                      <h4 className="control-sidebar-subheading">Langdons Birthday</h4>

                      <p>Will be 23 on April 24th</p>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="menu-icon fa fa-user bg-yellow"></i>

                    <div className="menu-info">
                      <h4 className="control-sidebar-subheading">Frodo Updated His Profile</h4>

                      <p>New phone +1(800)555-1234</p>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="menu-icon fa fa-envelope-o bg-light-blue"></i>

                    <div className="menu-info">
                      <h4 className="control-sidebar-subheading">Nora Joined Mailing List</h4>

                      <p>nora@example.com</p>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="menu-icon fa fa-file-code-o bg-green"></i>

                    <div className="menu-info">
                      <h4 className="control-sidebar-subheading">Cron Job 254 Executed</h4>

                      <p>Execution time 5 seconds</p>
                    </div>
                  </a>
                </li>
              </ul>

              <h3 className="control-sidebar-heading">Tasks Progress</h3>
              <ul className="control-sidebar-menu">
                <li>
                  <a href="#">
                    <h4 className="control-sidebar-subheading">
                      Custom Template Design
                      <span className="label label-danger pull-right">70%</span>
                    </h4>

                    <div className="progress progress-xxs">
                      <div className="progress-bar progress-bar-danger" style={{width: "70%"}}></div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <h4 className="control-sidebar-subheading">
                      Update Resume
                      <span className="label label-success pull-right">95%</span>
                    </h4>

                    <div className="progress progress-xxs">
                      <div className="progress-bar progress-bar-success" style={{width: "95%"}}></div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <h4 className="control-sidebar-subheading">
                      Laravel Integration
                      <span className="label label-warning pull-right">50%</span>
                    </h4>

                    <div className="progress progress-xxs">
                      <div className="progress-bar progress-bar-warning" style={{width: "50%"}}></div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <h4 className="control-sidebar-subheading">
                      Back End Framework
                      <span className="label label-primary pull-right">68%</span>
                    </h4>

                    <div className="progress progress-xxs">
                      <div className="progress-bar progress-bar-primary" style={{width: "68%"}}></div>
                    </div>
                  </a>
                </li>
              </ul>

            </div>
            */}

            <div className="tab-pane" id="control-sidebar-stats-tab">Stats Tab Content</div>
            <div className="tab-pane" id="control-sidebar-settings-tab">
              <form method="post">
                <h3 className="control-sidebar-heading">General Settings</h3>

                <div className="form-group">
                  <label className="control-sidebar-subheading">
                    Report panel usage
                    <input type="checkbox" className="pull-right setting" data-setting="report-panel-usage" onChange={this.handleSetting} />
                  </label>

                  <p>
                    Some information about this general settings option
                  </p>
                </div>

                <div className="form-group">
                  <label className="control-sidebar-subheading">
                    Allow mail redirect
                    <input type="checkbox" className="pull-right setting" data-setting="allow-email-redirect" onChange={this.handleSetting}/>
                  </label>

                  <p>
                    Other sets of options are available
                  </p>
                </div>

                <div className="form-group">
                  <label className="control-sidebar-subheading">
                    Expose author name in posts
                    <input type="checkbox" className="pull-right setting" data-setting="expose-author-name" onChange={this.handleSetting}/>
                  </label>

                  <p>
                    Allow the user to show his name in blog posts
                  </p>
                </div>

                <h3 className="control-sidebar-heading">Chat Settings</h3>

                <div className="form-group">
                  <label className="control-sidebar-subheading">
                    Show me as online
                    <input type="checkbox" className="pull-right setting" data-setting="show-as-online" onChange={this.handleSetting}/>
                  </label>
                </div>

                <div className="form-group">
                  <label className="control-sidebar-subheading">
                    Turn off notifications
                    <input type="checkbox" className="pull-right setting" data-setting="turn-off-notification" onChange={this.handleSetting}/>
                  </label>
                </div>

                <div className="form-group">
                  <label className="control-sidebar-subheading">
                    Delete chat history
                    <a href="#" className="text-red pull-right"><i className="fa fa-trash-o"></i></a>
                  </label>
                </div>
              </form>
            </div>
          </div>
        </aside>
    )
  }
});

export default ControlSidebar;