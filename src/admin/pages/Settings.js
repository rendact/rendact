import React from 'react'
import _ from 'lodash'
import Notification from 'react-notification-system'
import Halogen from 'halogen'
import Query from '../query'
import {riques, errorCallback, getFormData, disableForm, defaultHalogenStyle} from '../../utils'
import {connect} from 'react-redux'
import {maskArea, loadFormData} from '../../actions'
import {reduxForm, Field, formValueSelector} from 'redux-form'
import gql from 'graphql-tag'
import {graphql, withApollo} from 'react-apollo'

const SettingField = ({name, title, help}) => (
    <div className="form-group">
        <label htmlFor={name} className="col-md-3">{title}</label>
        <div className="col-md-9">
        <Field name={name} component="input" type="text" className="form-control"/>
        {help &&
          <p className="help-block">{help}</p>
        }
      </div>
    </div>
)

const TabPanel = (props) => (
    <div role="tabpanel" className={props.active ? "tab-pane active" : "tab-pane"} id={props.id} style={{margin: 20}}>
      {props.children}
    </div>
)

const GeneralTab = (props) => (
<div>
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
)

let HomepageTab = (props) => (
  <div>
    <div className="form-group">
        <label htmlFor="frontPage" className="col-md-3">Front Page Displays</label>
        <div className="col-md-9">
          <div>
        <Field name="frontPage" component="input" type="radio" value="latestPost"/> Your latest posts
      </div>
      <div>
        <Field name="frontPage" component="input" type="radio" value="page"/> A static page (select below)
      </div>
      <div>
        { props.frontPage === "page" &&
        <Field name="pageAsHomePage" component="select" className="form-control">
          <option value="">Select a page</option>
          {
            _.map(props.pageListOption, (opt, index) => (
              <option value={opt.value} key={index}>{opt.label}</option>
            ))
          }
        </Field>
        }
      </div>
      </div>
    </div>
  </div>
)

HomepageTab = graphql(gql`${Query.getPageListQry("Published").query}`, {
  props: ({ownProps, data}) => {
    if (!data.loading) {
      let pageList = data.viewer.allPosts.edges

      let pageListOption = _.map(pageList, item => ({value: item.node.id, label: item.node.title}))

      return {
        pageListOption
      }
    }
    return {pageListOption: []}
  }
})(HomepageTab)


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
	handleSubmitBtn: function(values){
    let toSave = []

    _.forIn(values, (val, key) => {
      toSave.push({
        id: this.props.mapSettingsWithId[key],
        item: key,
        value: val
      })
    })

    let query = Query.createUpdateSettingsMtn(toSave)
    this.props.dispatch(maskArea(true))
    disableForm(true)

    this.props.client.mutate({
      mutation: gql`${query.query}`,
      variables: query.variables
    }).then(data => {
      console.log(data)

      let createIndexFound = _.findIndex(_.keys(data.data), (o) => o.match(/CreateOptions/g))

      if (createIndexFound >= 0){
        this.props.refetchAll()
      }

      this.props.dispatch(maskArea(false))
      disableForm(false)
    })
	}, 
	componentDidMount: function(){
    debugger
		this.notification = this.refs.notificationSystem;
	},

  componentWillMount: function(){
    if(this.props.isLoading){
      this.props.dispatch(maskArea(true))
      disableForm(true)
    }
  },

  componentWillReceiveProps(props){
    if(this.props.isLoading && !props.isLoading){
      props.dispatch(maskArea(false))
      disableForm(false)
    }
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
			    			<form onSubmit={this.props.handleSubmit(this.handleSubmitBtn)} className="form-horizontal" style={{opacity: this.props.opacity}} >

                  <ul className="nav nav-tabs" role="tablist">
                    <li role="presentation" className="active"><a href="#general" aria-controls="home" role="tab" data-toggle="tab">General</a></li>
                    <li role="presentation" ><a href="#homepage" aria-controls="homepage" role="tab" data-toggle="tab">Homepage</a></li>
                  </ul>


                  <div className="tab-content">
                    <TabPanel id="general" active>
                      <GeneralTab/>
                    </TabPanel>

                    <TabPanel id="homepage">
                      <HomepageTab frontPage={this.props.frontPage}/>
                    </TabPanel>
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

const selector = formValueSelector('settingsForm')

const mapStateToProps = (state) => {
  let customProps = {
    frontPage: selector(state, 'frontPage')
  }

  return {
    ...state.settings,
    ...customProps,
    ...state.maskArea
  }
}

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
      let settings = [
        "name", "tagline", "keywords", "rootUrl",
        "adminEmail", "timeZone", "dbApiUrl", "auth0ClientId",
        "auth0Domain", "mailApiUrl", "mailApiKey", "frontPage",
        "pageAsHomePage", "mailDefaultSender"
      ]

    	var _data = {}
      var mapSettingsWithId = {}
			_.forEach(data.viewer.allOptions.edges, function(item){
        if(_.indexOf(settings, item.node.item) > -1){
          _data[item.node.item] = item.node.value;
          mapSettingsWithId[item.node.item] = item.node.id
        }
			});
	return {
    isLoading: false,
    initialValues: _data,
    mapSettingsWithId,
    refetchAll: data.refetch
    }
	}
	}
})(Settings)

Settings = withApollo(Settings)

export default Settings;
