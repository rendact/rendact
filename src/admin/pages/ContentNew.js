import React from 'react';
import _ from 'lodash';
import Notification from 'react-notification-system';
import Query from '../query';
import {riques, getValue, setValue, getFormData, errorCallback, disableForm, swalert} from '../../utils';
import {connect} from 'react-redux'
import {loadFormData} from '../../actions'
import {reduxForm, Field} from 'redux-form'
import {maskArea, toggleSelectedItemState, setprovidedFields, setcustomFields, setfields, 
	setcheckingSlug, togglecheckingSlug, NameBlur, AddProvidedField, setmode} from '../../actions'

const ContentField = React.createClass({
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

let ContentNew = React.createClass({
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
		this.props.dispatch(loadFormData(data));
		document.getElementById("status").checked = data.status==="active"?true:false;
		
		// this.setState({providedFields: data.fields});
		this.props.dispatch(setprovidedFields(data.fields));
		// this.setState({customFields: data.customFields});
		this.props.dispatch(setcustomFields(data.customFields));
		// this.setState({fields: _.concat(data.fields, data.customFields)});
		this.props.dispatch(setfields(_.concat(data.fields, data.customFields)));

		var providedFieldsId = _.map(data.fields, function(item){ return item.id });
		_.forEach(document.getElementsByName("checkboxField[]"), function(item){
      if (_.indexOf(providedFieldsId, item.value) > -1)
      	item.checked = true;
    });
	},
	checkSlug: function(slug){
    var me = this;
    // this.setState({checkingSlug: true});
    this.props.dispatch(setcheckingSlug(true));
    riques( Query.checkContentSlugQry(slug),
      function(error, response, body) {
        if (!error && !body.errors && response.statusCode === 200) {
          var slugCount = body.data.viewer.allContents.edges.length;
          if (me.props.mode==="create") {
            if (slugCount > 0) { 
            	// me.setState({checkingSlug: false, slug: slug+"-"+slugCount});
            	me.props.dispatch(togglecheckingSlug(false, slug+"-"+slugCount)); 
            	setValue('slug', slug+"-"+slugCount)
            } else 
            	// me.setState({checkingSlug: false, slug: slug});
            	me.props.dispatch(togglecheckingSlug(false, slug));
          } else {
            if (slugCount > 1) { 
            	// me.setState({checkingSlug: false, slug: slug+"-"+slugCount}); 
            	me.props.dispatch(togglecheckingSlug(false, slug+"-"+slugCount));
            	setValue('slug', slug+"-"+slugCount)
            }
            else 
            	// me.setState({checkingSlug: false, slug: slug});
            	me.props.dispatch(togglecheckingSlug(false, slug));
          }
        } else {
          errorCallback(error, body.errors?body.errors[0].message:null);
        }
        // me.setState({checkingSlug: false});
        me.props.dispatch(setcheckingSlug(false));
      }
    );
  },
  handleNameBlur: function(event) {
  	debugger
    var name = getValue("name");
    var slug = name.split(" ").join("-").toLowerCase();
    setValue("slug", slug);
    this.checkSlug(slug);

    var label = getValue("label");
    var labelSingular = getValue("labelSingular");
    var labelAddNew = getValue("labelAddNew");
    var labelEdit = getValue("labelEdit");
    // this.setState({
    // 	label: label?null:name+"s",
    // 	labelSingular: labelSingular?null:name,
    // 	labelAddNew: labelAddNew?null:"Add "+name,
    // 	labelEdit: labelEdit?null:"Edit "+name
    // });
    this.props.dispatch(NameBlur(
    	label?null:name+"s",
    	labelSingular?null:name,
    	labelAddNew?null:"Add "+name,
    	labelEdit?null:"Edit "+name
    ));
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
		debugger
		event.preventDefault();
		var me = this;
		var _objData = getFormData('rdt-input-form', 'object');
		_objData['fields'] = this.props.providedFields;
		_objData['customFields'] = this.props.customFields;

		var status = "inactive";
		var statusEl = document.getElementById("status");
		if (statusEl) status = statusEl.checked?"active":"inactive";
		_objData['status'] = status;

		this.disableForm(true);

		var qry = "";
	    if (this.props.mode==="create"){
	      qry = Query.createContentMtn(_objData);
	    }else{
	      _objData["id"] = this.props.postId;
	      qry = Query.updateContentMtn(_objData);
	    }
	  
		riques(qry, 
			function(error, response, body){
				if(!error && !body.errors) {
					me.disableForm(false);
					//me.resetForm();
				} else {
					errorCallback(error, body.errors?body.errors[0].message:null);
				}
			}
		);
	}, 
	handleAddProvidedField: function(event){
		var me = this;
		var providedFields = [];
		var allProvidedField = _.concat(me.providedFields, me.defaultFields);

		var checkedFields = _.filter(document.getElementsByName("checkboxField[]"), function(item){
      return item.checked
    });
    
    _.forEach(checkedFields, function(item){
    	var newField = _.find(allProvidedField, {id: item.value});
			if (newField) providedFields.push(newField);
    })
		// this.setState({providedFields: providedFields, fields: _.concat(providedFields, this.state.customFields)});
		this.props.dispatch(setprovidedFields(providedFields));
		this.props.dispatch(setfields(_.concat(providedFields, this.props.customFields)));
	},
	handleAddCustomField: function(event){
		event.preventDefault();
		var customFields = this.props.customFields;
		var name = getValue("field-name");
		var type = getValue("field-type");
		var width = getValue("field-width");
		var align = getValue("field-align");
		var connection = getValue("connection");

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
			align:align?align:"left",
			connection: connection?connection:null
		};
		customFields.push(newField);
		// this.setState({customFields: customFields, fields: _.concat(this.state.providedFields, customFields)});
		this.props.dispatch(setcustomFields(customFields));
		this.props.dispatch(setfields(_.concat(this.props.providedFields, customFields)))
	},
	handleFieldDelete: function(event){
		event.preventDefault();
		var name = event.target.getAttribute("data");
		var cfields = this.props.customFields;
		var pfields = this.props.providedFields;
		
		var record = _.find(cfields, {label: name});
		if (record) {
			_.pull(cfields, record);
			// this.setState({customFields: cfields});
			this.props.dispatch(setcustomFields(cfields));
		}

		var precord = _.find(pfields, {label: name});
		if (precord) {
			_.pull(pfields, precord);
			// this.setState({providedFields: pfields});
			this.props.dispatch(setprovidedFields(pfields));
			_.forEach(document.getElementsByName("checkboxField[]"), function(item){ if (item.value===precord.id) item.checked=false});
		}

		// this.setState({fields: _.concat(cfields, pfields)});
		this.props.dispatch(setfields(_.concat(cfields, pfields)));
	},
	handleAddNewBtn: function(event) {
    this.resetForm();
  },
  handleFieldTypeChange: function(event) {
  	var value = event.target.value;
  	var isConnection = value==="connection";
  	document.getElementById("connection").disabled = !isConnection;
  },
	resetForm: function(){
		document.getElementById("contentForm").reset();
		window.history.pushState("", "", '/admin/content/new');
		// this.setState({mode: "create", fields: this.defaultFields})
		this.props.dispatch(setmode("create"));
		this.props.dispatch(setfields(this.defaultFields));
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
			      <h1>{this.props.mode==="update"?"Edit Content Type":"Add New Content Type"}
              { this.props.mode==="update" &&
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

			    			{ this.props.mode === "update" &&
			    			<div className="form-group">
			          	<label htmlFor="fields" className="col-md-3">Content type status</label>
							  	<div className="col-md-9">
							  		<div className="checkbox"><label><input type="checkbox" name="status" id="status" value="active" />Content type is active</label></div>
							  	</div>
							  </div>
								}

					  		<div className="form-group">
								 	<label htmlFor="name" className="col-md-3">Name</label>
								 	<div className="col-md-9">
										<Field name="name" component="input" type="text" className="form-control" onBlur={this.handleNameBlur} style={{width: 'auto'}}/>
										<p className="help-block">The new post type system name ( max. 20 characters ). Min 2 letters. Once added the post type system name cannot be changed.</p>
									</div>
								</div>

								<div className="form-group">
								 	<label htmlFor="slug" className="col-md-3">Slug</label>
							  	<div className="col-md-9">
							  		<div className="form-inline">
							  			<Field name="slug" component="input" type="text" className="form-control" onBlur={this.handleNameBlur} />
											{ this.props.checkingSlug && <i style={{marginLeft:5}} className="fa fa-spin fa-refresh"></i>}
											<p className="help-block">ID for the custom content type ( max. 20 characters ). Alphanumeric lower-case characters and underscores only. Min 2 letters. Once added the post type system name cannot be changed.</p>
										</div>
									</div>
								</div>

								<div className="form-group">
								 	<label htmlFor="description" className="col-md-3">Description</label>
							  	<div className="col-md-9">
							  		<div className="form-inline">
											<Field name="description" component="input" type="text" className="form-control"/>
											<p className="help-block">A short descriptive summary of what the post type is.</p>
										</div>
									</div>
								</div>

								<div className="form-group">
								 	<label htmlFor="name" className="col-md-3">Menu icon</label>
								 	<div className="col-md-9">
										<Field name="menuIcon" component="input" type="text" className="form-control" style={{width: 'auto'}} />
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
	                  	})
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
							  		<div className="form" >
							  			<div className="form-group">
							  				<div className="col-md-3">
							  					<label htmlFor="fields">Field Name</label>
								  			</div>
								  			<div className="col-md-9">
								  				<input type="text" id="field-name" placeholder="Field name" className="form-control"/> 
								  			</div>
							  			</div>

							  			<div className="form-group">
							  				<div className="col-md-3">
							  					<label htmlFor="fields">Field Type</label>
								  			</div>
								  			<div className="col-md-9">
								  				<select id="field-type" className="form-control select" onChange={this.handleFieldTypeChange}>
														<option value="text">String</option>
														<option value="text">Number</option>
														<option value="date">Date</option>
														<option value="link">Link</option>
														<option value="image">Image</option>
														<option value="connection">Connection</option>
													</select> 
								  			</div>
							  			</div>

							  			<div className="form-group">
							  				<div className="col-md-3">
							  					<label htmlFor="fields">Connect to other content</label>
								  			</div>
								  			<div className="col-md-9">
								  				<select id="connection" className="form-control select" disabled="true">
														<option value="testing">Testing</option>
														<option value="developer">Developer</option>
													</select>
								  			</div>
							  			</div>

							  			<div className="form-group">
							  				<div className="col-md-3">
							  					<label htmlFor="fields">Width</label>
								  			</div>
								  			<div className="col-md-9">
								  				<input type="text" id="field-width" placeholder="Width" className="form-control"/> 
								  			</div>
							  			</div>
												
											<div className="form-group">
							  				<div className="col-md-3">
							  					<label htmlFor="fields">Align</label>
								  			</div>
								  			<div className="col-md-9">
								  				<select id="field-align" className="form-control select">
														<option value="left">Left</option>
														<option value="right">Right</option>
														<option value="center">Center</option>
													</select> 	
								  			</div>
							  			</div>	

							  			<div className="form-group">
							  				<div className="col-md-3">
							  					<label htmlFor="fields">Position in editor</label>
								  			</div>
								  			<div className="col-md-9">
								  				<select id="field-align" className="form-control select">
														<option value="left">Left</option>
														<option value="right">Right</option>
													</select> 	
								  			</div>
							  			</div>	
												
											<input type="button" value="Add" className="form-control btn btn-primary " onClick={this.handleAddCustomField}/> 
										</div>
										<h4>Current fields</h4>
										{
											this.props.fields.map(function(item){
												return <ContentField 
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
											<Field name="label" component="input" type="text" placeholder={this.props.label} className="form-control" style={{width: 'auto'}} />
										</div>
									</div>

									<div className="form-group">
									 	<label htmlFor="label-singular" className="col-md-3">Singular Name</label>
									 	<div className="col-md-9">
											<Field name="labelSingular" component="input" type="text" placeholder={this.props.labelSingular} className="form-control" style={{width: 'auto'}} />
										</div>
									</div>

									<div className="form-group">
									 	<label htmlFor="label-add-new" className="col-md-3">Add New</label>
									 	<div className="col-md-9">
											<Field name="labelAddNew" component="input" type="text" placeholder={this.props.labelAddNew} className="form-control" style={{width: 'auto'}} />
										</div>
									</div>

									<div className="form-group">
									 	<label htmlFor="label-edit" className="col-md-3">Edit</label>
									 	<div className="col-md-9">
											<Field name="labelEdit" component="input" type="text" placeholder={this.props.labelEdit} className="form-control" style={{width: 'auto'}} />
										</div>
									</div>
		            </div>
								
								<div className="form-group">
									<div className="col-md-9">
										<div className="btn-group">
											<input type="submit" value={this.props.mode==="update"?"Update":"Add"} className="btn btn-primary btn-sm" />
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

const mapStateToProps = function(state){
	if (!_.isEmpty(state.contentNew)) {
		var out = _.head(state.contentNew);
		out["initialValues"] = out.data;
		return out;
	} else return {}
}

ContentNew = reduxForm({
  form: 'newContentForm'
})(ContentNew);
ContentNew = connect(mapStateToProps)(ContentNew);
export default ContentNew;
