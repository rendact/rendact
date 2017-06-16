import React from 'react';
import _ from 'lodash';
import Notification from 'react-notification-system';
import Halogen from 'halogen';
import Query from '../query';
import {riques, errorCallback, getFormData, disableForm, defaultHalogenStyle} from '../../utils';
import $ from 'jquery';
window.$ = $;
import ColorPicker from 'rc-color-picker';
import 'rc-color-picker/assets/index.css';

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
	handleBgColorChange: function(){

	},
	componentDidMount: function(){
		this.notification = this.refs.notificationSystem;
		this.loadData();
		$("body").addClass("sidebar-collapse");
	},
	render: function(){
		return (
			<div className="content-wrapper">
				<div className="content-fluid">
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
					  	<div className="col-md-3" style={{width: "20%"}}>
						  	<section className="content">
				    			<form onSubmit={this.handleSubmitBtn} className="form-horizontal" style={{opacity: this.state.opacity}}>
				    				
				    				<div className="form-group">
									  	<label htmlFor="name">Website name</label>
									  	<input type="text" name="name" className="form-control rdt-input-form" />
											<p className="help-block">Website name, will shows up in <code>title</code> tag</p>
										</div>

						  			<div className="form-group">
									  	<label htmlFor="tagline">Tagline</label>
									  	<input type="text" name="tagline" className="form-control rdt-input-form" />
											<p className="help-block">Few words that describes your web, example: a bunch of words of mine</p>
										</div>

										<div className="form-group">
									  	<label htmlFor="logo">Logo</label>
											<input type="file" name="logo" onChange={this.featuredImageChange}/>
										</div>

										<div className="form-group">
									  	<label htmlFor="logo">Background color</label>
									  	<div>
												<ColorPicker
										      animation="slide-up"
										      color={'#36c'}
										      style={{width: 100}}
										      onChange={this.handleBgColorChange}
										    />
										  </div>
										</div>

										<div className="form-group">
											<div className="btn-group">
												<input type="submit" value="Update Settings" className="btn btn-primary btn-sm" />
											</div>
										</div>
									</form>
								</section>
							</div>
							<div className="col-md-9" style={{width: "80%"}}>
								<section className="content">
									<iframe src="/" width="100%" height="600"/>
								</section>
							</div>
						</div>
			 		</section>
				</div>
		</div>
		)
	}
});

export default Customize;