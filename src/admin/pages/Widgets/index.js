import React from 'react';
import _ from 'lodash';
import {toWidgetAreaStructure,  defaultHalogenStyle, errorCallback, getActiveWidgetArea} from '../../../utils';
import BoxItemAvailable from './BoxItemAvailable';
import WidgetAreaContainer from './WidgetAreaContainer';
import {connect} from 'react-redux';
import Notification from 'react-notification-system';
import Halogen from 'halogen';
import {withApollo, graphql} from 'react-apollo';
import gql from 'graphql-tag';
import {
  maskArea,
} from '../../../actions';

class Widgets extends React.Component {
  constructor(props){
    super(props);

    var c = window.config;
    //var themeFunctions = require('themes/'+c.path+'/functions.js');
    //themeFunctions.default();
  }

  componentWillReceiveProps(props){
    if(!props.isLoading && this.props.isLoading){
      props.dispatch(maskArea(false))
    } 
  }

  componentDidMount(){
    require ('jquery-ui/themes/base/theme.css');
    require ('../../../css/AdminLTE.css');
    require ('../../../css/skins/_all-skins.css');
    require('./custom.css');
  }

  componentWillMount(){
    if(this.props.isLoading){
      this.props.dispatch(maskArea(true))
    }
  }


	render(){
		return (
			<div className="content-wrapper">
			<div className="container-fluid" style={{opacity: this.props.opacity}}>
        <Notification ref="notificationSystem"/>
                
				<section className="content-header">
		      <h1>
		        Widget Management Page
		      </h1>
		      <ol className="breadcrumb">
		        <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
		        <li className="active">Widget</li>
		      </ol>
		      <div style={{borderBottom:"#eee" , borderBottomStyle:"groove", borderWidth:2, marginTop: 10}}></div>
		    </section>
        <section className="content">
          <div className="notifications-wrapper"></div>

            <div className="row" >
              <div className="col-md-12">
                <p>To active the widget click Add to button after selecting a widget area. To deactivate a widget and its settings you can click Clear All button in each widget area or click the close button in each widget. Also, you can drag-n-drop widget to reorder position</p>
              </div>
            </div>
            <div className="row">

              <div className="col-md-8 masonry">
              {
                _.map(this.props.widgetAreas, (item, index) => {
                    return <WidgetAreaContainer 
                      id={item.id}
                      key={index} 
                      title={item.id}
                      widgets={item.widgets}
                      notif={this.refs.notificationSystem}
                      initialValues={this.props.initialValues}
                      />
                  })
              }
              </div>
              <div className="col-md-4 pull-right">
                <div className="box box-primary">
                  <div className="box-header with-border">
                      <h3 className="box-title">Available widgets</h3>
                  </div>
                  <div className="box-body">
                    <div className="row">
                      <ul id="widgetAvailables" className="widgets no-drop list-unstyled">
                          {_.map(this.props.widgetsAvailable, (widget, index) => (
                            <div className='col-md-12' key={index}>
                              <BoxItemAvailable 
                                widget={widget.node}
                                widgetAreas={this.props.widgetAreas}
                              />

                            </div>
                          ))}

                      </ul>
                    </div>
                  </div>
                </div>
              </div> 
            </div>

              {this.props.isProcessing &&
                <div style={defaultHalogenStyle}><Halogen.PulseLoader color="#4DAF7C"/></div>
              }
          </section>
		    </div>
      </div>
		)
	}
}

Widgets.propTypes = {
  widgetAreas : React.PropTypes.array.isRequired,
  widgetsAvailable: React.PropTypes.array.isRequired
}

Widgets.defaultProps = {
  widgetAreas: [],
  widgetsAvailable: []
}

const mapStateToProps = (state) => {
  return {
    opacity: state.maskArea.opacity,
    isProcessing: state.maskArea.isProcessing
  }
}

Widgets = connect(mapStateToProps)(Widgets);

let widgetQry = gql`
query {
  viewer {
    listOfWidget : allOptions(where: {item: {eq: "listOfWidget"}}) {
      edges {
        node {
          item
          value
        }
      }
    }
  }

  viewer {
    allWidgets: allOptions(where: {item: {like: "widget_%"}}) {
      edges {
        node {
          id
          item
          value
        }
      }
    }
    allActiveWidget: allOptions(where: {item: {like: "activeWidget#%"}}) {
      edges {
        node {
          id
          item
          value
        }
      }
    }
  }
}
`

Widgets = graphql(widgetQry, {
  props: ({ownProps, data}) => {
    if (data.loading) {
      return {
        isLoading: true,
        widgetAreas: getActiveWidgetArea()
      }
    } else if(data.error) {
      console.log(data.error)
      errorCallback(data.error, data.error, data.error)
       return {hasError: true}
    } else {

      let allWidgets = data.viewer.allWidgets.edges
      let listOfWidget = _.head(data.viewer.listOfWidget.edges)

      let _listOfWidget = JSON.parse(listOfWidget && listOfWidget.node.value) || {}
      
      _listOfWidget = toWidgetAreaStructure(allWidgets, _listOfWidget)

        let allActiveWidget = _.map(data.viewer.allActiveWidget.edges, item => item.node)
        let initials = {}

        _.forEach(allActiveWidget, widget => {
          let uuid = widget.item.split("#")[1]
          initials[uuid] = JSON.parse(widget.value)
        })


      return {
        isLoading: false,
        widgetsAvailable: allWidgets,
        widgetAreas : _listOfWidget,
        initialValues: initials
      }
    }

  }
})(Widgets)
Widgets = withApollo(Widgets)

//Widgets = connect(mapStateToProps)(Widgets);
export default Widgets;
