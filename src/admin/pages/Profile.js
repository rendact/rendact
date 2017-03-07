import React from 'react';
import Query from '../query';
import Dropzone from 'react-dropzone';
import Config from '../../config'
import {riques, getValue} from '../../utils';
import _ from 'lodash';
import DatePicker from 'react-bootstrap-date-picker';

window.getBase64Image = function(img) {
  var canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);
  var dataURL = canvas.toDataURL("image/png");
  return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

var Profile = React.createClass({
	getInitialState: function(){
		var image = Config.rootUrl+"/images/avatar-default.png";
		if (JSON.parse(localStorage.getItem("profile")).image)
			image = JSON.parse(localStorage.getItem("profile")).image;
		return {
			isSaving: false,
			errorMsg: null,
			noticeTxt: null,
			avatar: image,
			passwordActive: false
		}
	},
	setProfile: function(p) {
	  var metaBio = _.find(p.meta.edges, {"node": {"item": "bio"}});
      var profile = {
		  name: p.fullName?p.fullName:p.username,
	      username: p.username,
	      email: p.email,
	      gender: p.gender,
	      image: p.image,
	      lastLogin: p.lastLogin,
	      createdAt: p.createdAt,
	      biography: metaBio?metaBio.node.value:"",
	      birth: p.dateOfBirth?p.dateOfBirth:"",
	      phone: p.phone?p.phone:"",
	      country: p.country?p.country:"",
	      timezone: p.timezone?p.timezone:"",
	      website: p.website?p.website:"",
	      facebook: p.facebook?p.facebook:"",
	      twitter: p.twitter?p.twitter:"",
	      linkedin: p.linkedin?p.linkedin:""
	  }
	  localStorage.setItem('profile', JSON.stringify(profile));
  	},
  	setUserMeta: function(meta){
	  	var metaBio = "";
	  	if (_.isArray(meta)) {
	  		metaBio = _.find(meta, {"node": {"item": "bio"}})
	  							 .node.value;
	  	} else {
	  		metaBio = _.find([meta], {"item": "bio"}).value;
	  	}
	  	
	  	var profile = JSON.parse(localStorage.getItem("profile"));
	  	profile.biography = metaBio;
	  	localStorage.setItem('profile', JSON.stringify(profile));
  	},
	handleSubmitBtn: function(event){debugger;
		event.preventDefault();
		
		var me = this;
		var name = getValue("name");
		var username = getValue("username");
		var email = getValue("email");
		var gender = getValue("gender");
		var image = this.state.avatar;
		var bio = getValue("bio");
		//var birth = getValue("birth");
		var phone = getValue("phone");
		var country = getValue("country");
		var timezone = getValue("timezone");
		var website = getValue("website");
		var facebook = getValue("facebook");
		var twitter = getValue("twitter");
		var linkedin = getValue("linkedin");
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
		riques(Query.saveProfileMtn(localStorage.getItem("userId"), name, username, email, gender, image, phone, country, timezone, website, facebook, twitter, linkedin), 
			function(error, response, body){
				if(!error && !body.errors) {
					var p = body.data.updateUser.changedUser;
					me.setState({avatar: p.image})
          me.setProfile(p);
          var here = me;
          var userMetaData0 = {"bio": bio};
          var qry = '';

          var userMetaData = [];
          if (p.meta.edges.length>0) {
          	_.forEach(p.meta.edges, function(item, index){
          		if (_.has(userMetaData0, item.node.item))
          			userMetaData.push({id: item.node.id, item: item.node.item, value: userMetaData0[item.node.item]});
          	});
          	qry = Query.saveUserMetaMtn(localStorage.getItem("userId"), userMetaData);
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
									here.setUserMeta(o.changedUserMeta);
									here.setState({noticeTxt: "Profile saved"});
								}
							} else {
								if (error){
									here.setState({errorMsg: error})
								}
								else if (body.errors) {
									here.setState({errorMsg: body.errors[0].message})
								} else {
									here.setState({errorMsg: "Unknown error"})
								}
							}
							here.setState({isSaving: false});
						}
					);
				} else {
					if (error){
						me.setState({errorMsg: error})
					}
					else if (body.errors) {
						me.setState({errorMsg: body.errors[0].message})
					} else {
						me.setState({errorMsg: "Unknown error"})
					}
				}
				//me.setState({isSaving: false});
			}
		);
		
		if (changePassword) {
			riques(Query.changePasswordMtn(oldPassword, password), 
				function(error, response, body){
					if(!error && !body.errors) {
						me.setState({noticeTxt: "Password changed"});
					} else {
						if (error){
							me.setState({errorMsg: error})
						}
						else if (body.errors) {
							me.setState({errorMsg: body.errors[0].message})
						} else {
							me.setState({errorMsg: "Unknown error"})
						}
					}
				}
			);
		}
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
			this.setState({passwordActive: true});
		} else {
			this.setState({passwordActive: false})
		}
	},
	handleErrorMsgClose: function(){
	    this.setState({errorMsg: ""});
	},
	render: function(){ 
		let p = JSON.parse(localStorage.getItem("profile"));
		return (
			<div className="content-wrapper">
				<div className="container-fluid">
				<section className="content-header" style={{marginBottom:20}}>
			      <h1>
			        My Profile
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
										<input type="text" name="name" id="name" className="form-control" defaultValue={p.name} required="true"/>
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
										<input type="text" name="username" id="username" className="form-control" defaultValue={p.username} required="true"/>
										<p className="help-block">The short unique name describes you</p>
									</div>
								</div>

								<div className="form-group">
								  	<label htmlFor="birth" className="col-md-3">Date of Birth</label>
								  	<div className="col-md-9">
										<DatePicker id="datepicker" style={{width: "100%", padddingRight: 0, textAlign: "left"}} />
									</div>
								</div>

								<div className="form-group">
								 	<label htmlFor="homeUrl" className="col-md-3">Gender</label>
								 	<div className="col-md-9">
										<select id="gender" name="gender" defaultValue={p.gender} style={{width: 150}}>
											<option key="male" value="male" >Male</option>
											<option key="female" value="female" >Female</option>
										</select> 
									</div>
								</div>

					  			<div className="form-group">
								  	<label htmlFor="keywoards" className="col-md-3">Email</label>
								  	<div className="col-md-9">
										<input type="text" name="email" id="email" className="form-control" defaultValue={p.email} disabled/>
									</div>
								</div>

								<div className="form-group">
								  	<label htmlFor="phone" className="col-md-3">Phone</label>
								  	<div className="col-md-9">
										<input type="text" name="phone" id="phone" className="form-control" defaultValue={p.phone} required="true"/>
									</div>
								</div>

					  			<div className="form-group">
								 	<label htmlFor="homeUrl" className="col-md-3">Biography</label>
								 	<div className="col-md-9">
										<textarea name="bio" id="bio" className="form-control">{p.biography}</textarea>
									</div>
								</div>

								<div className="form-group">
								  	<label htmlFor="country" className="col-md-3">Country</label>
								  	<div className="col-md-9">
										<input type="text" name="country" id="country" className="form-control" defaultValue={p.country} required="true"/>
									</div>
								</div>

								<div className="form-group">
								  	<label htmlFor="timezone" className="col-md-3">Timezone</label>
								  	<div className="col-md-9">
										<input type="text" name="timezone" id="timezone" className="form-control" defaultValue={p.timezone} required="true"/>
									</div>
								</div>

								<div className="form-group">
								 	<label htmlFor="homeUrl" className="col-md-3">Member since</label>
								 	<div className="col-md-9">
										<input type="text" name="gender" className="form-control" defaultValue={p.createdAt} disabled/>
									</div>
								</div>

								<div className="form-group">
								 	<label htmlFor="homeUrl" className="col-md-3">Last login</label>
								 	<div className="col-md-9">
										<input type="text" name="gender" className="form-control" defaultValue={p.lastLogin} disabled/>
									</div>
								</div>

								<h4 style={{marginBottom: 20}}>Change Password</h4>
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

								<h4 style={{marginBottom: 20}}>Social Media</h4>
								<div className="form-group">
								  	<label htmlFor="website" className="col-md-3">Website</label>
								  	<div className="col-md-9">
										<input type="text" name="website" id="website" className="form-control" defaultValue={p.website} required="true"/>
									</div>
								</div>

								<div className="form-group">
								  	<label htmlFor="facebook" className="col-md-3">Facebook Account</label>
								  	<div className="col-md-9">
										<input type="text" name="facebook" id="facebook" className="form-control" defaultValue={p.facebook} required="true"/>
									</div>
								</div>

								<div className="form-group">
								  	<label htmlFor="twitter" className="col-md-3">Twitter Account</label>
								  	<div className="col-md-9">
										<input type="text" name="twitter" id="twitter" className="form-control" defaultValue={p.twitter} required="true"/>
									</div>
								</div>

								<div className="form-group">
								  	<label htmlFor="linkedin" className="col-md-3">Linkedin Account</label>
								  	<div className="col-md-9">
										<input type="text" name="linkedin" id="linkedin" className="form-control" defaultValue={p.linkedin} required="true"/>
									</div>
								</div>
															
								<div className="form-group">
									<div className="col-md-9">
										<div className="btn-group">
											<input type="submit" value="Update Profile" className="btn btn-primary btn-sm" />
										</div>
										{ this.state.isSaving &&
											<p>Updating...</p>
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

export default Profile;