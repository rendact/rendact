import React from 'react';

var Settings = React.createClass({
	render: function(){
		return (
			<div className="content-wrapper" style={{height: '100%'}}>
				<section className="content-header">
			      <h1>
			        Settings
			        <small>Control panel</small>
			      </h1>
			      <ol className="breadcrumb">
			        <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
			        <li className="active">Settings</li>
			      </ol>
			    </section>

			    <section className="content">
			    	<div className="row">
					  	<div className="col-md-6">
					  	<section className="content">
			    			<form className="form-horizontal">
			    			
					  			<div className="form-group">
								  	<label for="name" className="col-md-3">Name</label>
								  	<div className="col-md-9">
										<input type="text" name="name" placeholder="Name" className="form-control" />
										<p><i>Fill in your Name</i></p>
									</div>
								</div>

					  			<div className="form-group">
								  	<label for="tagline" className="col-md-3">Tagline</label>
								  	<div className="col-md-9">
										<input type="text" name="tagline" placeholder="Tagline" className="form-control" />
										<p><i>Fill in your Tag Line</i></p>
									</div>
								</div>

					  			<div className="form-group">
								  	<label for="keywoards" className="col-md-3">Keywoards</label>
								  	<div className="col-md-9">
										<input type="text" name="keywoards" placeholder="Keywoards" className="form-control" />
										<p><i>Fill in your Keywoard</i></p>
									</div>
								</div>

					  			<div className="form-group">
								  	<label for="homeUrl" className="col-md-3">Home URL</label>
								  	<div className="col-md-9">
										<input type="text" name="homeUrl" placeholder="Home URL" className="form-control" />
										<p><i>Fill in your Home URL</i></p>
									</div>
								</div>

					  			<div className="form-group">
								  	<label for="adminEmail" className="col-md-3">Admin Email</label>
								  	<div className="col-md-9">
										<input type="text" name="adminEmail" placeholder="Admin Email" className="form-control" />
										<p><i>Fill in your Email</i></p>
									</div>
								</div>

					  			<div className="form-group">
								  	<label for="timeZone" className="col-md-3">Time Zone</label>
								  	<div className="col-md-9">
										<input type="text" name="timeZone" placeholder="Time Zone" className="form-control" />
										<p><i>Fill in your Time Zone</i></p>
									</div>
								</div>
								
								<div className="form-group">
								<div className="col-md-3">
									
										<input type="submit" value="Save" className="btn btn-success btn-block btn-h1-spacing" />
								</div>
								</div>
							</form>
						</section>
					  	</div>
					</div>
					
			    </section>

			    
		    </div>
		)
	}
});

export default Settings;