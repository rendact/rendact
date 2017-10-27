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
import {maskArea, setTimezone, setPasswordActive, setDateOfBirth, setAvatar, checkingUsername, checkingMail, resetForm} from '../../actions'
import {reduxForm, Field, formValueSelector} from 'redux-form'
import gql from 'graphql-tag'
import {graphql, withApollo} from 'react-apollo'

const required = value => (value ? undefined : 'Required')
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined
const maxLength15 = maxLength(15)
const maxLength100 = maxLength(100)
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

const renderSelect = ({
  input,
  label,
  className,
  style,
  meta: { touched, error, warning },
  children
}) =>
  <div>
    <select {...input} placeholder={label}  className={className} style={style} >
      {children}
    </select>
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
	disableForm: function(state){
		disableForm(state, this.notification);
		this.props.dispatch(maskArea(state));
	},
	handleSubmitBtn: function(v){
		var me = this;
		var image = this.props.avatar;
		var dateOfBirth = this.props.dateOfBirth.format();
		var changePassword = false;

    if (this.props.hasErrors) {
  		swalert('error','Failed!', 'There are some errors in the form')
    	return;
  	}

		var qry = '';
		if (this.props.mode==="update"){
			if (v["new-password"]) changePassword = true;
			qry = Query.saveProfileMtn({userId: this.props.userId, name: v.name, gender: v.gender, image: v.image, country: v.country, dateOfBirth: dateOfBirth});
		} else {
			qry = Query.createUserMtn(v.username, v["new-password-2"], v.email, v.name, v.gender, v.country, dateOfBirth)
			// qry = Query.createUserMtn(v.username, v["new-password"], v.name, v.gender, v.country, dateOfBirth)	
		}


		this.disableForm(true);
		this.props.client.mutate({
			mutation: gql`${qry.query}`,
			variables: qry.variables
		}).then( ({data}) => {
			// me.disableForm(true);
			var p = me.props.mode==="update"?data.updateUser.changedUser:data.createUser.changedUser;
			var here = me;

      var isMetaEmpty = (v.bio+v.website+v.facebook+v.twitter+v.linkedin+v.timezone+v.phone)==='';

      if (isMetaEmpty) {
      	if (me.props.mode==="create")
      		me.resetForm();
      	else
      		me.notification.removeNotification('saving');
      	me.disableForm(false);
      }	else {
        var userMetaData0 = {
          	"bio": v.bio,
          	"website": v.website,
          	"facebook": v.facebook,
          	"twitter": v.twitter,
          	"linkedin": v.linkedin,
          	"timezone": v.timezone,
          	"phone": v.phone
        };

    		var existMetaList = _.map(p.meta.edges, function(item){ return item.node.item });
        var qry2 = Query.createUpdateUserMetaMtn(p.id, existMetaList,userMetaData0);
        
        me.props.client.mutate({
        	mutation: gql`${qry2.query}`,
        	variables: qry2.variables
        }).then( data => {
        	var metaList = [];
					_.forEach(data, function(item){
						metaList.push(item.changedUserMeta);
					});
					if (here.props.mode==="create")
        		here.resetForm();
        	else 
        		here.disableForm(false);
        });
      }
      me.disableForm(false);
		})
		// .catch(error => {debugger});
		
		// Change password
		var qry3 = Query.changePasswordMtn(v["old-password"], v["new-password"]);
		if (changePassword) {
			this.props.client.mutate({
				mutation: gql`${qry3.query}`,
				variables: qry3.variables
			}).then( data => {
				me.notification.addNotification({
					message: 'Password changed',
					level: 'success',
					position: 'tr',
					autoDismiss: 5
				});
				disableForm(false);
			});
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
	handleRoleChange: function(role1, role2){
		var qry = '';
		var me = this;

		if (role1) qry = Query.updateRoleUser(this.props.userId, role1, role2, "admin");
		else qry = Query.addRoleToUser(this.props.userId, role2, "admin");
		
		this.props.client.mutate({
			mutation: gql`${qry.query}`,
			variables: qry.variables
		}).then( data => {
			me.notification.addNotification({
					message: 'Role updated',
					level: 'success',
					position: 'tr',
					autoDismiss: 2
				})
			me.disableForm(false);
		});
	},
	handleImageDrop: function(accepted){
		var me = this;
		var reader = new FileReader();
    reader.onloadend = function(res) {
      var imageBase64 = res.target.result;
      me.props.dispatch(setAvatar(imageBase64))
    }
    reader.readAsDataURL(accepted[0]);
	},
	handleTimezoneChange: function(tz){
		this.props.dispatch(setTimezone(tz));
	},
	handlePasswordChange: function(event){
		var password = getValue("new-password");
		if (password) {
			this.props.dispatch(setPasswordActive(true));	
		} else {
			this.props.dispatch(setPasswordActive(false));	
		}
	},
	handleBirthDateChange: function(date){
		this.props.dispatch(setDateOfBirth(date));	
	},
  resetForm: function(){
    document.getElementById("profileForm").reset();
    document.getElementsByName("new-password").value = null;
    //_.forEach(document.getElementsByTagName('input'), function(el){ el.value = null;})
    this.props.reset();
    this.props.dispatch(resetForm())
    window.history.pushState("", "", '/admin/users/new');
  },
	handleAddNewBtn: function(event) {
  	this.resetForm();
	},
	checkUsername: function(username){
		var me = this;
		this.props.dispatch(checkingUsername(true));
		this.props.client.query({
			query: gql`${Query.checkUsernameQry(username).query}`,
			variables: Query.checkUsernameQry(username).variables
		}).then( data => {

		});
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
          this.props.dispatch(checkingUsername(false))
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

		this.props.dispatch(checkingMail(true))
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
          this.props.dispatch(checkingMail(false))
          me.disableForm(false);
        } else {
          errorCallback(error, body.errors?body.errors[0].message:null);
          me.disableForm(false);
        }
      }
    );
	},

  componentWillReceiveProps(props){
  },

	componentDidMount: function(){
		require ('react-bootstrap-timezone-picker/dist/react-bootstrap-timezone-picker.min.css');
		require ('react-datetime/css/react-datetime.css');
		this.notification = this.refs.notificationSystem;
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
                  <label htmlFor="homeUrl" className="col-md-3">Gender<span style={{color: "red"}}>*</span></label>
								 	<div className="col-md-9">
										<Field name="gender" component={renderSelect} validate={required} style={{width: 150}}>
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
								 		<Field id="content" name="bio" component="textarea" wrap="hard" type="textarea" validate={[maxLength100]} className="form-control" />
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
								 		<Field name="new-password-2" validate={required} component={renderField} type="password" className="form-control" style={{width:300}} disabled={!this.props.passwordActive}/>
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
  return state.userNew || {}
}

NewUser = reduxForm({
  form: 'userNewForm'
})(NewUser)


NewUser = connect(mapStateToProps)(NewUser)

NewUser = graphql(Query.getUserListQry, {
	options : (props) => ({
    variables: {
      id: props.userId?props.userId:""
    }
  }),
  props: ({ownProps, data}) => {
  	
    if (data.viewer) {
      var roleList = [];
      var _data = {}
      var timezone = "";
      var metaValues = {};
      var avatar = "";
      var userRole = "";

      var mode = ownProps.userId?"update":"create";
      for (var i=0;i < data.viewer.allRoles.edges.length; i++) {
      	var item = data.viewer.allRoles.edges[i];
      	if (item.node.name==="Owner" && !Config.adminMode)
      		continue;
      	roleList.push({id: item.node.id, name: item.node.name});
      }
      if (mode==="update") {
	  		_data = data.getUser;

	  		_.forEach(ownProps.userMetaList, function(item){
					var i = _.find(_data.meta.edges, {"node": {"item": item}});
					if (i){
						if (item==="timezone"){
							timezone = i.node.value;
						} else {
							metaValues[i.node.item] = i.node.value;
						}
					}
				})

				if (_data.image) avatar = _data.image;
				
				if (_data.roles.edges.length>0){
					var roles = _.map(_data.roles.edges, function(item){
						return item.node.id
					});
					
					if (roles.length>0) {
						userRole = roles[0];
					}
					
				}
	  	}

			var p = JSON.parse(localStorage.getItem("profile"));
			var isAdmin = (_.indexOf(p.roles, "Admin") > -1);

    	return {
        initialValues: _data,
        mode: mode,
        roleList: roleList,
        isAdmin: isAdmin,
        timezone: timezone,
        avatar: avatar,
        userRole: userRole,
        roleList: roleList
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
