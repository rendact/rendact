import React from 'react';

var Profile = React.createClass({
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

			    <section className="content">
			    	<div className="row">
					  	<div className="col-md-8">
					  	<section className="content">
			    			<form className="form-horizontal">
			    			
					  			<div className="form-group">
								  	<label htmlFor="name" className="col-md-3">Name</label>
								  	<div className="col-md-9">
										<input type="text" name="name" className="form-control" value={p.name}/>
										<p className="help-block">Your great full name</p>
									</div>
								</div>

					  			<div className="form-group">
								  	<label htmlFor="tagline" className="col-md-3">Username</label>
								  	<div className="col-md-9">
										<input type="text" name="username" className="form-control" value={p.username}/>
										<p className="help-block">The short unique name describes you</p>
									</div>
								</div>

					  			<div className="form-group">
								  	<label htmlFor="keywoards" className="col-md-3">Email</label>
								  	<div className="col-md-9">
										<input type="text" name="email" className="form-control" value={p.email}/>
									</div>
								</div>

					  		<div className="form-group">
								 	<label htmlFor="homeUrl" className="col-md-3">Gender</label>
								 	<div className="col-md-9">
										<input type="text" name="gender" className="form-control" value={p.gender}/>
									</div>
								</div>

								<div className="form-group">
								 	<label htmlFor="homeUrl" className="col-md-3">Biography</label>
								 	<div className="col-md-9">
										<textarea name="bio" className="form-control"></textarea>
									</div>
								</div>

								<div className="form-group">
								 	<label htmlFor="homeUrl" className="col-md-3">Member since</label>
								 	<div className="col-md-9">
										<input type="text" name="gender" className="form-control" value={p.createdAt} disabled/>
									</div>
								</div>

								<div className="form-group">
								 	<label htmlFor="homeUrl" className="col-md-3">Last login</label>
								 	<div className="col-md-9">
										<input type="text" name="gender" className="form-control" value={p.lastLogin} disabled/>
									</div>
								</div>
								
								<div className="form-group">
								<div className="col-md-3">
									<input type="submit" value="Save" className="btn btn-default btn-block btn-h1-spacing disabled" />
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