import React from 'react';
import _ from 'lodash';
import Notification from 'react-notification-system';
import Halogen from 'halogen';
import Query from '../query';
import {disableForm, defaultHalogenStyle} from '../../utils';
import ColorPicker from 'rc-color-picker';
import 'rc-color-picker/assets/index.css';
import {connect} from 'react-redux'
import {maskArea} from '../../actions'
import {reduxForm, Field, formValueSelector} from 'redux-form'
import gql from 'graphql-tag'
import {graphql, withApollo} from 'react-apollo'

let Customize = React.createClass({
	propTypes: {
    isLoading: React.PropTypes.bool.isRequired,
    opacity: React.PropTypes.number.isRequired,
  },
  getDefaultProps: function() {
    return {
      isLoading: false,
      opacity: 1
    }
  },
	disableForm: function(state){
    disableForm(state, this.notification);
    this.props.dispatch(maskArea(state));
  },
	handleSubmitBtn: function(values){
		var me = this;
		this.disableForm(true);

		var qry = Query.createUpdateSettingsMtn([values]);
		this.props.client.mutate({
      mutation: gql`
      	mutation ($input0: UpdateOptionsInput!, $input1: UpdateOptionsInput!) { 
      		UpdateOptions0 : updateOptions(input: $input0){ changedOptions{ id item value } }
      		UpdateOptions1 : updateOptions(input: $input1){ changedOptions{ id item value } }
      	}
      `,
      variables: {
      	input0: {
      		id: this.props.fieldIdMap["name"],
      		item: "name",
      		value: values.name
      	},
      	input1: {
      		id: this.props.fieldIdMap["tagline"],
      		item: "tagline",
      		value: values.tagline
      	}
      }
    }).then(data => {
    	me.disableForm(false);
    });
	}, 
	handleBgColorChange: function(){

	},
	componentDidMount: function(){
		this.notification = this.refs.notificationSystem;
		var bodyClass= document.getElementById("body").className;
		document.getElementById("body").className = bodyClass + " " + "sidebar-collapse";
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
			      { this.props.isLoading &&
            <div style={defaultHalogenStyle}><Halogen.PulseLoader color="#4DAF7C"/></div>                   
            }
			    </section>
			    <Notification ref="notificationSystem" />

			    <section className="content">
			    	<div className="row">
					  	<div className="col-md-3" style={{width: "20%"}}>
						  	<section className="content">
				    			<form onSubmit={this.props.handleSubmit(this.handleSubmitBtn)} className="form-horizontal" style={{opacity: this.props.opacity}}>
				    				
				    				<div className="form-group">
									  	<label htmlFor="name">Website name</label>
									  	<Field name="name" component="input" type="text" className="form-control"/>
									  	<p className="help-block">Website name, will shows up in <code>title</code> tag</p>
										</div>

						  			<div className="form-group">
									  	<label htmlFor="tagline">Tagline</label>
									  	<Field name="tagline" component="input" type="text" className="form-control"/>
									  	<p className="help-block">Few words that describes your web, example: a bunch of words of mine</p>
										</div>

										<div className="form-group">
									  	<label htmlFor="logo">Logo</label>
									  	<Field name="logo" component="input" type="file" onChange={this.featuredImageChange}/>
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

const selector = formValueSelector('customizeForm')

const mapStateToProps = function(state){
  if (!_.isEmpty(state.customize)) {
    return _.head(state.customize)
  } else return {}
}

Customize = reduxForm({
  form: 'customizeForm'
})(Customize)


Customize = connect(mapStateToProps)(Customize)

Customize = graphql(gql`${Query.loadSettingsQry.query}`, {
  props: ({ownProps, data}) => {
  	
    if (data.viewer) {
    	var _data = {}
    	var _idMap = {}
    	_.forEach(data.viewer.allOptions.edges, function(item){
    		_data[item.node.item] = item.node.value;
    		_idMap[item.node.item] = item.node.id;
			});
    	return {
        initialValues: _data,
        fieldIdMap: _idMap
      }
    }
  }
})(Customize);

Customize = withApollo(Customize);

export default Customize;