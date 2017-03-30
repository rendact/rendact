import React from 'react';
import _ from 'lodash';
import { default as swal } from 'sweetalert2';
import TimezonePicker from 'react-bootstrap-timezone-picker';
import Notification from 'react-notification-system';

import Query from '../query';
import Config from '../../config'
import {riques, getValue, setValue, errorCallback} from '../../utils';

var Settings = React.createClass({
	getInitialState: function(){
		var p = JSON.parse(localStorage.getItem("profile"));
		var dateOfBirth = "";
		if (p.dateOfBirth && p.dateOfBirth!=="") 
			dateOfBirth = new Date(p.dateOfBirth)

		return {
		}
	},
	handleSubmitBtn: function(event){
		event.preventDefault();
		
		var me = this;
		var name = getValue("name");
		var tagline = getValue("tagline");
		var keywords = getValue("keywords");
		var homeUrl = getValue("homeUrl");
		var adminEmail = getValue("adminEmail");
		var timezone = getValue("timezone");

		this.notification.addNotification({
			id: 'saving',
  		message: 'Updating...',
  		level: 'warning',
  		position: 'tr'
    });

		riques(Query.saveSettingsMtn(name, tagline, keywords, homeUrl, adminEmail, timezone), 
			function(error, response, body){
				if(!error && !body.errors) {
					var p = body.data.updateUser.changedUser;
					me.notification.removeNotification('saving');
					me.notification.addNotification({
						message: 'Updated',
						level: 'success',
						position: 'tr',
						autoDismiss: 5
					});
				} else {
					errorCallback(error, body.errors?body.errors[0].message:null);
				}
			}
		);
	}, 
	componentDidMount: function(){
		require ('react-bootstrap-timezone-picker/dist/react-bootstrap-timezone-picker.min.css');
		require ('react-datetime/css/react-datetime.css');
		this.notification = this.refs.notificationSystem;

	},
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
			    			<form onSubmit={this.handleSubmitBtn} className="form-horizontal">
			    			
					  			<div className="form-group">
								  	<label htmlFor="name" className="col-md-3">Webiste name</label>
								  	<div className="col-md-9">
										<input type="text" name="name" className="form-control" />
										<p className="help-block">Website name, will shows up in <code>title</code> tag</p>
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
										<input type="text" name="keywords" className="form-control" />
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