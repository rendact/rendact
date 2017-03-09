import React from 'react';
import $ from 'jquery';
const jQuery = $;
window.jQuery = $;
const AdminLTE = jQuery.AdminLTE;


const ControlSidebar = React.createClass({
  componentDidMount: function(){
    this.changeLayout('fixed');
    var mySkins = [
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

    //Load profile box config
    var profileBox = this.get('user-panel-box');
    
    $("[data-layout='profile-hide']").prop('checked', profileBox==='true');
    //$("[data-layout='profile-hide']").checked = profileBox==='true';
    if (profileBox==="true" && $(".user-panel").hasClass("user-panel-hidden")) {
      $(".user-panel").removeClass("user-panel-hidden")
    }
  },

  changeLayout: function(cls){
    $("body").toggleClass(cls);

    if (cls === "layout-boxed")
      AdminLTE.controlSidebar._fix($(".control-sidebar-bg"));
    if ($('body').hasClass('fixed') && cls === 'fixed') {

    }
    if (cls === "profile-hide") {
      $(".user-panel").toggleClass("user-panel-hidden");
      localStorage.setItem("user-panel-box", !$(".user-panel").hasClass("user-panel-hidden"));
    }
  },

  changeSkin: function(cls){
    var mySkins = [
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
    $.each(mySkins, function (i) {
      $("body").removeClass(mySkins[i]);
    });

    $("body").addClass(cls);
    this.store('skin', cls);
    return false;
  },

  store: function(name, val){
    if (typeof (Storage) !== "undefined") {
      localStorage.setItem(name, val);
    } else {
      window.alert('Please use a modern browser to properly view this template!');
    }
  },

  get: function(name){
    if (typeof (Storage) !== "undefined") {
      return localStorage.getItem(name);
    } else {
      window.alert('Please use a modern browser to properly view this template!');
    }
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
      this.changeSkin($(this).data('skin'));
  },

  handleDataLayout: function(){
    this.changeLayout($(this).data('layout'));
  },


  handleDataControlSidebar: function(){
    this.changeLayout($(this).data('controlsidebar'));
    var slide = !AdminLTE.options.controlSidebarOptions.slide;
    AdminLTE.options.controlSidebarOptions.slide = slide;
    if (!slide)
      $('.control-sidebar').removeClass('control-sidebar-open');
  },

  handleDataSidebarSKin: function(){
    var sidebar = $(".control-sidebar");
      if (sidebar.hasClass("control-sidebar-dark")) {
        sidebar.removeClass("control-sidebar-dark")
        sidebar.addClass("control-sidebar-light")
      } else {
        sidebar.removeClass("control-sidebar-light")
        sidebar.addClass("control-sidebar-dark")
      }
  },

  handleDataEnable: function(){
    $(this).attr('disabled', true);
      AdminLTE.pushMenu.expandOnHover();
      if (!$('body').hasClass('sidebar-collapse'))
        $("[data-layout='sidebar-collapse']").click();
  },

  resetOption: function(){
      // Reset options
    if ($('body').hasClass('fixed')) {
      $("[data-layout='fixed']").attr('checked', 'checked');
    }
    if ($('body').hasClass('layout-boxed')) {
      $("[data-layout='layout-boxed']").attr('checked', 'checked');
    }
    if ($('body').hasClass('sidebar-collapse')) {
      $("[data-layout='sidebar-collapse']").attr('checked', 'checked');
    }
  },

  componentWillMount: function(){
    
  },

  render: function(){
    let p = JSON.parse(localStorage.getItem("profile"));
    return (
      <aside className="control-sidebar control-sidebar-dark">
          <ul className="nav nav-tabs nav-justified control-sidebar-tabs">
            <li><a href="#control-sidebar-theme-demo-options-tab" data-toggle="tab"><i className="fa fa-wrench"></i></a></li>
              <li><a href="#control-sidebar-home-tab" data-toggle="tab"><i className="fa fa-home"></i></a></li>
              <li><a href="#control-sidebar-settings-tab" data-toggle="tab"><i className="fa fa-gears"></i></a></li>
          </ul>
          <div className="tab-content">
            <div className="tab-pane" id="control-sidebar-theme-demo-options-tab">
                <h4 className="control-sidebar-heading">Layout Options</h4>
                <div className='form-group'>
                  <label className='control-sidebar-subheading'>
                    <input type='checkbox' onClick={this.handleDataLayout} data-layout='profile-hide' className='pull-right' />
                    Toggle Profile Box
                  </label>
                  <p>Toggle the profile box in the left sidebar(show or hidden)</p>
                </div>
                
                <div className='form-group'>
                  <label className='control-sidebar-subheading'>
                    <input type='checkbox' onClick={this.handleDataLayout} data-layout='sidebar-collapse' className='pull-right'/>
                    Toggle Sidebar
                  </label>
                  <p>Toggle the left sidebars state (open or collapse)</p>
                </div>
                
                <div className='form-group'>
                  <label className='control-sidebar-subheading'>
                    <input type='checkbox' onClick={this.handleDataEnable} data-enable='expandOnHover' className='pull-right'/>
                    Sidebar Expand on Hover
                  </label>
                  <p>Let the sidebar mini expand on hover</p>
                </div>
                
                <div className='form-group'>
                  <label className='control-sidebar-subheading'>
                    <input type='checkbox' onClick={this.handleDataControlSidebar} data-controlsidebar='control-sidebar-open' className='pull-right'/>
                    Toggle Right Sidebar Slide
                  </label>
                  <p>Toggle between slide over content and push content effects</p>
                </div>
                
                <div className='form-group'>
                  <label className='control-sidebar-subheading'>
                    <input type='checkbox' onClick={this.handleDataSidebarSKin} data-sidebarskin='toggle' className='pull-right'/>
                    Toggle Right Sidebar Skin
                    </label>
                  <p>Toggle between dark and light skins for the right sidebar</p>
                </div>
                <h4 className='control-sidebar-heading'>Skins</h4>
                <ul className="list-unstyled clearfix">
                  <li style={{float:"left", width: "33.33333%", padding: 5}}>
                    <a href='javascript:void(0)' onClick={this.handleDataSkin} data-skin='skin-blue' style={{display: "block", boxShadow: "0 0 3px rgba(0,0,0,0.4)"}} className='clearfix full-opacity-hover'>
                        <div><span style={{display:"block", width: "20%", float: "left", height: 7, background: "#367fa9"}}></span><span className='bg-light-blue' style={{display:"block", width: "80%", float: "left", height: 7}}></span></div>
                        <div><span style={{display:"block", width: "20%", float: "left", height: 20, background: "#222d32"}}></span><span style={{display:"block", width: "80%", float: "left", height: 20, background: "#f4f5f7"}}></span></div>
                      </a>
                      <p className='text-center no-margin'>Blue</p>
                  </li>
                  <li style={{float:"left", width: "33.33333%", padding: 5}}>
                    <a href='javascript:void(0)' onClick={this.handleDataSkin} data-skin='skin-black' style={{display: "block", boxShadow: "0 0 3px rgba(0,0,0,0.4)"}} className='clearfix full-opacity-hover'>
                        <div style={{boxShadow: "0 0 2px rgba(0,0,0,0.1)"}} className='clearfix'><span style={{display:"block", width: "20%", float: "left", height: 7, background: "#fefefe"}}></span><span style={{display:"block", width: "80%", float: "left", height: 7, background: "#fefefe"}}></span></div>
                        <div><span style={{display:"block", width: "20%", float: "left", height: 20, background: "#222d32"}}></span><span style={{display:"block", width: "80%", float: "left", height: 20, background: "#f4f5f7"}}></span></div>
                      </a>
                      <p className='text-center no-margin'>Black</p>
                  </li>
                  <li style={{float:"left", width: "33.33333%", padding: 5}}>
                    <a href='javascript:void(0)' onClick={this.handleDataSkin} data-skin='skin-purple' style={{display: "block", boxShadow: "0 0 3px rgba(0,0,0,0.4)"}} className='clearfix full-opacity-hover'>
                        <div><span style={{display:"block", width: "20%", float: "left", height: 7}} className='bg-purple-active'></span><span className='bg-purple' style={{display:"block", width: "80%", float: "left", height: 7}}></span></div>
                        <div><span style={{display:"block", width: "20%", float: "left", height: 20, background: "#222d32"}}></span><span style={{display:"block", width: "80%", float: "left", height: 20, background: "#f4f5f7"}}></span></div>
                      </a>
                      <p className='text-center no-margin'>Purple</p>
                  </li>
                  <li style={{float:"left", width: "33.33333%", padding: 5}}>
                    <a href='javascript:void(0)' onClick={this.handleDataSkin} data-skin='skin-green' style={{display: "block", boxShadow: "0 0 3px rgba(0,0,0,0.4)"}} className='clearfix full-opacity-hover'>
                        <div><span style={{display:"block", width: "20%", float: "left", height: 7}} className="bg-green-active"></span><span className='bg-green' style={{display:"block", width: "80%", float: "left", height: 7}}></span></div>
                        <div><span style={{display:"block", width: "20%", float: "left", height: 20, background: "#222d32"}}></span><span style={{display:"block", width: "80%", float: "left", height: 20, background: "#f4f5f7"}}></span></div>
                      </a>
                      <p className='text-center no-margin'>Green</p>
                  </li>
                  <li style={{float:"left", width: "33.33333%", padding: 5}}>
                    <a href='javascript:void(0)' onClick={this.handleDataSkin} data-skin='skin-red' style={{display: "block", boxShadow: "0 0 3px rgba(0,0,0,0.4)"}} className='clearfix full-opacity-hover'>
                        <div><span style={{display:"block", width: "20%", float: "left", height: 7}} className="bg-red-active"></span><span className='bg-red' style={{display:"block", width: "80%", float: "left", height: 7}}></span></div>
                        <div><span style={{display:"block", width: "20%", float: "left", height: 20, background: "#222d32"}}></span><span style={{display:"block", width: "80%", float: "left", height: 20, background: "#f4f5f7"}}></span></div>
                      </a>
                      <p className='text-center no-margin'>Red</p>
                  </li>
                  <li style={{float:"left", width: "33.33333%", padding: 5}}>
                    <a href='javascript:void(0)' onClick={this.handleDataSkin} data-skin='skin-yellow' style={{display: "block", boxShadow: "0 0 3px rgba(0,0,0,0.4)"}} className='clearfix full-opacity-hover'>
                        <div><span style={{display:"block", width: "20%", float: "left", height: 7}} className="bg-yellow-active"></span><span className='bg-yellow' style={{display:"block", width: "80%", float: "left", height: 7}}></span></div>
                        <div><span style={{display:"block", width: "20%", float: "left", height: 20, background: "#222d32"}}></span><span style={{display:"block", width: "80%", float: "left", height: 20, background: "#f4f5f7"}}></span></div>
                      </a>
                      <p className='text-center no-margin'>Yellow</p>
                  </li>
                  <li style={{float:"left", width: "33.33333%", padding: 5}}>
                    <a href='javascript:void(0)' onClick={this.handleDataSkin} data-skin='skin-blue-light' style={{display: "block", boxShadow: "0 0 3px rgba(0,0,0,0.4)"}} className='clearfix full-opacity-hover'>
                        <div><span style={{display:"block", width: "20%", float: "left", height: 7, background: "#367fa9"}}></span><span className='bg-light-blue' style={{display:"block", width: "80%", float: "left", height: 7}}></span></div>
                        <div><span style={{display:"block", width: "20%", float: "left", height: 20, background: "#f9fafc"}}></span><span style={{display:"block", width: "80%", float: "left", height: 20, background: "#f4f5f7"}}></span></div>
                      </a>
                      <p className='text-center no-margin'>Blue Light</p>
                  </li>
                  <li style={{float:"left", width: "33.33333%", padding: 5}}>
                    <a href='javascript:void(0)' onClick={this.handleDataSkin} data-skin='skin-black-light' style={{display: "block", boxShadow: "0 0 3px rgba(0,0,0,0.4)"}} className='clearfix full-opacity-hover'>
                        <div style={{boxShadow: "0 0 2px rgba(0,0,0,0.1)"}} className='clearfix'><span style={{display:"block", width: "20%", float: "left", height: 7, background: "#fefefe"}}></span><span style={{display:"block", width: "80%", float: "left", height: 7, background: "#fefefe"}}></span></div>
                        <div><span style={{display:"block", width: "20%", float: "left", height: 20, background: "#f9fafc"}}></span><span style={{display:"block", width: "80%", float: "left", height: 20, background: "#f4f5f7"}}></span></div>
                      </a>
                      <p className='text-center no-margin'>Black Light</p>
                  </li>
                  <li style={{float:"left", width: "33.33333%", padding: 5}}>
                    <a href='javascript:void(0)' onClick={this.handleDataSkin} data-skin='skin-purple-light' style={{display: "block", boxShadow: "0 0 3px rgba(0,0,0,0.4)"}} className='clearfix full-opacity-hover'>
                        <div><span style={{display:"block", width: "20%", float: "left", height: 7}} className="bg-purple-active"></span><span className='bg-purple' style={{display:"block", width: "80%", float: "left", height: 7}}></span></div>
                        <div><span style={{display:"block", width: "20%", float: "left", height: 20, background: "#f9fafc"}}></span><span style={{display:"block", width: "80%", float: "left", height: 20, background: "#f4f5f7"}}></span></div>
                      </a>
                      <p className='text-center no-margin'>Purple Light</p>
                  </li>
                  <li style={{float:"left", width: "33.33333%", padding: 5}}>
                    <a href='javascript:void(0)' onClick={this.handleDataSkin} data-skin='skin-green-light' style={{display: "block", boxShadow: "0 0 3px rgba(0,0,0,0.4)"}} className='clearfix full-opacity-hover'>
                        <div><span style={{display:"block", width: "20%", float: "left", height: 7}} className="bg-green-active"></span><span className='bg-green' style={{display:"block", width: "80%", float: "left", height: 7}}></span></div>
                        <div><span style={{display:"block", width: "20%", float: "left", height: 20, background: "#f9fafc"}}></span><span style={{display:"block", width: "80%", float: "left", height: 20, background: "#f4f5f7"}}></span></div>
                      </a>
                      <p className='text-center no-margin'>Green Light</p>
                  </li>
                  <li style={{float:"left", width: "33.33333%", padding: 5}}>
                    <a href='javascript:void(0)' onClick={this.handleDataSkin} data-skin='skin-red-light' style={{display: "block", boxShadow: "0 0 3px rgba(0,0,0,0.4)"}} className='clearfix full-opacity-hover'>
                        <div><span style={{display:"block", width: "20%", float: "left", height: 7}} className="bg-red-active"></span><span className='bg-red' style={{display:"block", width: "80%", float: "left", height: 7}}></span></div>
                        <div><span style={{display:"block", width: "20%", float: "left", height: 20, background: "#f9fafc"}}></span><span style={{display:"block", width: "80%", float: "left", height: 20, background: "#f4f5f7"}}></span></div>
                      </a>
                      <p className='text-center no-margin'>Red Light</p>
                  </li>
                  <li style={{float:"left", width: "33.33333%", padding: 5}}>
                    <a href='javascript:void(0)' onClick={this.handleDataSkin} data-skin='skin-yellow-light' style={{display: "block", boxShadow: "0 0 3px rgba(0,0,0,0.4)"}} className='clearfix full-opacity-hover'>
                        <div><span style={{display:"block", width: "20%", float: "left", height: 7}} className="bg-yellow-active"></span><span className='bg-yellow' style={{display:"block", width: "80%", float: "left", height: 7}}></span></div>
                        <div><span style={{display:"block", width: "20%", float: "left", height: 20, background: "#f9fafc"}}></span><span style={{display:"block", width: "80%", float: "left", height: 20, background: "#f4f5f7"}}></span></div>
                      </a>
                      <p className='text-center no-margin'>Yellow Light</p>
                  </li>
                </ul>
            </div>

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
            <div className="tab-pane" id="control-sidebar-stats-tab">Stats Tab Content</div>
            <div className="tab-pane" id="control-sidebar-settings-tab">
              <form method="post">
                <h3 className="control-sidebar-heading">General Settings</h3>

                <div className="form-group">
                  <label className="control-sidebar-subheading">
                    Report panel usage
                    <input type="checkbox" className="pull-right" onChange={this.handleCheckBox} class="setting" id="a" value="report"/>
                  </label>

                  <p>
                    Some information about this general settings option
                  </p>
                </div>

                <div className="form-group">
                  <label className="control-sidebar-subheading">
                    Allow mail redirect
                    <input type="checkbox" className="pull-right" onChange={this.handleCheckBox} class="setting" id="b" value="Allow"/>
                  </label>

                  <p>
                    Other sets of options are available
                  </p>
                </div>

                <div className="form-group">
                  <label className="control-sidebar-subheading">
                    Expose author name in posts
                    <input type="checkbox" className="pull-right" onChange={this.handleCheckBox} class="setting" id="c" value="expose"/>
                  </label>

                  <p>
                    Allow the user to show his name in blog posts
                  </p>
                </div>

                <h3 className="control-sidebar-heading">Chat Settings</h3>

                <div className="form-group">
                  <label className="control-sidebar-subheading">
                    Show me as online
                    <input type="checkbox" className="pull-right" onChange={this.handleCheckBox}  class="setting" id="d" value="show"/>
                  </label>
                </div>

                <div className="form-group">
                  <label className="control-sidebar-subheading">
                    Turn off notifications
                    <input type="checkbox" className="pull-right" onChange={this.handleCheckBox} class="setting" id="e" value="turnOff"/>
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