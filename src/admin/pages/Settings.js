import React from 'react';

var Settings = React.createClass({
	render: function(){
		return (
			<div className="content-wrapper" style={{height: '100%'}}>
				<div className="container-fluid">
				<section className="content-header">
			      <h1>
			        Settings
			      </h1>
			      <ol className="breadcrumb">
			        <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
			        <li className="active">Settings</li>
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
										<input type="text" name="name" className="form-control" />
										<p className="help-block">Your great full name</p>
									</div>
								</div>

					  			<div className="form-group">
								  	<label htmlFor="tagline" className="col-md-3">Tagline</label>
								  	<div className="col-md-9">
										<input type="text" name="tagline" className="form-control" />
										<p className="help-block">Few words that describes your web, example: a bunch of words of mine</p>
									</div>
								</div>

					  			<div className="form-group">
								  	<label htmlFor="keywoards" className="col-md-3">Keywords</label>
								  	<div className="col-md-9">
										<input type="text" name="keywoards" className="form-control" />
										<p className="help-block">Some words represents your web</p>
									</div>
								</div>

					  			<div className="form-group">
								  	<label htmlFor="homeUrl" className="col-md-3">Home URL</label>
								  	<div className="col-md-9">
										<input type="text" name="homeUrl" className="form-control" />
									</div>
								</div>

					  			<div className="form-group">
								  	<label htmlFor="adminEmail" className="col-md-3">Admin Email</label>
								  	<div className="col-md-9">
										<input type="text" name="adminEmail" className="form-control" />
									</div>
								</div>

					  			<div className="form-group">
								  	<label htmlFor="timeZone" className="col-md-3">Time Zone</label>
								  	<div className="col-md-9">
										<input type="text" name="timeZone" className="form-control" />
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

export default Settings;