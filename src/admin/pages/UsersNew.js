import React from 'react';
import _ from 'lodash';
import ReactPasswordStrength from 'react-password-strength';
import Dropzone from 'react-dropzone';
import { default as swal } from 'sweetalert2';
import DateTime from 'react-datetime';
import TimezonePicker from 'react-bootstrap-timezone-picker';
import CountrySelect from '../lib/CountrySelect';
import Notification from 'react-notification-system';
import Halogen from 'halogen';

import Query from '../query';
import AdminConfig from '../AdminConfig';
import {riques, getValue, setValue, errorCallback, disableForm, getConfig, defaultHalogenStyle} from '../../utils';

var NewUser = React.createClass({
	getInitialState: function(){
		var image = getConfig('rootUrl')+"/images/avatar-default.png";
		
		return {
			avatar: image,
			passwordActive: false,
			mode: this.props.userId?"update":"create",
			roleList: [],
			userRole: null,
			classDivUsername:"form-group",
			classInputUsername:"form-control",
			classDivEmail:"form-group",
			classInputEmail:"form-control",
			usernameTextBlock:"The short unique name describes you",
			emailTextBlock:"",
			userMetaList: AdminConfig.userMetaList,
			timezone: "",
			country: "",
			dateOfBirth: "",
			isAdmin: false,
			isProcessing: false,
      opacity: 1,
      checkingUsername: false,
      checkingEmail: false
		}
	},
	loadData: function(){
		var me = this;
		this.maskArea(true);
		riques(Query.getUserQry(this.props.userId),
			function(error, response, body){
				if (!error && !body.errors) {
          var values = body.data.getUser;
          me.setFormValues(values);
          me.maskArea(false);
        } else {
        	errorCallback(error, body.errors?body.errors[0].message:null);
        }
			}
		);
	},
	setFormValues: function(v){
		var me = this;
		setValue("name", v.fullName);
		setValue("username", v.username);
		setValue("email", v.email);
		setValue("gender", v.gender);
		//setValue("dateOfBirth", v.dateOfBirth);
		var dateOfBirth = "";
		if (v.dateOfBirth && v.dateOfBirth!=="") 
			dateOfBirth = new Date(v.dateOfBirth)
		
		this.setState({dateOfBirth: dateOfBirth});
		setValue("country", v.country);

		_.forEach(this.state.userMetaList, function(item){
			var i = _.find(v.meta.edges, {"node": {"item": item}});
			if (i){
				if (item==="timezone"){
					me.setState({timezone: i.node.value});
				} else {
					setValue(i.node.item, i.node.value);
				}
			}
		})

		if (v.image) this.setState({avatar: v.image});
		
		if (v.roles.edges.length>0){
			var roles = _.map(v.roles.edges, function(item){
				return item.node.id
			});
			
			if (roles.length>0) {
				this.setState({userRole: roles[0]});
				document.getElementById("role").value = roles[0];
			}
			
		}

		var p = JSON.parse(localStorage.getItem("profile"));

		var isAdmin = (_.indexOf(p.roles, "Admin") > -1);
		this.setState({isAdmin: isAdmin});
		_.forEach(document.getElementsByTagName('roles[]'), function(el){ el.disabled = !isAdmin;})
	},
	disableForm: function(state){
		disableForm(state, this.notification);
		this.maskArea(state);
	},
	maskArea: function(state){
  	this.setState({isProcessing: state, opacity: state?0.4:1});
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
		//var birth = getValue("birth");
		var dateOfBirth = this.state.dateOfBirth;
		var phone = getValue("phone");
		var country = getValue("country");
		//var timezone = getValue("timezone");
		var timezone = this.state.timezone;
		var website = getValue("website");
		var facebook = getValue("facebook");
		var twitter = getValue("twitter");
		var linkedin = getValue("linkedin");
		var password = getValue("new-password");
		var oldPassword = getValue("old-password");
    var repassword = getValue("new-password-2");
    var changePassword = false;

		var qry = '';
		if (this.state.mode==="update"){
			if (password) {
	    	if (!oldPassword) {
	    		swal('Failed!', 'Please fill your old password', 'warning')
		    	return;
	    	}
	    	if (password!==repassword) {
		    	swal('Failed!', 'Password is not match', 'warning')
		    	return;
		    }
		    changePassword = true;
	    }

			qry = Query.saveProfileMtn({userId: this.props.userId, name: name, gender: gender, image: image, country: country, dateOfBirth: dateOfBirth});
		} else {
			if (!password) {
    		swal('Failed!', 'Please fill your password', 'warning')
	    	return;
    	}
    		
    	if (password!==repassword) {
	    	swal('Failed!', 'Password is not match', 'warning')
	    	return;
	    }
			qry = Query.createUserMtn(username, password, email, name, gender, country, dateOfBirth)
		}

		this.disableForm(true);
		
		riques(qry, 
			function(error, response, body){
				if(!error && !body.errors) {
					var p;

					if (me.state.mode==="update")
						p = body.data.updateUser.changedUser;
					else
						p =body.data.createUser.changedUser;
					//me.setState({avatar: p.image})
	        //me.setProfile(p);
	        var here = me;

	        var isMetaEmpty = (bio+website+facebook+twitter+linkedin+timezone+phone)==='';

	        if (!here.checkUsername(username)) swal('Failed!', 'Username already exist', 'warning')
	        if (!here.checkEmail(email)) swal('Failed!', 'Email already exist', 'warning')
          if (isMetaEmpty) {
          	if (me.state.mode==="create")
          		me.resetForm();
          	else
          		me.notification.removeNotification('saving');
          }	else {
		        var userMetaData0 = {
		          	"bio": bio,
		          	"website": website,
		          	"facebook": facebook,
		          	"twitter": twitter,
		          	"linkedin": linkedin,
		          	"timezone": timezone,
		          	"phone": phone
		        };

	      		var existMetaList = _.map(p.meta.edges, function(item){ return item.node.item });
	          var qry = Query.createUpdateUserMetaMtn(p.id, existMetaList,userMetaData0);
	          
	          riques(qry, 
							function(error, response, body){
								if(!error && !body.errors) {
									var metaList = [];
									_.forEach(body.data, function(item){
										metaList.push(item.changedUserMeta);
									});
									
									if (metaList.length>0) {
										
									}
								} else {
									errorCallback(error, body.errors?body.errors[0].message:null);
								}
								if (here.state.mode==="create")
		          		here.resetForm();
		          	else 
		          		here.disableForm(false);
							}
						);
						
	        }
				} else {
					errorCallback(error, body.errors?body.errors[0].message:null);
				}
			}
		);
		

		// Change password
		if (changePassword) {
			riques(Query.changePasswordMtn(oldPassword, password), 
				function(error, response, body){
					if(!error && !body.errors) {
						me.notification.addNotification({
							message: 'Password changed',
							level: 'success',
							position: 'tr',
							autoDismiss: 5
						})
					} else {
						errorCallback(error, body.errors?body.errors[0].message:null);
					}
				}
			);
		}

		var role = getValue("role");
		if (this.state.userRole !== role)
			this.handleRoleChange(this.state.userRole, role);
	},
	handleGeneratePassword: function(event){
		event.preventDefault();
		var Password = require('node-password').Password;
		var pw = new Password();
		setValue("new-password", pw);
		setValue("new-password-2", pw);

		document.getElementById("togglePassword").checked = true;
		document.getElementById("new-password").setAttribute("type","text");
	},
	handleShowPassword: function(event){
		var checked = event.target.checked;
		if (checked)
			document.getElementById("new-password").setAttribute("type","text")
		else
			document.getElementById("new-password").setAttribute("type","password")
	},
	handleDateChange: function(date){
	    this.setState({dateOfBirth: new Date(date)});
	},
	handleRoleChange: function(role1, role2){
		var qry = '';

		if (role1) {
			qry = Query.updateRoleUser(this.props.userId, role1, role2, "admin");
		} else {
			qry = Query.addRoleToUser(this.props.userId, role2, "admin");
		}
		var me = this;

   	riques(qry, 
			function(error, response, body){
				if(!error && !body.errors) {
					var here = me;
					me.notification.addNotification({
							message: 'Role updated',
							level: 'success',
							position: 'tr',
							autoDismiss: 2
						})
					here.disableForm(false);
				} else {
					errorCallback(error, body.errors?body.errors[0].message:null);
					me.disableForm(false);
				}
				me.notification.removeNotification('saving');
			}, this.state.isAdmin
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
	handleTimezoneChange: function(tz){
		this.setState({timezone: tz});
	},
	handlePasswordChange: function(event){
		var password = getValue("new-password");
		if (password) {
			this.setState({passwordActive: true})
		} else {
			this.setState({passwordActive: false})
		}
	},
	handleBirthDateChange: function(date){
	 	this.setState({dateOfBirth: date});
	},
	componentDidMount: function(){
		require ('react-bootstrap-timezone-picker/dist/react-bootstrap-timezone-picker.min.css');
		require ('react-datetime/css/react-datetime.css');
		this.notification = this.refs.notificationSystem;
		var me = this;
		riques( Query.getRolesQry,
		function(error, response, body){
			if (body.data) {
          var here = me;
          var roleList = me.state.roleList;
          for (var i=1;i < body.data.viewer.allRoles.edges.length; i++) {
          	var item = body.data.viewer.allRoles.edges[i];
          	roleList.push({id: item.node.id, name: item.node.name});
          }
          here.setState({roleList: roleList});
          if (me.state.mode==="update") {
			  		me.loadData();
			  	}
        }
		});
  },
  resetForm: function(){
    document.getElementById("profileForm").reset();
    document.getElementsByName("new-password").value = null;
    _.forEach(document.getElementsByTagName('input'), function(el){ el.value = null;})
    
    this.setState({
			passwordActive: false,
			mode: "create",
			timezone: "",
			country: "",
			dateOfBirth: ""
		});
    window.history.pushState("", "", '/admin/users/new');
  },
	handleAddNewBtn: function(event) {
  	this.resetForm();
	},
	checkUsername: function(username){
		var me = this;
		this.setState({checkingUsername: true});
		//this.disableForm(true);
		riques( Query.checkUsernameQry(username),
      	function(error, response, body) {
        if (!error && !body.errors && response.statusCode === 200) {
          var usernameCount = body.data.viewer.allUsers.edges.length;
          if (me.state.mode==="create") {
            if (usernameCount === 0 ){
            	me.setState({classDivUsername: "form-group has-success", classInputUsername:"form-control form-control-success", usernameTextBlock:"The short unique name describes you"});
            }
            else {
            	me.setState({classDivUsername: "form-group has-error", classInputUsername:"form-control form-control-error", usernameTextBlock:"Username already exist"});
            }
          } else {
            if (usernameCount === 0 ){
            	me.setState({classDivUsername: "form-group has-success", classInputUsername:"form-control form-control-success", usernameTextBlock:"The short unique name describes you"});
            }
            else {
            	me.setState({classDivUsername: "form-group has-error", classInputUsername:"form-control form-control-error", usernameTextBlock:"Username already exist"});
            }
          }
          me.setState({checkingUsername: false});
          me.disableForm(false);
        } else {
          errorCallback(error, body.errors?body.errors[0].message:null);
          me.disableForm(false);
        }
      }
    );
	},
	checkEmail: function(email){
		var me = this;
		me.setState({checkingEmail: true});
		//this.disableForm(true);
		riques( Query.checkEmailQry(email),
      	function(error, response, body) {
        if (!error && !body.errors && response.statusCode === 200) {
          var emailCount = body.data.viewer.allUsers.edges.length;
          if (me.state.mode==="create") {
            if (emailCount === 0 ){
            	me.setState({classDivEmail: "form-group has-success", classInputEmail:"form-control form-control-success", emailTextBlock:""});
            }
            else {
            	me.setState({classDivEmail: "form-group has-error", classInputEmail:"form-control form-control-error", emailTextBlock:"Email already exist"});
            }
          } else {
            if (emailCount === 0 ){
            	me.setState({classDivEmail: "form-group has-success", classInputEmail:"form-control form-control-success", emailTextBlock:""});
            }
            else {
            	me.setState({classDivEmail: "form-group has-error", classInputEmail:"form-control form-control-error", emailTextBlock:"Email already exist"});
            }
          }
          me.setState({checkingEmail: false});
          me.disableForm(false);
        } else {
          errorCallback(error, body.errors?body.errors[0].message:null);
          me.disableForm(false);
        }
      }
    );
	},
	handleUsernameHighlight: function(event){
		var me = this;
		var username = getValue("username");		
		me.checkUsername(username);
	},
	handleEmailHighlight: function(event){
		var me = this;
		var email = getValue("email");		
		me.checkEmail(email);
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
			        <li><a href="#" onClick={function(){this.props.handleNav('users')}.bind(this)}> Users</a></li>
			        <li className="active">Add New User</li>
			      </ol>
			      <div style={{borderBottom:"#eee" , borderBottomStyle:"groove", borderWidth:2, marginTop: 10}}></div>
			      { this.state.isProcessing &&
              <div style={defaultHalogenStyle}><Halogen.PulseLoader color="#4DAF7C"/></div>                   
            }
			    </section>
			    <Notification ref="notificationSystem" />

			    <section className="content">
			    	<div className="row">
					  	<div className="col-md-8">
					  	<section className="content">
			    			<form onSubmit={this.handleSubmitBtn} className="form-horizontal" id="profileForm" style={{opacity: this.state.opacity}}>
			    				
					  			<div className="form-group">
								  	<label htmlFor="name" className="col-md-3">Name<span style={{color:"red"}}>*</span></label>
								  	<div className="col-md-9">
										<input type="text" name="name" id="name" className="form-control" required="true"/>
										<p className="help-block">Your full name</p>
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

					  			<div className={this.state.classDivUsername}>
								  	<label htmlFor="tagline" className="col-md-3">Username<span style={{color:"red"}}>*</span></label>
								  	<div className="col-md-9">
								  		<div className="form-inline">
											<input type="text" name="username" id="username" 
												className={this.state.classInputUsername} onBlur={this.handleUsernameHighlight} disabled={this.state.mode==="update"?true:false}/>
												{ this.state.checkingUsername && <i style={{marginLeft:5}} className="fa fa-spin fa-refresh"></i>}
											</div>
											<p className="help-block">{this.state.usernameTextBlock}</p>
										</div>
								</div>

								<div className="form-group">
								  	<label htmlFor="dateOfBirth" className="col-md-3">Date of Birth</label>
								  	<div className="col-md-9">
										<DateTime 
											timeFormat={false} 
											className="datetime-input" 
											value={this.state.dateOfBirth}
											onChange={this.handleBirthDateChange}/>
									</div>
								</div>

								<div className="form-group">
								 	<label htmlFor="homeUrl" className="col-md-3">Gender</label>
								 	<div className="col-md-9">
										<select id="gender" name="gender" defaultValue="Male" style={{width: 150}}>
											<option key="" value="" >Select your gender...</option>
											<option key="male" value="Male" >Male</option>
											<option key="female" value="Female" >Female</option>
										</select> 
									</div>
								</div>

					  			<div className={this.state.classDivEmail}>
								  	<label htmlFor="keywoards" className="col-md-3">Email<span style={{color:"red"}}>*</span></label>
								  	<div className="col-md-9">
								  		<div className="form-inline">
												<input type="email" name="email" id="email" className={this.state.classInputEmail} 
													onBlur={this.handleEmailHighlight} disabled={this.state.mode==="update"?true:false} required="true"/>
												{ this.state.checkingEmail && <i style={{marginLeft:5}} className="fa fa-spin fa-refresh"></i>}
											</div>
											<p className="help-block">{this.state.emailTextBlock}</p>
									</div>
								</div>

								<div className="form-group">
								  	<label htmlFor="phone" className="col-md-3">Phone</label>
								  	<div className="col-md-9">
										<input type="text" name="phone" id="phone" className="form-control" />
									</div>
								</div>

								<div className="form-group">
								 	<label htmlFor="homeUrl" className="col-md-3">Biography</label>
								 	<div className="col-md-9">
										<textarea name="bio" id="bio" className="form-control"></textarea>
									</div>
								</div>

								<div className="form-group">
								  	<label htmlFor="country" className="col-md-3">Country</label>
								  	<div className="col-md-9">
								  	<CountrySelect id="country" name="country" />
									</div>
								</div>

								<div className="form-group">
								  	<label htmlFor="timezone" className="col-md-3">Timezone</label>
								  	<div className="col-md-9">
										<TimezonePicker
										  absolute={true}
										  style={{width: 300}}
										  placeholder="Select timezone..."
										  value={this.state.timezone}
										  onChange={this.handleTimezoneChange}
										/>
									</div>
								</div>

								<h4 style={{marginBottom: 20}}>Social Media Accounts</h4>
								<div className="form-group">
								  	<label htmlFor="website" className="col-md-3">Website</label>
								  	<div className="col-md-9">
										<input type="text" name="website" id="website" placeholder="example: www.ussunnah.com" className="form-control" />
										<p className="help-block">Your website name</p>
									</div>
								</div>

								<div className="form-group">
								  	<label htmlFor="facebook" className="col-md-3">Facebook Account</label>
								  	<div className="col-md-9">
										<input type="text" name="facebook" id="facebook" placeholder="example: www.facebook.com/ussunnah" className="form-control" />
										<p className="help-block">URL to your Facebook Page</p>
									</div>
								</div>

								<div className="form-group">
								  	<label htmlFor="twitter" className="col-md-3">Twitter Account</label>
								  	<div className="col-md-9">
										<input type="text" name="twitter" id="twitter" placeholder="example: www.twitter.com/ussunnah" className="form-control" />
										<p className="help-block">URL to your Twitter Page</p>
									</div>
								</div>

								<div className="form-group">
								  	<label htmlFor="linkedin" className="col-md-3">Linkedin Account</label>
								  	<div className="col-md-9">
										<input type="text" name="linkedin" id="linkedin" placeholder="example: www.linkedin.com/in/ussunnah" className="form-control" />
										<p className="help-block">URL to your LinkedIn Page</p>
									</div>
								</div>

								{ this.state.mode==="create" &&
								 [<h4 style={{marginBottom: 20}}>Password</h4>,
								 <div key="2" className="form-group">
									 	<label htmlFor="homeUrl" className="col-md-3">Role</label>
									 	<div className="col-md-9">
											<select name="role" id="role" className="form-control select">
												{
													this.state.roleList.map(function(item){
														return <option value={item.id}>{item.name}</option>
													})
												}
											</select>
										</div>
									</div>]
								 
								}

								{ this.state.mode==="update" &&
								 [<h4 key="1" style={{marginBottom: 20}}>Role and password</h4>,
									<div key="2" className="form-group">
									 	<label htmlFor="homeUrl" className="col-md-3">Role</label>
									 	<div className="col-md-9">
											<select name="role" id="role" className="form-control select">
												{
													this.state.roleList.map(function(item){
														return <option value={item.id}>{item.name}</option>
													})
												}
											</select>
										</div>
									</div>,
									<div key="3" className="form-group">
									 	<label htmlFor="old-password" className="col-md-3">Old password</label>
									 	<div className="col-md-9">
											<input type="password" name="old-password" id="old-password" className="form-control" style={{width:200}}/>
										</div>
									</div>
									]
								}

								<div className="form-group">
								 	<label htmlFor="new-password" className="col-md-3">Password<span style={{color:"red"}}>*</span></label>
								 	<div className="col-md-9">
								 			<ReactPasswordStrength
											  className="passwordTester"
											  style={{ width: 300, display: "inline-block" }}
											  minLength={5}
											  minScore={2}
											  changeCallback={this.handlePasswordChange}
											  scoreWords={['weak', 'poor', 'okay', 'good', 'strong']}
											  inputProps={{ name: "new-password", id:"new-password", value: "OK" }}
											  value="OK"
											/>
											<button className="btn" onClick={this.handleGeneratePassword} style={{height: 52, marginLeft: 5, marginBottom: 5}}>Generate</button>
											<div>
												<input type="checkbox" id="togglePassword" onChange={this.handleShowPassword}/> Show password
											</div>
									</div>
								</div>

								<div className="form-group">
								 	<label htmlFor="new-password-2" className="col-md-3">Re-type password<span style={{color:"red"}}>*</span></label>
								 	<div className="col-md-9">
										<input type="password" name="new-password-2" id="new-password-2" className="form-control" style={{width:200}} disabled={!this.state.passwordActive}/>
									</div>
								</div>

								<div className="form-group col-md-9">
									<span style={{color:"red"}}>*</span> <i>required</i>
								</div>
								
								<div className="form-group">
									<div className="col-md-9">
										<div className="btn-group">
											<input type="submit" value={this.state.mode==="update"?"Update User":"Add User"} className="btn btn-primary btn-sm" />
										</div>
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