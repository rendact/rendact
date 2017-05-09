import React from 'react';
import _ from 'lodash';
import Notification from 'react-notification-system';
import Query from '../query';
import {riques, getValue, setValue, getFormData, errorCallback, disableForm, swalert} from '../../utils';

const Field = React.createClass({
	render: function(){
		return (
			<div className="form-inline" >
				<input type="text" value={this.props.name} className="form-control" disabled/> 
				<input type="text" value={this.props.type} className="form-control" disabled/> 
				<input type="button" value="Remove" data={this.props.name} 
					className="form-control btn" onClick={this.props.onDelete} disabled={!this.props.deletable}/> 
			</div>
		)
	}
});

var ContentNew = React.createClass({
	defaultFields: [
		{id:"title", label: "Title", type: "link", deletable: false},
		{id:"slug", label: "Slug", type: "text", deletable: false}
	],
	getInitialState: function(){
		return {
			mode: this.props.postId?"update":"create",
			fields: this.defaultFields,
			checkingSlug: false,
			slug: ''
		}
	},
	loadData: function(){
		if (!this.props.postId) return;
		var me = this;
		var qry = Query.getContentQry(this.props.postId);
		riques(qry, 
			function(error, response, body){
				if(!error && !body.errors) {
					var data = body.data.getContent; 
					setValue("name", data.name);
					setValue("slug", data.slug);
					me.setState({fields: data.fields})
				} else {
					errorCallback(error, body.errors?body.errors[0].message:null);
				}
			}
		);
	},
	checkSlug: function(slug){
    var me = this;
    this.setState({checkingSlug: true});
    riques( Query.checkContentSlugQry(slug),
      function(error, response, body) {
        if (!error && !body.errors && response.statusCode === 200) {
          var slugCount = body.data.viewer.allContents.edges.length;
          if (me.state.mode==="create") {
            if (slugCount > 0) { 
            	me.setState({checkingSlug: false, slug: slug+"-"+slugCount}); 
            	setValue('slug', slug+"-"+slugCount)
            } else me.setState({checkingSlug: false, slug: slug});
          } else {
            if (slugCount > 1) { 
            	me.setState({checkingSlug: false, slug: slug+"-"+slugCount}); 
            	setValue('slug', slug+"-"+slugCount)
            }
            else me.setState({checkingSlug: false, slug: slug});
          }
        } else {
          errorCallback(error, body.errors?body.errors[0].message:null);
        }
        me.setState({checkingSlug: false});
      }
    );
  },
  handleNameBlur: function(event) {
    var name = getValue("name");
    var slug = name.split(" ").join("-").toLowerCase();
    setValue("slug", slug);
    this.checkSlug(slug);
  },
  handleSlugBlur: function(event) {
    var slug = getValue("slug");
    slug = slug.split(" ").join("-").toLowerCase();
    this.checkSlug(slug);
  },
	disableForm: function(state){
    disableForm(state, this.notification);
  },
	handleSubmitBtn: function(event){
		event.preventDefault();
		var me = this;
		var _objData = getFormData('rdt-input-form');
		_objData['fields'] = this.state.fields;
		this.disableForm(true);

		var qry = "";
	    if (this.state.mode==="create"){
	      qry = Query.createContentMtn(_objData);
	    }else{
	      _objData["id"] = this.props.postId;
	      qry = Query.updateContentMtn(_objData);
	    }

		//var qry = Query.createContentMtn(_objData);
		riques(qry, 
			function(error, response, body){
				if(!error && !body.errors) {
					me.disableForm(false);
					me.resetForm();
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
		var width = getValue("field-width");
		var align = getValue("field-align");

		if (!name) {
			swalert('error', 'Invalid value', "Field name can't be  empty!")
			return;
		}
		if (!type){
			swalert('Invalid value', "Field type can't be  empty!",'error');
			return;
		}

		fields.push(
			{
				id: name.toLowerCase(), 
				label: name, 
				type: type?type:"text", 
				width: width?width:225, 
				align:align?align:"left"
			});
		this.setState({fields: fields})
	},
	handleFieldDelete: function(event){
		event.preventDefault();
		var name = event.target.getAttribute("data");
		var fields = this.state.fields;
		
		var record = _.find(fields, {label: name});
		_.pull(fields, record);
		this.setState({fields: fields});
	},
	handleAddNewBtn: function(event) {
    this.resetForm();
  },
	resetForm: function(){
		document.getElementById("contentForm").reset();
		window.history.pushState("", "", '/admin/content/new');
		this.setState({mode: "create", fields: this.defaultFields})
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
			        <li><a href="#" onClick={function(){this.props.handleNav('content')}.bind(this)}> Content Type</a></li>
			        <li className="active">Add Content Type</li>
			      </ol>
			      <div style={{borderBottom:"#eee" , borderBottomStyle:"groove", borderWidth:2, marginTop: 10}}></div>
			    </section>
			    <Notification ref="notificationSystem" />

			    <section className="content">
			    	<div className="row">
					  	<div className="col-md-12">
					  	<div className="box box-primary">

			    			<form onSubmit={this.handleSubmitBtn} id="contentForm" className="form-horizontal">
			    			<div className="box-header with-border">
		              <h3 className="box-title">General Info</h3>
		            </div>
			    			<div className="box-body">

					  		<div className="form-group">
								 	<label htmlFor="name" className="col-md-3">Name</label>
								 	<div className="col-md-9">
										<input type="text" name="name" id="name" className="form-control rdt-input-form" onBlur={this.handleNameBlur} style={{width: 'auto'}} required/>
										<p className="help-block">The new post type system name ( max. 20 characters ). Min 2 letters. Once added the post type system name cannot be changed.</p>
									</div>
								</div>

								<div className="form-group">
								 	<label htmlFor="slug" className="col-md-3">Slug</label>
							  	<div className="col-md-9">
							  		<div className="form-inline">
											<input type="text" name="slug" id="slug" className="form-control rdt-input-form" onBlur={this.handleSlugBlur} required/>
											{ this.state.checkingSlug && <i style={{marginLeft:5}} className="fa fa-spin fa-refresh"></i>}
											<p className="help-block">ID for the custom content type ( max. 20 characters ). Alphanumeric lower-case characters and underscores only. Min 2 letters. Once added the post type system name cannot be changed.</p>
										</div>
									</div>
								</div>

								<div className="form-group">
								 	<label htmlFor="description" className="col-md-3">Description</label>
							  	<div className="col-md-9">
							  		<div className="form-inline">
											<input type="text" name="description" id="description" className="form-control rdt-input-form"/>
											<p className="help-block">A short descriptive summary of what the post type is.</p>
										</div>
									</div>
								</div>

								<div className="form-group">
								 	<label htmlFor="name" className="col-md-3">Menu icon</label>
								 	<div className="col-md-9">
										<input type="text" name="menu-icon" id="menu-icon" className="form-control rdt-input-form" style={{width: 'auto'}} required/>
										<p className="help-block">Font awesome icon class for menu icon</p>
									</div>
								</div>

								</div>

								<div className="box-header with-border">
		              <h3 className="box-title">Fields</h3>
		            </div>

		            <div className="box-body">

			          <div className="form-group">
			          	<label htmlFor="fields" className="col-md-3">Provided Fields</label>
							  	<div className="col-md-9">
							  		<p className="help-block">Select some provided fields for custom content.</p>
	                  <div className="checkbox"><label><input type="checkbox"/>Title</label></div>
	                  <div className="checkbox"><label><input type="checkbox"/>Slug</label></div>
	                  <div className="checkbox"><label><input type="checkbox"/>Author</label></div>
	                  <div className="checkbox"><label><input type="checkbox"/>Summary</label></div>
	                  <div className="checkbox"><label><input type="checkbox"/>Comment</label></div>
	                  <div className="checkbox"><label><input type="checkbox"/>Image</label></div>
	                  <div className="checkbox"><label><input type="checkbox"/>Like</label></div>
	                  <div className="checkbox"><label><input type="checkbox"/>Featured Image</label></div>
	                  <div className="checkbox"><label><input type="checkbox"/>Galley</label></div>
	                  <div className="checkbox"><label><input type="checkbox"/>Publish Date</label></div>
	                </div>
	              </div>

		            <div className="form-group">
								 	<label htmlFor="fields" className="col-md-3">Custom Fields</label>
							  	<div className="col-md-9">
							  		<p className="help-block">Add some custom fields for custom content.</p>
							  		<div className="form-inline" >
											<input type="text" id="field-name" placeholder="Field name" className="form-control"/> 
											<select id="field-type" className="form-control select">
												<option value="text">String</option>
												<option value="text">Number</option>
												<option value="date">Date</option>
												<option value="link">Link</option>
												<option value="image">Image</option>
											</select> 
											<input type="text" id="field-width" placeholder="Width" className="form-control"/> 
											<select id="field-align" className="form-control select">
												<option value="left">Left</option>
												<option value="right">Right</option>
												<option value="center">Center</option>
											</select> 
											<input type="button" value="Add" className="form-control btn btn-primary " onClick={this.handleAddField}/> 
										</div>
										<h4>Current fields</h4>
										{
											this.state.fields.map(function(item){
												return <Field 
																name={item.label} 
																type={item.type} 
																onDelete={this.handleFieldDelete}
																deletable={item.deletable===false?false:true}
																/>
											}.bind(this))
										}
									</div>
								</div>

								<div className="box-header with-border">
		              <h3 className="box-title">Labels</h3>
		            </div>

		            <div className="box-body">
		            	<div className="form-group">
									 	<label htmlFor="label" className="col-md-3">Name</label>
									 	<div className="col-md-9">
											<input type="text" name="label" id="label" className="form-control rdt-input-form" style={{width: 'auto'}} />
										</div>
									</div>

									<div className="form-group">
									 	<label htmlFor="label-singular" className="col-md-3">Singular Name</label>
									 	<div className="col-md-9">
											<input type="text" name="label-singular" id="label-singular" className="form-control rdt-input-form" style={{width: 'auto'}} />
										</div>
									</div>

									<div className="form-group">
									 	<label htmlFor="label-add-new" className="col-md-3">Add New</label>
									 	<div className="col-md-9">
											<input type="text" name="label-add-new" id="label-add-new" className="form-control rdt-input-form" style={{width: 'auto'}} />
										</div>
									</div>

									<div className="form-group">
									 	<label htmlFor="label-edit" className="col-md-3">Edit</label>
									 	<div className="col-md-9">
											<input type="text" name="label-edit" id="label-edit" className="form-control rdt-input-form" style={{width: 'auto'}} />
										</div>
									</div>
		            </div>
								
								<div className="form-group">
									<div className="col-md-9">
										<div className="btn-group">
											<input type="submit" value={this.state.mode==="update"?"Update":"Add"} className="btn btn-primary btn-sm" />
										</div>
									</div>
								</div>
							</div>
							</form>
						</div>
					</div>
				</div>
			 </section>
			</div>
		</div>
		)
	}
});

export default ContentNew;