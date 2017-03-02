import React from 'react';
import Query from '../query';
import Config from '../../config'
import {riques, getValue, setValue} from '../../utils';
import _ from 'lodash';

window.getBase64Image = function(img) {
  var canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);
  var dataURL = canvas.toDataURL("image/png");
  return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

var NewUser = React.createClass({
	getInitialState: function(){
		var image = Config.rootUrl+"/images/avatar-default.png";
		if (JSON.parse(localStorage.getItem("profile")).image)
			image = JSON.parse(localStorage.getItem("profile")).image;
		return {
			isSaving: false,
			errorMsg: null,
			noticeTxt: null,
			avatar: image,
			passwordActive: false,
			mode: this.props.userId?"update":"create"
		}
	},
	setFormValues: function(){
		var p = JSON.parse(localStorage.getItem("profile"));

		setValue("fullname", p.name);
		setValue("gender", p.gender);
		setValue("username", p.username);
		setValue("email", p.email);
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
		riques(Query.saveProfileMtn(name, username, email, gender, image), 
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
          	qry = Query.saveUserMetaMtn(userMetaData);
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
			this.setState({passwordActive: true})
		} else {
			this.setState({passwordActive: false})
		}
	},
	handleErrorMsgClose: function(){
    this.setState({errorMsg: ""});
  },
  componentDidMount: function(){
  	if (this.state.mode==="update") {
  		this.setFormValues()
  	}
  },
	render: function(){
		let p = JSON.parse(localStorage.getItem("profile"));
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
			        <li className="active">Add User</li>
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
								  	<label htmlFor="name" className="col-md-3">Full Name</label>
								  	<div className="col-md-9">
										<input type="text" className="form-control" id="fullname" placeholder="Full name" required="true"/>
										<p className="help-block">Your great full name</p>
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
							  	<label htmlFor="tagline" className="col-md-3">Username</label>
							  	<div className="col-md-9">
										<input type="text" className="form-control" id="username" placeholder="User name" required="true"/>
										<p className="help-block">The short unique name describes you</p>
									</div>
								</div>

					  			<div className="form-group">
								  	<label htmlFor="keywoards" className="col-md-3">Email</label>
								  	<div className="col-md-9">
										<input type="email" className="form-control" id="email" placeholder="Email" required="true"/>
									</div>
								</div>

								<div className="form-group">
								 	<label htmlFor="new-password" className="col-md-3">Password</label>
								 	<div className="col-md-9">
										<input type="password" className="form-control" id="password" placeholder="Password" style={{width:200}} required="true"/>
									</div>
								</div>

								<div className="form-group">
								 	<label htmlFor="new-password-2" className="col-md-3">Re-type password</label>
								 	<div className="col-md-9">
										<input type="password" name="new-password-2" id="repassword" placeholder="Retype password" className="form-control" style={{width:200}} disabled={!this.state.passwordActive}/>
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