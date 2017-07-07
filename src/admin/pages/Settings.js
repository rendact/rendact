import React from 'react'
import _ from 'lodash'
import Notification from 'react-notification-system'
import Halogen from 'halogen'
import Query from '../query'
import {riques, errorCallback, getFormData, disableForm, defaultHalogenStyle} from '../../utils'
import {connect} from 'react-redux'
import {maskArea} from '../../actions'
import { Field, reduxForm } from 'redux-form'

let SettingsForm = (props) => {
  const { handleSubmitBtn, style, pristine, reset, submitting } = props
  return (
  	<form onSubmit={handleSubmitBtn} className="form-horizontal" style={style} >
			    			
  		<div className="form-group">
			  	<label htmlFor="name" className="col-md-3">Website name</label>
			  	<div className="col-md-9">
					<input type="text" name="name" className="form-control rdt-input-form" />
					<p className="help-block">Website name, will shows up in <code>title</code> tag</p>
				</div>
			</div>

  			<div className="form-group">
			  	<label htmlFor="tagline" className="col-md-3">Tagline</label>
			  	<div className="col-md-9">
					<input type="text" name="tagline" className="form-control rdt-input-form" />
					<p className="help-block">Few words that describes your web, example: a bunch of words of mine</p>
				</div>
			</div>

  			<div className="form-group">
			  	<label htmlFor="keywoards" className="col-md-3">Keywords</label>
			  	<div className="col-md-9">
					<input type="text" name="keywords" className="form-control rdt-input-form" />
					<p className="help-block">Some words represents your web</p>
				</div>
			</div>

  		<div className="form-group">
			 	<label htmlFor="rootUrl" className="col-md-3">Home URL</label>
		  	<div className="col-md-9">
					<input type="text" name="rootUrl" className="form-control rdt-input-form" />
				</div>
			</div>

  		<div className="form-group">
			  	<label htmlFor="adminEmail" className="col-md-3">Admin Email</label>
			  	<div className="col-md-9">
					<input type="text" name="adminEmail" className="form-control rdt-input-form" />
				</div>
			</div>

  		<div className="form-group">
			  	<label htmlFor="timeZone" className="col-md-3">Time Zone</label>
			  	<div className="col-md-9">
					<input type="text" name="timeZone" className="form-control rdt-input-form" />
				</div>
			</div>

			<div className="form-group">
			 	<label htmlFor="dbApiUrl" className="col-md-3">Database API URL</label>
		  	<div className="col-md-9">
					<input type="text" name="dbApiUrl" className="form-control rdt-input-form" />
				</div>
			</div>

			<div className="form-group">
			 	<label htmlFor="auth0ClientId" className="col-md-3">Auth0 Client ID</label>
		  	<div className="col-md-9">
					<input type="text" name="auth0ClientId" className="form-control rdt-input-form" />
				</div>
			</div>

			<div className="form-group">
			 	<label htmlFor="auth0Domain" className="col-md-3">Auth0 Domain</label>
		  	<div className="col-md-9">
					<input type="text" name="auth0Domain" className="form-control rdt-input-form" />
				</div>
			</div>

			<div className="form-group">
			 	<label htmlFor="mailApiUrl" className="col-md-3">Email API URL</label>
		  	<div className="col-md-9">
					<input type="text" name="mailApiUrl" className="form-control rdt-input-form" />
				</div>
			</div>

			<div className="form-group">
			 	<label htmlFor="mailApiKey" className="col-md-3">Email API Key</label>
		  	<div className="col-md-9">
					<input type="text" name="mailApiKey" className="form-control rdt-input-form" />
				</div>
			</div>

			<div className="form-group">
			 	<label htmlFor="mailDefaultSender" className="col-md-3">Email Default Sender</label>
		  	<div className="col-md-9">
					<input type="text" name="mailDefaultSender" className="form-control rdt-input-form" />
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
  )
}

SettingsForm = reduxForm({
  form: 'settingsForm'
})(SettingsForm)

var Settings = React.createClass({
	propTypes: {
		isProcessing: React.PropTypes.bool.isRequired,
		opacity: React.PropTypes.number.isRequired,
		doMaskArea: React.PropTypes.func.isRequired
	},
	getDefaultProps: function() {
  	return {
			isProcessing: false,
      opacity: 1
		}
 	},
	loadData: function(){
		var qry = Query.loadSettingsQry;
		var me = this;
		this.props.doMaskArea(true)
		riques(qry, 
			function(error, response, body){
				if(!error && !body.errors) {
					_.forEach(body.data.viewer.allOptions.edges, function(item){
						var _el = document.getElementsByName(item.node.item);
						if (_el.length>0){
							_el[0].value = item.node.value;
							_el[0].id = item.node.id;
						}
					});
					me.props.doMaskArea(false)
				} else {
					errorCallback(error, body.errors?body.errors[0].message:null);
				}
			}
		);
	},
	disableForm: function(state){
    disableForm(state, this.notification);
    this.props.doMaskArea(state)
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
			    			<SettingsForm onSubmit={this.handleSubmitBtn} style={{opacity: this.props.opacity}}/>
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
	if (state.settings.length>0) {
		return {
	  	isProcessing: state.settings[0].isProcessing,
	  	opacity: state.settings[0].opacity
	  }
	} else return []
}

const mapDispatchToProps = {
  doMaskArea: maskArea
}

Settings = connect(
	mapStateToProps,
	mapDispatchToProps
)(Settings)
export default Settings;