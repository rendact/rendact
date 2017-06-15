import React from 'react';
import _ from 'lodash';
import Notification from 'react-notification-system';
import Halogen from 'halogen';
import Query from '../query';
import {riques, errorCallback, getFormData, disableForm, defaultHalogenStyle} from '../../utils';

var Customize = React.createClass({
	getInitialState: function(){
		return {
			isProcessing: false,
      opacity: 1
		}
	},
	loadData: function(){
		var qry = Query.loadSettingsQry;
		var me = this;
		this.maskArea(true);
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
					me.maskArea(false);
				} else {
					errorCallback(error, body.errors?body.errors[0].message:null);
				}
			}
		);
	},
	disableForm: function(state){
    disableForm(state, this.notification);
    this.maskArea(state);
  },
  maskArea: function(state){
  	this.setState({isProcessing: state, opacity: state?0.4:1});
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
				<div className="col-md-4">
				<section className="content-header">
			      <h1>
			        Customize Theme
			      </h1>
			      <ol className="breadcrumb">
			        <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
			        <li className="active">Settings</li>
			      </ol>
			      <div style={{borderBottom:"#eee" , borderBottomStyle:"groove", borderWidth:2, marginTop: 10}}></div>
			      { this.state.isProcessing &&
            <div style={defaultHalogenStyle}><Halogen.PulseLoader color="#4DAF7C"/></div>                   
            }
			    </section>
			    <Notification ref="notificationSystem" />

			    <section className="content">
			    	<div className="row">
					  	<div className="col-md-8">
					  	<section className="content">
			    			<form onSubmit={this.handleSubmitBtn} className="form-horizontal" style={{opacity: this.state.opacity}}>
			    			
								
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
			<div className="col-md-8">
				<section className="content">
					<iframe src="/" width="100%" height="600"/>
				</section>
			</div>
		</div>
		)
	}
});

export default Customize;