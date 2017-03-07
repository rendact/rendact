import React from 'react';
import Query from '../query';
import Config from '../../config'
import {riques, getValue, setValue} from '../../utils';
import _ from 'lodash';
import { default as swal } from 'sweetalert2';
import Dropzone from 'react-dropzone';

window.getBase64Image = function(img) {
  var canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);
  var dataURL = canvas.toDataURL("image/png");
  return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

const errorCallback = function(msg1, msg2){
  if (msg1) swal('Failed!', msg1, 'warning')
  else if (msg2) swal('Failed!', msg2, 'warning')
  else swal('Failed!', 'Unknown error','warning')
}

var NewUser = React.createClass({
	getInitialState: function(){
		var image = Config.rootUrl+"/images/avatar-default.png";
		
		return {
			isSaving: false,
			errorMsg: null,
			noticeTxt: null,
			avatar: image,
			passwordActive: false,
			mode: this.props.userId?"update":"create",
			roleList: [],
			userRole: []
		}
	},
	loadData: function(){
		var me = this;
		riques(Query.getUserQry(this.props.userId),
			function(error, response, body){
				if (!error && !body.errors) {
          var values = body.data.getUser;
          me.setFormValues(values);
        } else {
        	errorCallback(error, body.errors?body.errors[0].message:null);
        }
			}
		);
	},
	setFormValues: function(v){
		setValue("name", v.fullName);
		setValue("username", v.username);
		setValue("email", v.email);
		setValue("gender", v.gender);
		if (v.image) this.setState({avatar: v.image});
		if (v.meta.edges.length>0){
			var meta = v.meta.edges;
			_.forEach(meta, function(item){
				setValue(item.node.item, item.node.value);
			});
		}
		
		if (v.roles.edges.length>0){
			var roles = _.map(v.roles.edges, function(item){
				return item.node.id
			});
			this.setState({userRole: roles});
			var rolesInput = document.getElementsByName("roles[]");
			_.forEach(rolesInput, function(item){
				if (_.indexOf(roles, item.value) > -1) {
					item.checked = true;
				}
			});
		}
	},
	handleSubmitBtn: function(event){
		event.preventDefault();
		
		var me = this;
		var name = getValue("name");
		var username = getValue("username");
		var email = getValue("email");
		var gender = getValue("gender");
		var image = this.state.avatar;
		var bio = getValue("bio");
		var roleId = getValue("role");

		// Change password
		var oldPassword = getValue("old-password");
		var password = getValue("new-password");
    var repassword = getValue("new-password-2");
    var changePassword = false;

    if (password) {
    	if (!oldPassword) {
    		this.setState({errorMsg: "Please fill your old password"});
	    	return;
    	}
    	if (password!==repassword) {
	    	this.setState({errorMsg: "Password is not match"});
	    	return;
	    }
	    changePassword = true;
    }

		this.setState({isSaving: true});
		riques(Query.saveProfileMtn(this.props.userId, name, username, email, gender, image), 
			function(error, response, body){
				if(!error && !body.errors) {
					var p = body.data.updateUser.changedUser;
					me.setState({avatar: p.image})
          var here = me;
          var userMetaData0 = {"bio": bio};
          var qry = '';
          var userMetaData = [];

          // Save user meta
          if (p.meta.edges.length>0) {
          	_.forEach(p.meta.edges, function(item, index){
          		if (_.has(userMetaData0, item.node.item))
          			userMetaData.push({id: item.node.id, item: item.node.item, value: userMetaData0[item.node.item]});
          	});
          	qry = Query.saveUserMetaMtn(here.props.userId, userMetaData);
          } else {
          	_.forEach(userMetaData0, function(value, key){
          		userMetaData.push({item: key, value: value});
          	});
          	qry = Query.createUserMetaMtn(userMetaData);
          }
          
          riques(qry, 
						function(error, response, body){
							if(!error && !body.errors) {
								var o = _.find(body.data, "changedUserMeta");
								if (o.changedUserMeta) {
									here.setState({noticeTxt: "Profile saved"});
								}
							} else {
								errorCallback(error, body.errors?body.errors[0].message:null);
							}
							here.setState({isSaving: false});
						}
					);

				} else {
					errorCallback(error, body.errors?body.errors[0].message:null);
				}
			}
		);
		
		if (changePassword) {
			riques(Query.changePasswordMtn(oldPassword, password), 
				function(error, response, body){
					if(!error && !body.errors) {
						me.setState({noticeTxt: "Password changed"});
					} else {
						errorCallback(error, body.errors?body.errors[0].message:null);
					}
				}
			);
		}
	},
	handleRoleChange: function(event){
		debugger;
		var qry = '';
		var roleId = event.target.value;
		var checked = event.target.checked;

		if (checked) {
			qry = Query.addRoleToUser(this.props.userId, roleId, "admin");
		} else {
			qry = Query.deleteRoleUser(this.props.userId, roleId);	
		}
		var me = this;
    riques(qry, 
			function(error, response, body){
				if(!error && !body.errors) {
					me.setState({noticeTxt: "Role saved"});
				} else {
					errorCallback(error, body.errors?body.errors[0].message:null);
				}
				me.setState({isSaving: false});
			}
		);
	},
	handleImageDrop: function(accepted){
		var me = this;
		var reader = new FileReader();
    reader.onloadend = function(res) {
      var imageBase64 = res.target.result;
      me.setState({avatar: imageBase64});
    }
    reader.readAsDataURL(accepted[0]);
	},
	handlePasswordChange: function(event){
		var password = getValue("new-password");
		if (password) {
			this.setState({passwordActive: true})
		} else {
			this.setState({passwordActive: false})
		}
	},
	handleErrorMsgClose: function(){
    this.setState({errorMsg: ""});
  },
  handleNoticeClose: function(){
    this.setState({noticeTxt: ""});
  },
  componentWillMount: function(){
  	var me = this;
  	riques( Query.getRolesQry,
  		function(error, response, body){
  			if (body.data) {
            var here = me;
            var roleList = me.state.roleList;
            for (var i=1;i < body.data.viewer.allRoles.edges.length; i++) {
            	var item = body.data.viewer.allRoles.edges[i];
            	roleList.push(
            		<div className="form-group" key={item.node.id}>
            			<input type="checkbox" name="roles[]" value={item.node.id} onChange={here.handleRoleChange}/> 
            			<label style={{marginLeft: 5}}>{item.node.name}</label>
            		</div>);
            }
            here.setState({roleList: roleList});
          }
  		}
  	);
  },
  componentDidMount: function(){
  	if (this.state.mode==="update") {
	  	this.loadData();
	  }
  },
	render: function(){
		return (
			<div className="content-wrapper">
				<div className="container-fluid">
				<section className="content-header" style={{marginBottom:20}}>
			      <h1>
			        {this.state.mode==="update"?"Edit User":"Add New User"}
              { this.state.mode==="update" &&
                <small style={{marginLeft: 5}}>
                  <button className="btn btn-default btn-primary add-new-post-btn" onClick={this.handleAddNewBtn}>Add new</button>
                </small>
              }
			      </h1>
			      <ol className="breadcrumb">
			        <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
			        <li className="active">Profile</li>
			      </ol>
			    </section>

			    { this.state.errorMsg &&
            <div className="alert alert-danger alert-dismissible">
              <button type="button" className="close" onClick={this.handleErrorMsgClose}>×</button>
              {this.state.errorMsg}
            </div>
          }
          { this.state.noticeTxt &&
            <div className="alert alert-info alert-dismissible">
              <button type="button" className="close" onClick={this.handleNoticeClose}>×</button>
              {this.state.noticeTxt}
            </div>
          }

			    <section className="content">
			    	<div className="row">
					  	<div className="col-md-8">
					  	<section className="content">
			    			<form onSubmit={this.handleSubmitBtn} className="form-horizontal" id="profileForm">
			    			
					  			<div className="form-group">
								  	<label htmlFor="name" className="col-md-3">Name</label>
								  	<div className="col-md-9">
										<input type="text" name="name" id="name" className="form-control" required="true"/>
										<p className="help-block">Your great full name</p>
									</div>
								</div>

								<div className="form-group">
							  	<label htmlFor="name" className="col-md-3">Picture</label>
							  	<div className="col-md-9">
									<Dropzone onDrop={this.handleImageDrop}>
										<div className="avatar-container">
				              <img src={this.state.avatar} alt='' id="avatar"/> 
										  <div className="avatar-overlay"></div>
										  <div className="avatar-button"><a href="#"> Change </a></div>
										</div>
			            </Dropzone>
								</div>
								</div>

					  			<div className="form-group">
								  	<label htmlFor="tagline" className="col-md-3">Username</label>
								  	<div className="col-md-9">
										<input type="text" name="username" id="username" className="form-control" required="true"/>
										<p className="help-block">The short unique name describes you</p>
									</div>
								</div>

					  			<div className="form-group">
								  	<label htmlFor="keywoards" className="col-md-3">Email</label>
								  	<div className="col-md-9">
										<input type="text" name="email" id="email" className="form-control" disabled/>
									</div>
								</div>

					  		<div className="form-group">
								 	<label htmlFor="homeUrl" className="col-md-3">Gender</label>
								 	<div className="col-md-9">
										<select id="gender" name="gender" defaultValue="Male" style={{width: 150}}>
											<option key="male" value="Male" >Male</option>
											<option key="female" value="Female" >Female</option>
										</select> 
									</div>
								</div>

								<div className="form-group">
								 	<label htmlFor="homeUrl" className="col-md-3">Biography</label>
								 	<div className="col-md-9">
										<textarea name="bio" id="bio" className="form-control"></textarea>
									</div>
								</div>

								<h4 style={{marginBottom: 20}}>Role and password</h4>
								<div className="form-group">
								 	<label htmlFor="homeUrl" className="col-md-3">Role</label>
								 	<div className="col-md-9">
										{this.state.roleList}
									</div>
								</div>

								<div className="form-group">
								 	<label htmlFor="old-password" className="col-md-3">Old password</label>
								 	<div className="col-md-9">
										<input type="password" name="old-password" id="old-password" className="form-control" style={{width:200}}/>
									</div>
								</div>

								<div className="form-group">
								 	<label htmlFor="new-password" className="col-md-3">New password</label>
								 	<div className="col-md-9">
										<input type="password" name="new-password" id="new-password" className="form-control" onChange={this.handlePasswordChange} style={{width:200}}/>
									</div>
								</div>

								<div className="form-group">
								 	<label htmlFor="new-password-2" className="col-md-3">Re-type new password</label>
								 	<div className="col-md-9">
										<input type="password" name="new-password-2" id="new-password-2" className="form-control" style={{width:200}} disabled={!this.state.passwordActive}/>
									</div>
								</div>
								
								<div className="form-group">
									<div className="col-md-9">
										<div className="btn-group">
											<input type="submit" value={this.state.mode==="update"?"Save":"Add"} className="btn btn-primary" />
										</div>
										{ this.state.isSaving &&
											<p>Saving...</p>
										}
									</div>
								</div>
							</form>
						</section>
					  	</div>
					</div>
					
			    </section>

			    </div>
		    </div>
		)
	}
});

export default NewUser;