import React from 'react';
import _ from 'lodash';
import ReactPasswordStrength from 'react-password-strength';
import Dropzone from 'react-dropzone';
import DateTime from 'react-datetime';
import TimezonePicker from 'react-bootstrap-timezone-picker';
import CountrySelect from '../lib/CountrySelect';
import Notification from 'react-notification-system';
import Halogen from 'halogen';

import Query from '../query';
import AdminConfig from '../AdminConfig';
import Config from '../../rendact.config.json';
import {riques, getValue, setValue, errorCallback, disableForm, getConfig, defaultHalogenStyle, swalert} from '../../utils';
import {connect} from 'react-redux'
import {reduxForm, Field, formValueSelector} from 'redux-form'
import gql from 'graphql-tag'
import {graphql, withApollo} from 'react-apollo'

const required = value => (value ? undefined : 'Required')
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined
const maxLength15 = maxLength(15)
export const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined
export const minLength2 = minLength(2)
const number = value =>
  value && isNaN(Number(value)) ? 'Must be a number' : undefined
const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined
const minValue18 = minValue(18)
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined
const facebook = value =>
	value && !/(?:(?:http|https):\/\/)?(?:www.)?facebook.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[?\w\-]*\/)?(?:profile.php\?id=(?=\d.*))?([\w\-]*)?/.test(value)
		? 'Invalid facebook address'
		: undefined
const tooOld = value =>
  value && value > 65 ? 'You might be too old for this' : undefined
const aol = value =>
  value && /.+@aol\.com/.test(value)
    ? 'Really? You still use AOL for your email?'
    : undefined
const alphaNumeric = value =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? 'Only alphanumeric characters'
    : undefined
const phoneNumber = value =>
  value && !/^(0|[1-9][0-9]{9})$/i.test(value)
    ? 'Invalid phone number, must be 10 digits'
    : undefined

const renderField = ({
  input,
  label,
  type,
  className,
  style,
  meta: { touched, error, warning }
}) =>
  <div>
    <input {...input} placeholder={label} type={type} className={className} style={style} />
    {touched &&
      ((error &&
        <p className="help-block" style={{color: "red"}}>
          {error}
        </p>) ||
        (warning &&
          <p className="help-block" style={{color: "red"}}>
            {warning}
          </p>))}
  </div>

let NewUser = React.createClass({
	propTypes: {
    isLoading: React.PropTypes.bool.isRequired,
    opacity: React.PropTypes.number.isRequired,
  },
  getDefaultProps: function() {
  	var image = getConfig('rootUrl')+"/images/avatar-default.png";
    return {
			isLoading: false,
      opacity: 1,
			avatar: image,
			passwordActive: false,
			mode: "",
			roleList: [],
			userRole: null,
			usernameTextBlock:"The short unique name describes you",
			nameTextBlock:"Your full name",
			emailTextBlock:"",
			websiteTextBlock:"Your website name",
			facebookTextBlock:"URL to your facebook page",
			twitterTextBlock:"URL to your twitter page",
			linkedinTextBlock:"URL to your linkedin page",
			userMetaList: AdminConfig.userMetaList,
			timezone: "",
			country: "",
			dateOfBirth: "",
			isAdmin: false,
			isProcessing: false,
      opacity: 1,
      checkingUsername: false,
      checkingEmail: false,
      hasErrors: false
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

		_.forEach(this.props.userMetaList, function(item){
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
		var image = this.props.avatar;
		var bio = getValue("bio");
		//var birth = getValue("birth");
		var dateOfBirth = this.props.dateOfBirth;
		var phone = getValue("phone");
		var country = getValue("country");
		//var timezone = getValue("timezone");
		var timezone = this.props.timezone;
		var website = getValue("website");
		var facebook = getValue("facebook");
		var twitter = getValue("twitter");
		var linkedin = getValue("linkedin");
		var password = getValue("new-password");
		var oldPassword = getValue("old-password");
    var repassword = getValue("new-password-2");
    var changePassword = false;

    if (this.props.hasErrors) {
  		swalert('error','Failed!', 'There are some errors in the form')
    	return;
  	}

		var qry = '';
		if (this.props.mode==="update"){
			if (password) {
	    	if (!oldPassword) {
	    		swalert('error','Failed!', 'Please fill your old password')
		    	return;
	    	}
	    	if (password!==repassword) {
		    	swalert('error','Failed!', 'Password is not match')
		    	return;
		    }
		    changePassword = true;
	    }

			qry = Query.saveProfileMtn({userId: this.props.userId, name: name, gender: gender, image: image, country: country, dateOfBirth: dateOfBirth});
		} else {
			if (!password) {
    		swalert('error','Failed!', 'Please fill your password')
	    	return;
    	}
    		
    	if (password!==repassword) {
	    	swalert('error','Failed!', 'Password is not match')
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

	        if (isMetaEmpty) {
          	if (me.state.mode==="create")
          		me.resetForm();
          	else
          		me.notification.removeNotification('saving');
          	me.disableForm(false);
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
						});
						disableForm(false);
					} else {
						errorCallback(error, body.errors?body.errors[0].message:null);
					}
				}
			);
		}

		var role = getValue("role");
		if (this.props.userRole !== role)
			this.handleRoleChange(this.props.userRole, role);
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
			}, this.props.isAdmin
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
          for (var i=0;i < body.data.viewer.allRoles.edges.length; i++) {
          	var item = body.data.viewer.allRoles.edges[i];
          	if (item.node.name==="Owner" && !Config.adminMode)
          		continue;
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
		if (username.length<4){
			this._markUsernameError("Username is too short! Make sure it has minimum 4 characters");
			return;
		}
		var usernameRegex = /^[a-zA-Z0-9]+$/;
		if(!usernameRegex.test(username)) {
			this._markUsernameError("Username is invalid, only letters and numbers allowed");
			return;
		}

		this.setState({checkingUsername: true});
		//this.disableForm(true);
		riques( Query.checkUsernameQry(username),
      	function(error, response, body) {
        if (!error && !body.errors && response.statusCode === 200) {
          var usernameCount = body.data.viewer.allUsers.edges.length;
          if (me.state.mode==="create") {
            if (usernameCount === 0 ){
            	me._markUsernameSuccess();
            }
            else {
            	me._markUsernameError("Username is already exists");
            }
          } else {
            if (usernameCount === 0 ){
            	me._markUsernameSuccess();
            }
            else {
            	me._markUsernameError("Username is already exists");
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
		var email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
		if(!email_regex.test(email)) {
			this._markEmailError("Email is invalid");
			return
		}

		me.setState({checkingEmail: true});
		//this.disableForm(true);
		riques( Query.checkEmailQry(email),
      	function(error, response, body) {
        if (!error && !body.errors && response.statusCode === 200) {
          var emailCount = body.data.viewer.allUsers.edges.length;
          if (me.state.mode==="create") {
            if (emailCount === 0 ){
            	me._markEmailSuccess();
            }
            else {
            	me._markEmailError("Email is already exists");
            }
          } else {
            if (emailCount === 0 ){
            	me._markEmailSuccess();
            }
            else {
            	me._markEmailError("Email is already exists");
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
	checkName: function(name){
		if (name.length<4){
			this._markNameError("Name is too short! Make sure it has minimum 4 characters");
			return;		
		}
		else{
			this._markNameSuccess();
			return;
		}

	},
	checkPhone: function(phone){
		var phoneRegex = /^[0-9-+]+$/;
	},
	checkBio: function(bio){
		if(bio.length > 100) {
			
		}
	},
	checkWebsite: function(website){
		var websiteRegex = /^[a-zA-Z0-9._-]+$/;
		if(!websiteRegex.test(website)) {
			this._markWebsiteError("Website is invalid, no regular expression allowed");
			return;
		}
		else{
			this._markWebsiteSuccess();
			return;
		}
	},
	checkFacebook: function(facebook){
		var facebookRegex = /(?:(?:http|https):\/\/)?(?:www.)?facebook.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[?\w\-]*\/)?(?:profile.php\?id=(?=\d.*))?([\w\-]*)?/;

		if(!facebookRegex.test(facebook)) {
			this._markFacebookError("Facebook is invalid, have wrong regular expression");
			return;
		}
		else{
			this._markFacebookSuccess();
			return;
		}
	},
	checkTwitter: function(twitter){	
		var twitterRegex = /(?:(?:http|https):\/\/)?(?:www.)?twitter.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[?\w\-]*\/)?(?:profile.php\?id=(?=\d.*))?([\w\-]*)?/;
		if(!twitterRegex.test(twitter)) {
			this._markTwitterError("Twitter is invalid, have wrong regular expression");
			return;
		}
		else{
			this._markTwitterSuccess();
			return;
		}
	},
	checkLinkedin: function(linkedin){
		var linkedinRegex = /(?:(?:http|https):\/\/)?(?:www.)?linkedin.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[?\w\-]*\/)?(?:profile.php\?id=(?=\d.*))?([\w\-]*)?/;
		if(!linkedinRegex.test(linkedin)) {
			this._markLinkedinError("Linkedin is invalid, have wrong regular expression");
			return;
		}
		else{
			this._markLinkedinSuccess();
			return;
		}
	},
	render: function(){		
		return (
			<div className="content-wrapper">
				<div className="container-fluid">
				<section className="content-header" style={{marginBottom:20}}>
			      <h1>
			        {this.props.mode==="update"?"Edit User":"Add New User"}
              { this.props.mode==="update" &&
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
			      { this.props.isProcessing &&
              <div style={defaultHalogenStyle}><Halogen.PulseLoader color="#4DAF7C"/></div>                   
            }
			    </section>
			    <Notification ref="notificationSystem" />

			    <section className="content">
			    	<div className="row">
					  	<div className="col-md-8">
					  	<section className="content">
			    			<form onSubmit={this.props.handleSubmit(this.handleSubmitBtn)} className="form-horizontal" id="profileForm" style={{opacity: this.props.opacity}}>
			    				
					  			<div className="form-group">
								  	<label htmlFor="name" className="col-md-3">Name<span style={{color:"red"}}>*</span></label>
								  	<div className="col-md-9">
								  	<Field name="name" component={renderField} type="text" className="form-control" className="form-control" validate={[required]} required="true"/>
										<p className="help-block">{this.props.nameTextBlock}</p>
									</div>
								</div>

								<div className="form-group">
							  	<label htmlFor="name" className="col-md-3">Picture</label>
							  	<div className="col-md-9">
									<Dropzone onDrop={this.handleImageDrop}>
										<div className="avatar-container">
				             	<img src={this.props.avatar} alt='' id="avatar"/> 
										  <div className="avatar-overlay"></div>
										  <div className="avatar-button"><a href="#"> Change </a></div>
										</div>
			            </Dropzone>
								</div>
								</div>

					  			<div className="form-group">
								  	<label htmlFor="tagline" className="col-md-3">Username<span style={{color:"red"}}>*</span></label>
								  	<div className="col-md-9">
								  		<div className="form-inline">
								  		<Field name="username" component={renderField} type="text" className="form-control" className="form-control" validate={[required, maxLength15]} disabled={this.props.mode==="update"?true:false}/>
											{ this.props.checkingUsername && <i style={{marginLeft:5}} className="fa fa-spin fa-refresh"></i>}
											</div>
											<p className="help-block">{this.props.usernameTextBlock}</p>
										</div>
								</div>

								<div className="form-group">
								  	<label htmlFor="dateOfBirth" className="col-md-3">Date of Birth</label>
								  	<div className="col-md-9">
										<DateTime 
											timeFormat={false} 
											className="datetime-input" 
											value={this.props.dateOfBirth}
											onChange={this.handleBirthDateChange}/>
									</div>
								</div>

								<div className="form-group">
								 	<label htmlFor="homeUrl" className="col-md-3">Gender</label>
								 	<div className="col-md-9">
										<Field name="gender" component="select" style={{width: 150}}>
											<option key="" value="" >Select your gender...</option>
											<option key="male" value="Male" >Male</option>
											<option key="female" value="Female" >Female</option>
										</Field> 
									</div>
								</div>

					  			<div className="form-group">
								  	<label htmlFor="email" className="col-md-3">Email<span style={{color:"red"}}>*</span></label>
								  	<div className="col-md-9">
								  		<div className="form-inline">
								  			<Field name="email" component={renderField} type="text" className="form-control" 
													validate={[required, email]} disabled={this.props.mode==="update"?true:false} required="true"/>
												{ this.props.checkingEmail && <i style={{marginLeft:5}} className="fa fa-spin fa-refresh"></i>}
											</div>
											<p className="help-block">{this.props.emailTextBlock}</p>
									</div>
								</div>

								<div className="form-group">
								  	<label htmlFor="phone" className="col-md-3">Phone</label>
								  	<div className="col-md-9">
								  	<Field name="phone" component={renderField} type="text" validate={[phoneNumber]} className="form-control" />
									</div>
								</div>

								<div className="form-group">
								 	<label htmlFor="bio" className="col-md-3">Biography</label>
								 	<div className="col-md-9">
								 		<Field id="content" name="bio" component="textarea" wrap="hard" type="textarea" className="form-control" />
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
										  value={this.props.timezone}
										  onChange={this.handleTimezoneChange}
										/>
									</div>
								</div>

								<h4 style={{marginBottom: 20}}>Social Media Accounts</h4>
								<div className="form-group">
								  	<label htmlFor="website" className="col-md-3">Website</label>
								  	<div className="col-md-9">
								  	<Field name="website" component={renderField} type="text" className="form-control"  placeholder="example: www.ussunnah.com" className="form-control" />
										<p className="help-block">{this.props.websiteTextBlock}</p>
									</div>
								</div>

								<div className="form-group">
								  	<label htmlFor="facebook" className="col-md-3">Facebook Account</label>
								  	<div className="col-md-9">
								  	<Field name="facebook" component={renderField} type="text" validate={[facebook]} className="form-control"  placeholder="example: www.facebook.com/ussunnah"/>
										<p className="help-block">{this.props.facebookTextBlock}</p>
									</div>
								</div>

								<div className="form-group">
								  	<label htmlFor="twitter" className="col-md-3">Twitter Account</label>
								  	<div className="col-md-9">
								  	<Field name="twitter" component={renderField} type="text" className="form-control" placeholder="example: www.twitter.com/ussunnah" className="form-control" />
										<p className="help-block">{this.props.twitterTextBlock}</p>
									</div>
								</div>

								<div className="form-group">
								  	<label htmlFor="linkedin" className="col-md-3">Linkedin Account</label>
								  	<div className="col-md-9">
								  	<Field name="linkedin" component={renderField} type="text" placeholder="example: linkedin.com/in/ussunnah" className="form-control" />
										<p className="help-block">{this.props.linkedinTextBlock}</p>
									</div>
								</div>

								{ this.props.mode==="create" &&
								 [<h4 key="1" style={{marginBottom: 20}}>Password</h4>,
								 <div key="2" className="form-group">
									 	<label htmlFor="homeUrl" className="col-md-3">Role</label>
									 	<div className="col-md-9">
											<Field name="role" component="select" className="form-control select">
												{
													this.props.roleList.map(function(item){
														return <option key={item.id} value={item.id}>{item.name}</option>
													})
												}
											</Field>
										</div>
									</div>]
								 
								}

								{ this.props.mode==="update" &&
								 [<h4 key="1" style={{marginBottom: 20}}>Role and password</h4>,
									<div key="2" className="form-group">
									 	<label htmlFor="homeUrl" className="col-md-3">Role</label>
									 	<div className="col-md-9">
									 		<Field name="role" component="select" className="form-control select">
												{
													this.props.roleList.map(function(item){
														return <option key={item.id} value={item.id}>{item.name}</option>
													})
												}
											</Field>
										</div>
									</div>,
									<div key="3" className="form-group">
									 	<label htmlFor="old-password" className="col-md-3">Old password</label>
									 	<div className="col-md-9">
									 		<Field name="old-password" component={renderField} type="password" className="form-control" style={{width:300}}/>
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
								 		<Field name="new-password-2" component={renderField} type="password" className="form-control" style={{width:300}} disabled={!this.props.passwordActive}/>
									</div>
								</div>

								<div className="form-group col-md-9">
									<span style={{color:"red"}}>*</span> <i>required</i>
								</div>
								
								<div className="form-group">
									<div className="col-md-9">
										<div className="btn-group">
											<input type="submit" value={this.props.mode==="update"?"Update User":"Add User"} className="btn btn-primary btn-sm" />
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

const selector = formValueSelector('userNewForm')

const mapStateToProps = function(state){
  if (!_.isEmpty(state.userNew)) {
    return _.head(state.userNew)
  } else return {}
}

NewUser = reduxForm({
  form: 'userNewForm'
})(NewUser)


NewUser = connect(mapStateToProps)(NewUser)

var getUserQry = gql`query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    username
    fullName
    gender
    image
    email
    lastLogin
    createdAt
    country
    dateOfBirth
    meta {
      edges {
        node {
          id
          item
          value
        }
      }
    }
    roles {
      edges {
        node {
          id
          name
        }
      }
    }
  }
}`
NewUser = graphql(getUserQry, {
	options : (props) => ({
    variables: {
      id: props.userId
    }
  }),
  props: ({ownProps, data}) => {
  	
    if (data.viewer) {
    	var _data = {}
    	var _idMap = {}
    	_.forEach(data.viewer.allOptions.edges, function(item){
    		_data[item.node.item] = item.node.value;
    		_idMap[item.node.item] = item.node.id;
			});
    	return {
        initialValues: _data,
        fieldIdMap: _idMap,
        mode: ownProps.userId?"update":"create"
      }
    } else {
    	return {
    		mode: ownProps.userId?"update":"create"
    	}
    }

  }
})(NewUser);

NewUser = withApollo(NewUser);

export default NewUser;