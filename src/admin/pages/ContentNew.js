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
	providedFields: [
		{id:"author", label: "Author", type: "link"},
		{id:"summary", label: "Summary", type: "link"},
		{id:"content", label: "Content", type: "text"},
		{id:"image", label: "Image", type: "text"},
		{id:"like", label: "Like", type: "text"},
		{id:"featuredImage", label: "Featured Image", type: "text"},
		{id:"gallery", label: "Gallery", type: "text"}
	],
	getInitialState: function(){
		return {
			mode: this.props.postId?"update":"create",
			fields: this.defaultFields,
			providedFields: this.defaultFields,
			customFields: [],
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
					me.setFormValues(data);
				} else {
					errorCallback(error, body.errors?body.errors[0].message:null);
				}
			}
		);
	},
	setFormValues: function(data){
		setValue("name", data.name);
		setValue("slug", data.slug);
		setValue("description", data.description);
		setValue("menuIcon", data.menuIcon);
		setValue("label", data.label);
		setValue("labelSingular", data.labelSingular);
		setValue("labelAddNew", data.labelAddNew);
		setValue("labelEdit", data.labelEdit);
		debugger;
		this.setState({providedFields: data.fields});
		this.setState({customFields: data.customFields});
		this.setState({fields: _.concat(data.fields, data.customFields)});

		var providedFieldsId = _.map(data.fields, function(item){ return item.id });
		_.forEach(document.getElementsByName("checkboxField[]"), function(item){
      if (_.indexOf(providedFieldsId, item.value) > -1)
      	item.checked = true;
    });
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

    var label = getValue("label");
    var labelSingular = getValue("labelSingular");
    var labelAddNew = getValue("labelAddNew");
    var labelEdit = getValue("labelEdit");
    this.setState({
    	label: label?null:name+"s",
    	labelSingular: labelSingular?null:name,
    	labelAddNew: labelAddNew?null:"Add "+name,
    	labelEdit: labelEdit?null:"Edit "+name
    });
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
		var _objData = getFormData('rdt-input-form', 'object');
		_objData['fields'] = this.state.providedFields;
		_objData['customFields'] = this.state.customFields;
		this.disableForm(true);

		var qry = "";
	    if (this.state.mode==="create"){
	      qry = Query.createContentMtn(_objData);
	    }else{
	      _objData["id"] = this.props.postId;
	      qry = Query.updateContentMtn(_objData);
	    }
	  
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
	handleAddProvidedField: function(event){
		var me = this;
		var fields = this.state.fields;
		var providedFields = [];
		var allProvidedField = _.concat(me.providedFields, me.defaultFields);

		var checkedFields = _.filter(document.getElementsByName("checkboxField[]"), function(item){
      return item.checked
    });
    
    _.forEach(checkedFields, function(item){
    	var newField = _.find(allProvidedField, {id: item.value});
			if (newField) providedFields.push(newField);
    })
		
		this.setState({providedFields: providedFields, fields: _.concat(providedFields, this.state.customFields)});
	},
	handleAddCustomField: function(event){
		event.preventDefault();
		var fields = this.state.fields;
		var customFields = this.state.customFields;
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

		
		var newField = {
			id: name.toLowerCase(), 
			label: name, 
			type: type?type:"text", 
			width: width?width:225, 
			align:align?align:"left"
		};
		customFields.push(newField);
		this.setState({customFields: customFields, fields: _.concat(this.state.providedFields, customFields)});
	},
	handleFieldDelete: function(event){
		event.preventDefault();
		var name = event.target.getAttribute("data");
		var cfields = this.state.customFields;
		var pfields = this.state.providedFields;
		
		var record = _.find(cfields, {label: name});
		if (record) {
			_.pull(cfields, record);
			this.setState({customFields: cfields});
		}

		var precord = _.find(pfields, {label: name});
		if (precord) {
			_.pull(pfields, precord);
			this.setState({providedFields: pfields});
			_.forEach(document.getElementsByName("checkboxField[]"), function(item){ if (item.value===precord.id) item.checked=false});
		}

		this.setState({fields: _.concat(cfields, pfields)});
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
										<input type="text" name="menuIcon" id="menuIcon" className="form-control rdt-input-form" style={{width: 'auto'}}/>
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
	                  {
	                  	_.map(this.defaultFields, function(item){
	                  		return <div key={item.id} className="checkbox"><label><input type="checkbox" name="checkboxField[]" value={item.id} readOnly="true" checked/>{item.label}</label></div>
	                  	}.bind(this))
	                  }
	                  {
	                  	_.map(this.providedFields, function(item){
	                  		return <div key={item.id} className="checkbox"><label><input type="checkbox" name="checkboxField[]" onChange={this.handleAddProvidedField} value={item.id}/>{item.label}</label></div>
	                  	}.bind(this))
	                  }
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
											<input type="button" value="Add" className="form-control btn btn-primary " onClick={this.handleAddCustomField}/> 
										</div>
										<h4>Current fields</h4>
										{
											this.state.fields.map(function(item){
												return <Field 
																key={item.label}
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
											<input type="text" name="label" id="label" placeholder={this.state.label} className="form-control rdt-input-form" style={{width: 'auto'}} />
										</div>
									</div>

									<div className="form-group">
									 	<label htmlFor="label-singular" className="col-md-3">Singular Name</label>
									 	<div className="col-md-9">
											<input type="text" name="labelSingular" id="labelSingular" placeholder={this.state.labelSingular} className="form-control rdt-input-form" style={{width: 'auto'}} />
										</div>
									</div>

									<div className="form-group">
									 	<label htmlFor="label-add-new" className="col-md-3">Add New</label>
									 	<div className="col-md-9">
											<input type="text" name="labelAddNew" id="labelAddNew" placeholder={this.state.labelAddNew} className="form-control rdt-input-form" style={{width: 'auto'}} />
										</div>
									</div>

									<div className="form-group">
									 	<label htmlFor="label-edit" className="col-md-3">Edit</label>
									 	<div className="col-md-9">
											<input type="text" name="labelEdit" id="labelEdit" placeholder={this.state.labelEdit} className="form-control rdt-input-form" style={{width: 'auto'}} />
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