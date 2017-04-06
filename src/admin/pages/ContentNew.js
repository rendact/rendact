import React from 'react';
import _ from 'lodash';
import { default as swal } from 'sweetalert2';
import TimezonePicker from 'react-bootstrap-timezone-picker';
import Notification from 'react-notification-system';

import Query from '../query';
import Config from '../../config'
import {riques, getValue, setValue, errorCallback, getFormData, disableForm} from '../../utils';

const Field = React.createClass({
	render: function(){
		return (
			<div className="form-inline" >
				<input type="text" value={this.props.name} className="form-control" disabled/> 
				<input type="text" value={this.props.type} className="form-control" disabled/> 
				<input type="button" value="Remove" data={this.props.name} className="form-control btn" onClick={this.props.onDelete}/> 
			</div>
		)
	}
});

var Settings = React.createClass({
	getInitialState: function(){
		var p = JSON.parse(localStorage.getItem("profile"));
		var dateOfBirth = "";
		if (p.dateOfBirth && p.dateOfBirth!=="") 
			dateOfBirth = new Date(p.dateOfBirth)

		return {
			fields: [{name: "Title", type: "String"}]
		}
	},
	loadData: function(){
		var qry = Query.loadSettingsQry;
		
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
				} else {
					errorCallback(error, body.errors?body.errors[0].message:null);
				}
			}
		);
	},
	disableForm: function(state){
    disableForm(state, this.notification);
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
	handleAddField: function(event){
		event.preventDefault();
		var fields = this.state.fields;
		var name = getValue("field-name");
		var type = getValue("field-type");
		fields.push({name: name, type: type});
		this.setState({fields: fields})
	},
	handleFieldDelete: function(event){
		event.preventDefault();
		var name = event.target.getAttribute("data");
		var fields = this.state.fields;

		var record = _.find(fields, {name: name});
		_.pull(fields, record);
		this.setState({fields: fields});
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
			      <h1>{this.state.mode==="update"?"Edit Content Type":"Add New Content Type"}
              { this.state.mode==="update" &&
                <small style={{marginLeft: 5}}>
                  <button className="btn btn-default btn-primary add-new-post-btn" onClick={this.handleAddNewBtn}>Add new</button>
                </small>
              }
            </h1>
			      <ol className="breadcrumb">
			        <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
			        <li className="active">Content Type</li>
			      </ol>
			      <div style={{borderBottom:"#eee" , borderBottomStyle:"groove", borderWidth:2, marginTop: 10}}></div>
			    </section>
			    <Notification ref="notificationSystem" />

			    <section className="content">
			    	<div className="row">
					  	<div className="col-md-8">
					  	<section className="content">
			    			<form onSubmit={this.handleSubmitBtn} className="form-horizontal">
			    			
					  		<div className="form-group">
								 	<label htmlFor="name" className="col-md-3">Name</label>
								 	<div className="col-md-9">
										<input type="text" name="name" className="form-control rdt-input-form" />
									</div>
								</div>

								<div className="form-group">
								 	<label htmlFor="slug" className="col-md-3">Slug</label>
							  	<div className="col-md-9">
										<input type="text" name="slug" className="form-control rdt-input-form" />
									</div>
								</div>

								<div className="form-group">
								 	<label htmlFor="fields" className="col-md-3">Fields</label>
							  	<div className="col-md-9">
							  		<div className="form-inline" >
											<input type="text" id="field-name" placeholder="Field name" className="form-control"/> 
											<select id="field-type" className="form-control select">
												<option>String</option>
												<option>Number</option>
											</select> 
											<input type="button" value="Add" className="form-control btn" onClick={this.handleAddField}/> 
										</div>
										<h4>Current fields</h4>
										{
											this.state.fields.map(function(item){
												return <Field name={item.name} type={item.type} onDelete={this.handleFieldDelete}/>
											}.bind(this))
										}
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

export default Settings;