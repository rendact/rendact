import React from 'react'
import _ from 'lodash'
import Notification from 'react-notification-system'
import Halogen from 'halogen'
import Query from '../query'
import {riques, errorCallback, getFormData, disableForm, defaultHalogenStyle} from '../../utils'
import {connect} from 'react-redux'
import {maskArea, loadFormData} from '../../actions'
import {reduxForm, Field} from 'redux-form'
import gql from 'graphql-tag'
import {graphql} from 'react-apollo'

const SettingField = ({name, title, help}) => (
    <div className="form-group">
        <label htmlFor="name" className="col-md-3">{title}</label>
        <div className="col-md-9">
        <Field name={name} component="input" type="text" className="form-control"/>
        {help &&
          <p className="help-block">{help}</p>
        }
      </div>
    </div>
)

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
	componentWillReceiveProps(props){
	},
	componentDidMount: function(){
		this.notification = this.refs.notificationSystem;
		//this.loadData();
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

                  <ul className="nav nav-tabs" role="tablist">
                    <li role="presentation" className="active"><a href="#general" aria-controls="home" role="tab" data-toggle="tab">General</a></li>
                    <li role="presentation" ><a href="#homepage" aria-controls="homepage" role="tab" data-toggle="tab">Homepage</a></li>
                  </ul>


                  <div className="tab-content">
                    <div role="tabpanel" className="tab-pane active" id="general" style={{margin: 20}}>
                  <SettingField
                    name="name"
                    title="Website name"
                    help={<span>Website name, will shows up in <code>title</code> tag</span>}
                  />
			    			
                  <SettingField
                    name="tagline"
                    title="Tagline"
                    help="Few words that describes your web, example: a bunch of words of mine"
                  />

                  <SettingField
                    name="keywords"
                    title="Keywords"
                    help="Some words represents your web"
                  />
                  <SettingField
                    name="rootUrl"
                    title="Home URL"
                  />

                  <SettingField
                    name="adminEmail"
                    title="Admin Email"
                  />
                  <SettingField
                    name="timeZone"
                    title="Time Zone"
                  />
                  <SettingField
                    name="dbApiUrl"
                    title="Database API URL"
                  />
									<SettingField
                    title="Auth0 Client ID"
								    name="auth0ClientId"
                     />

									<SettingField
                     title="Auth0 Domain"
								  	 name="auth0Domain"
                     />

									<SettingField
                     title="Email API URL"
								  	 name="mailApiUrl"
                     />

									<SettingField
                     title="Email API Key"
								  	 name="mailApiKey"
                     />

									<SettingField
                     title="Email Default Sender"
								  	 name="mailDefaultSender"
                     />
                    </div>


                    <div id="homepage" style={{margin:20, height: "100%"}}></div>


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

const mapStateToProps = (state) => (state)
Settings = reduxForm({
  form: 'settingsForm'
})(Settings)
Settings = connect(mapStateToProps)(Settings)

//React-Apollo
Settings = graphql(gql`${Query.loadSettingsQry.query}`,{
	props: ({ownProps, data}) => {
    if (data.loading) {
      return {
        isLoading: true
      }
    } else if(data.error) {
      errorCallback(data.error, data.error, data.error)
       return {hasError: true}
    } else {
    	var _data = {}
			_.forEach(data.viewer.allOptions.edges, function(item){
				_data[item.node.item] = item.node.value;
			});
	return {
        isLoading: false,
        initialValues: _data
    }
	}
	}
})(Settings)

export default Settings;
