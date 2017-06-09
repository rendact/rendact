import React from 'react';
import $ from 'jquery';
import Query from '../query';
import _ from 'lodash';
import Notification from 'react-notification-system';
import {swalert, riques, hasRole, errorCallback, setValue, getValue, removeTags, disableForm} from '../../utils';
import { Table, SearchBox, DeleteButtons} from '../lib/Table';

var Menu = React.createClass({
  getInitialState: function(){
      require ('../pages/Posts.css');

      return {
        name:"",
        postId:"",
        tagId:"",
        dt: null,
        errorMsg: null,
        loadingMsg: null,
        deleteMode: false,activeStatus: "All",
        pageList: null,
      }
  },
  disableForm: function(state){
    disableForm(state, this.notif)
  },
  resetForm: function(){
    document.getElementById("menu").reset();
    this.setState({name:""});
    window.history.pushState("", "", '/admin/menu');
  },
  handleSubmit: function(event){
    event.preventDefault();
    var me = this;
    var name = getValue("name");
    var postId = this.state.postId;
    this.disableForm(true);
    var qry = Query.createMenu(name);
    var noticeTxt = "Menu Saved";

    riques(qry, 
      function(error, response, body) { 
        if (!error && !body.errors && response.statusCode === 200) {
          me.notif.addNotification({
                  message: noticeTxt,
                  level: 'success',
                  position: 'tr',
                  autoDismiss: 2
          });
          me.resetForm();
          me.disableForm(false);
        } else {
          errorCallback(error, body.errors?body.errors[0].message:null);
        }
        me.disableForm(false);
      });
  },
  componentWillMount: function(){
    var me = this;
      riques(Query.getAllMenu, 
        function(error, response, body) {
        	debugger;
          if (!error) {
            var pageList = [(<option key="0" value="">--select menu--</option>)];
            _.forEach(body.data.viewer.allMenus.edges, function(item){
              pageList.push((<option key={item.node.id} value={item.node.id}>
                {item.node.name}</option>));
            })
            me.setState({pageList: pageList});
          }
        }
      );
    },
  componentDidMount: function(){
    this.notif = this.refs.notificationSystem;
  },
	render: function(){
		return (
			<div className="content-wrapper">
        	  <div className="container-fluid">
				<section className="content-header">
			      <h1>
            		Menus
          		  </h1>
          		  <ol className="breadcrumb">
            		<li><a href="#"><i className="fa fa-dashboard"></i>Home</a></li>
            		<li className="active">Menus</li>
          		  </ol>
          		  <div style={{borderBottom:"#eee" , borderBottomStyle:"groove", borderWidth:2, marginTop: 10, marginBottom: 10}}></div>
			    </section>
		        <Notification ref="notificationSystem" />     
			    	<div className="row">
				     	<div className="col-md-3">
				     	  <form onSubmit={this.handleSubmit} id="menu" method="get">
					     	  <div className="box box-default">
								<div className="box-header with-border attachment-block clearfix">
									<div className="form-group">
										<h4>Create A New Menu :</h4>
									</div>
									<div>
										<input type="text" name="name" id="name" className="form-control" />
									</div>
									<div className="pull-right" style={{marginTop: 10}}>
										<button type="submit" id="submit" className="btn btn-flat btn-success">Create Menu</button>
									</div>
								</div>
							  </div>
						  </form>
							<div className="box box-default box-solid">
								<div className="box-header with-border">
									<h3 className="box-title">Pages</h3>
									<div className="box-tools pull-right">
									    <button type="button" className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-plus"></i>
									    </button>
									</div>
								</div>
								<div className="box-body">
									The body of the box
								</div>
							</div>
							<div className="box box-default collapsed-box box-solid">
								<div className="box-header with-border">
									<h3 className="box-title">Posts</h3>
									<div className="box-tools pull-right">
									    <button type="button" className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-plus"></i>
									    </button>
									</div>
								</div>
								<div className="box-body">
									The body of the box
								</div>
							</div>
							<div className="box box-default collapsed-box box-solid">
								<div className="box-header with-border">
									<h3 className="box-title">Custom Links</h3>
									<div className="box-tools pull-right">
									    <button type="button" className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-plus"></i>
									    </button>
									</div>
								</div>
								<div className="box-body">
									The body of the box
								</div>
							</div>
							<div className="box box-default collapsed-box box-solid">
								<div className="box-header with-border">
									<h3 className="box-title">Categories</h3>
									<div className="box-tools pull-right">
									    <button type="button" className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-plus"></i>
									    </button>
									</div>
								</div>
								<div className="box-body">
									The body of the box
								</div>
							</div>
						</div>
		                <div className="col-md-9">
		                  <div className="box box-default">
				              <div className="box-header with-border attachment-block clearfix">
				                <div className="container-fluid">
				                  <div className="row">
				                    <div className="col-xs-12">
				                      <div className="row">
				                    	<div className="col-xs-3">
				                    		<h5><b>Select a menu to edit :</b></h5>
				                    	</div>
				                    	<div className="col-md-7">
										   <div className="form-group">
											<select className="form-control">
											  {this.state.pageList}
											</select>
										  </div>
										</div>
				                  	  </div>
				                    </div>
				                  </div>
					    		</div>
					    	  </div>
					      </div>
					      <div className="box box-default">
							<div className="box-header with-border attachment-block clearfix">
								<div className="form-group">
									<div className="col-md-2">
										<h4>Menu Name :</h4>
									</div>
									<div className="col-md-6">
										<input type="text" name="name" className="form-control" />
									</div>
									<div className="col-md-4">
										<div className="box-tools pull-right">
										<button className="btn btn-flat btn-primary">Save Menu</button>
										</div>
									</div>
								</div>
							</div>
								<div class="box-body">
									<section className="content">
										<h4>Menu Structure</h4>
										<p>Drag each item into the order you prefer. Click the arrow on the right of the item to reveal additional configuration options.</p>
										<div className="row">
									        <div className="col-md-6">
									          <div className="box box-default collapsed-box box-solid">
									            <div className="box-header with-border">
									              <h3 className="box-title">Home</h3>

									              <div className="box-tools pull-right">
									                <button type="button" className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-plus"></i>
									                </button>
									              </div>
									            </div>
									            <div className="box-body">
									              The body of the box
									            </div>
									          </div>
									        </div>
									    </div>
									    <div style={{borderBottom:"#eee" , borderBottomStyle:"groove", borderWidth:2, marginTop: 5, marginBottom: 20}}></div>
										<h4>Menu Settings</h4>
										<div className="row">
											<div className="col-md-3">
												<i>Auto add pages</i>
											</div>
											<div className="col-md-9">
												<div className="checkbox">
								                    <label>
								                      <input type="checkbox"/>
								                      Automatically add new top-level pages to this menu
								                    </label>
								                </div>
											</div>
										</div>
										<div className="row">
											<div className="col-md-3">
												<i>Display location</i>
											</div>
											<div className="col-md-9">
												<div className="checkbox">
								                    <label>
								                      <input type="checkbox"/>
								                      Top Menu
								                    </label>
								                </div>
								                <div className="checkbox">
								                    <label>
								                      <input type="checkbox"/>
								                      Social Links Menu
								                    </label>
								                </div>
											</div>
										</div>
			<div>	
				<select class="form-control">
                    {this.state.pageList}
                </select>
			</div>
									</section>
								</div>
								<div className="box-header with-border attachment-block clearfix">
								<div className="form-group">
									<div className="col-md-6">
										<button className="btn btn-flat btn-danger">Delete Menu</button>
									</div>
									<div className="col-md-6">
										<div className="box-tools pull-right">
										<button className="btn btn-flat btn-primary">Save Menu</button>
										</div>
									</div>
								</div>
							</div>
						  </div>
		                </div>
		            </div>
          	  </div>
		    </div>
		)
	}
});

export default Menu;