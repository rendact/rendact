import React from 'react';
import Query from '../query';
import {riques, getValue, setValue} from '../../utils';

var Profile = React.createClass({
	getInitialState: function(){
		return {
			isSaving: false,
			errorMsg: null
		}
	},
	setProfile: function(p) {
    var profile = {
      name: p.fullName?p.fullName:p.username,
      username: p.username,
      email: p.email,
      gender: p.gender,
      lastLogin: p.lastLogin,
      createdAt: p.createdAt
    }
    localStorage.setItem('profile', JSON.stringify(profile));
  },
	handleSubmitBtn: function(event){
		event.preventDefault();
		
		var me = this;
		var name = getValue("name");
		var username = getValue("username");
		var email = getValue("email");
		var gender = getValue("gender");
		//var bio = getValue("bio");

		this.setState({isSaving: true});
		riques(Query.saveProfileMtn(name, username, email, gender), 
			function(error, response, body){
				if(!error && !body.errors) {
					var p = body.data.updateUser.changedUser;
					setValue("name", p.fullName);
					setValue("username", p.username);
					setValue("email", p.email);
					setValue("gender",p.gender);

          me.setProfile(p);
				} else {
					if (error){
						me.setState({errorMsg: error})
					}
					else if (body.errors) {
						me.setState({errorMsg: body.errors})
					} else {
						me.setState({errorMsg: "Unknown error"})
					}
				}
				me.setState({isSaving: false});
			}
		);
	},
	render: function(){
		let p = JSON.parse(localStorage.getItem("profile"));
		return (
			<div className="content-wrapper" style={{height: '100%'}}>
				<div className="container-fluid">
				<section className="content-header">
			      <h1>
			        Profile
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

			    <section className="content">
			    	<div className="row">
					  	<div className="col-md-8">
					  	<section className="content">
			    			<form onSubmit={this.handleSubmitBtn} className="form-horizontal" id="profileForm">
			    			
					  			<div className="form-group">
								  	<label htmlFor="name" className="col-md-3">Name</label>
								  	<div className="col-md-9">
										<input type="text" name="name" id="name" className="form-control" defaultValue={p.name}/>
										<p className="help-block">Your great full name</p>
									</div>
								</div>

					  			<div className="form-group">
								  	<label htmlFor="tagline" className="col-md-3">Username</label>
								  	<div className="col-md-9">
										<input type="text" name="username" id="username" className="form-control" defaultValue={p.username}/>
										<p className="help-block">The short unique name describes you</p>
									</div>
								</div>

					  			<div className="form-group">
								  	<label htmlFor="keywoards" className="col-md-3">Email</label>
								  	<div className="col-md-9">
										<input type="text" name="email" id="email" className="form-control" defaultValue={p.email}/>
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
								 	<label htmlFor="homeUrl" className="col-md-3">Biography</label>
								 	<div className="col-md-9">
										<textarea name="bio" id="bio" className="form-control"></textarea>
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
								
								<div className="form-group">
									<div className="col-md-9">
										<div className="btn-group">
											<input type="submit" value="Save" className="btn btn-primary" />
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

export default Profile;