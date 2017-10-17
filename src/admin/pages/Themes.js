import React from 'react';
import _ from 'lodash';
import Notification from 'react-notification-system';
import {connect} from 'react-redux'
import gql from 'graphql-tag';
import {graphql, withApollo} from 'react-apollo'
import {getConfig, disableForm} from '../../utils'
import {saveConfig} from '../../utils/saveConfig'
import {setThemesList} from '../../actions'

const getThemesQry = gql`
  query getThemes{
    viewer {
      allThemes {
        edges {
          node {
            id,
            name,
            description,
            screenshot {
              id
              blobUrl
            }
          }
        }
      }
    }
  }
`

var Themes = React.createClass({
  getDefaultProps() {
      return {
        themes: [],
        activeTheme: JSON.parse(getConfig("activeTheme")),
        opacity: 1
      }
  },

  handleChangeTheme: function(e){
    var me = this;
    var value = {}

    var themeName = e.currentTarget.getAttribute("data");
    var themeData = _.find(this.props.themes, {node: {name: themeName}}).node;

    disableForm(true);
    this.props.client.mutate({
      mutation: gql`
        mutation ($input: UpdateOptionsInput!){
          updateOptions(input: $input){
            changedOptions {
              id
              item
              value
            }
          }
        }
      `,
      variables: {
        "input": {
          "id": "T3B0aW9uczo5NQ==",
          "value": JSON.stringify(themeData)
        }
      }
    }).then(data => {
      disableForm(false);
      me.notification.addNotification({
        message: "Theme changed",
        level: 'success',
        position: 'tr',
        autoDismiss: 2
      });
      saveConfig("activeTheme", JSON.stringify(themeData));

      me.props.client.query({
        query: getThemesQry
      }).then(body => {
        var data = _.clone(body.data.viewer.allThemes.edges); 
        var activeTheme = _.find(data, {node: {name: themeData.name}});
        _.remove(data, {node: {name: themeData.name}});
        me.props.dispatch(setThemesList(_.concat(activeTheme, data)))
      })
    })

  },

  onMouseOver(e) {
    e.preventDefault();
    let state = this.state;    // I grab the current state object
    state.hovering = true;
    this.setState(state);
  },

  onMouseOut(e) {
    e.preventDefault();
    let state = this.state;    // As above, I grab the current state object
    state.hovering = false;
    this.setState(state);
  },

  componentDidMount(){
    this.notification = this.refs.notificationSystem;
  },

	render: function(){
		let state = this.state;
		return (
			<div className="content-wrapper">
        <div className="container-fluid">
				<section className="content-header">
          <h1>Theme List
            <small style={{marginLeft: 5}}>
              <button className="btn btn-default btn-primary add-new-post-btn">Add new</button>
            </small>
          </h1>
    			<ol className="breadcrumb">
      			<li><a href="#"><i className="fa fa-dashboard"></i>Home</a></li>
      			<li className="active">Themes</li>
    			</ol>
          <div style={{borderBottom:"#eee" , borderBottomStyle:"groove", borderWidth:2, marginTop: 10}}></div>
			 </section>
       <Notification ref="notificationSystem" />

			    <section className="content">
            <div className="row">
              <div className="col-md-12">
                <input type="input" style={{width: 200, marginTop: 10, marginBottom: 20}} placeholder="Search themes..." className="form-control pull-right"/>
              </div>
            </div>
        			<div className="row">
            			<div className="col-md-12 col-sm-6 col-xs-12">
                    {
                      this.props.themes.map(function(item){
                        return <div className="col-md-4" key={item.node.id}>
                                <div className="show-image">
                                    <div className="thumbnail" style={{paddingBottom: 50}}>
                                    <img src={item.node.screenshot?item.node.screenshot.blobUrl:""} alt="" />
                                    <div className="caption">
                                          <h3>{item.node.name}</h3>
                                          <p>{item.node.description}</p>
                                          <p><div className="pull-right box-tools">
                                            <button href="#"  className="btn btn-primary" style={{marginRight:10}} data={item.node.name} onClick={this.handleChangeTheme}>
                                              {this.props.activeTheme.name===item.node.name?"Customize":"Activate"}
                                            </button>
                                            <button href="#" className="btn btn-default">Preview</button>
                                          </div>
                                          </p>
                                        </div>
                                  </div>
                                </div>
                              </div>
                      }.bind(this))
                    }
            			</div>
					   </div>
        		</section>
          </div>
		    </div>
		)
	}
});

const mapStateToProps = function(state){
  if (!_.isEmpty(state.themeList)) {
    var _states = _.head(state.themeList);
    return {..._states}
  } else 
    return {}
}

Themes = connect(mapStateToProps)(Themes);

Themes = graphql(getThemesQry, {
  props: ({ownProps, data}) => {
    if (data.viewer) {
      var activeThemeConfig = JSON.parse(getConfig("activeTheme"));
      var data = _.clone(data.viewer.allThemes.edges); 
      var activeTheme = _.find(data, {node: {name: activeThemeConfig.name}});
      _.remove(data, {node: {name: activeThemeConfig.name}});
      return {
        themes: _.concat(activeTheme, data)
      }
    } 
  }
})(Themes);

Themes = withApollo(Themes);

export default Themes;
