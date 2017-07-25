import React from 'react'
import _ from 'lodash'
import Notification from 'react-notification-system'
import Halogen from 'halogen'
import Query from '../query'
import {riques, errorCallback, getFormData, disableForm, defaultHalogenStyle} from '../../utils'
import {connect} from 'react-redux'
import {maskArea, loadFormData} from '../../actions'
import {reduxForm, Field} from 'redux-form'

var Settings = React.createClass({
	propTypes: {
		isProcessing: React.PropTypes.bool.isRequired,
		opacity: React.PropTypes.number.isRequired,
		data: React.PropTypes.object
	},
	getDefaultProps: function() {
  	return {
			isProcessing: false,
      opacity: 1,
      data: {}
		}
 	},
	loadData: function(){
		var qry = Query.loadSettingsQry;
		var me = this;
		this.props.dispatch(maskArea(false));
		riques(qry, 
			function(error, response, body){
				if(!error && !body.errors) {
					var _data = {}
					_.forEach(body.data.viewer.allOptions.edges, function(item){
						_data[item.node.item] = item.node.value;
					});
					me.props.dispatch(loadFormData(_data));
					me.props.dispatch(maskArea(false));
				} else {
					errorCallback(error, body.errors?body.errors[0].message:null);
				}
			}
		);
	},
	disableForm: function(state){
    disableForm(state, this.notification);
    this.props.dispatch(maskArea(false));
  },
	handleSubmitBtn: function(event){
		event.preventDefault();
		var me = this;
		var _objData = getFormData('rdt-input-form');
		this.disableForm(true);

		var qry = Query.createUpdateSettingsMtn(_objData);
		riques(qry, 
			function(error, response, body){
				if(!error && !body.errors) {
					me.disableForm(false);
				} else {
					errorCallback(error, body.errors?body.errors[0].message:null);
				}
			}
		);
	}, 
	componentDidMount: function(){
		this.notification = this.refs.notificationSystem;
		this.loadData();
	},
	render: function(){
		return (
			<div className="content-wrapper">
				<div className="container-fluid">
				<section className="content-header">
			      <h1>
			        Settings
			      </h1>
			      <ol className="breadcrumb">
			        <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
			        <li className="active">Settings</li>
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
			    			<form onSubmit={this.handleSubmitBtn} className="form-horizontal" style={{opacity: this.props.opacity}} >
			    			
						  		<div className="form-group">
									  	<label htmlFor="name" className="col-md-3">Website name</label>
									  	<div className="col-md-9">
									  	<Field name="name" component="input" type="text" className="form-control"/>
											<p className="help-block">Website name, will shows up in <code>title</code> tag</p>
										</div>
									</div>

						  			<div className="form-group">
									  	<label htmlFor="tagline" className="col-md-3">Tagline</label>
									  	<div className="col-md-9">
									  	<Field name="tagline" component="input" type="text" className="form-control"/>
											<p className="help-block">Few words that describes your web, example: a bunch of words of mine</p>
										</div>
									</div>

						  			<div className="form-group">
									  	<label htmlFor="keywoards" className="col-md-3">Keywords</label>
									  	<div className="col-md-9">
									  	<Field name="keywords" component="input" type="text" className="form-control"/>
											<p className="help-block">Some words represents your web</p>
										</div>
									</div>

						  		<div className="form-group">
									 	<label htmlFor="rootUrl" className="col-md-3">Home URL</label>
								  	<div className="col-md-9">
								  		<Field name="rootUrl" component="input" type="text" className="form-control"/>
										</div>
									</div>

						  		<div className="form-group">
								  	<label htmlFor="adminEmail" className="col-md-3">Admin Email</label>
								  	<div className="col-md-9">
								  		<Field name="adminEmail" component="input" type="text" className="form-control"/>
										</div>
									</div>

						  		<div className="form-group">
								  	<label htmlFor="timeZone" className="col-md-3">Time Zone</label>
								  	<div className="col-md-9">
								  		<Field name="timeZone" component="input" type="text" className="form-control"/>
										</div>
									</div>

									<div className="form-group">
									 	<label htmlFor="dbApiUrl" className="col-md-3">Database API URL</label>
								  	<div className="col-md-9">
								  		<Field name="dbApiUrl" component="input" type="text" className="form-control"/>
										</div>
									</div>

									<div className="form-group">
									 	<label htmlFor="auth0ClientId" className="col-md-3">Auth0 Client ID</label>
								  	<div className="col-md-9">
								  		<Field name="auth0ClientId" component="input" type="text" className="form-control"/>
										</div>
									</div>

									<div className="form-group">
									 	<label htmlFor="auth0Domain" className="col-md-3">Auth0 Domain</label>
								  	<div className="col-md-9">
								  		<Field name="auth0Domain" component="input" type="text" className="form-control"/>
										</div>
									</div>

									<div className="form-group">
									 	<label htmlFor="mailApiUrl" className="col-md-3">Email API URL</label>
								  	<div className="col-md-9">
								  		<Field name="mailApiUrl" component="input" type="text" className="form-control"/>
										</div>
									</div>

									<div className="form-group">
									 	<label htmlFor="mailApiKey" className="col-md-3">Email API Key</label>
								  	<div className="col-md-9">
								  		<Field name="mailApiKey" component="input" type="text" className="form-control"/>
										</div>
									</div>

									<div className="form-group">
									 	<label htmlFor="mailDefaultSender" className="col-md-3">Email Default Sender</label>
								  	<div className="col-md-9">
								  		<Field name="mailDefaultSender" component="input" type="text" className="form-control"/>
										</div>
									</div>
									
									<div className="form-group">
											<div className="col-md-9">
												<div className="btn-group">
													<input type="submit" value="Update Settings" className="btn btn-primary btn-sm" />
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

const mapStateToProps = function(state){
	if (!_.isEmpty(state.settings)) {
		var out = _.head(state.settings);
		out["initialValues"] = out.data;
		return out;
	} else return {}
}

Settings = reduxForm({
  form: 'settingsForm'
})(Settings)
Settings = connect(mapStateToProps)(Settings)
export default Settings;