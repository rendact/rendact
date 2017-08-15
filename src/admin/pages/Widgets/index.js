import React from 'react';
import _ from 'lodash';
import {riques, errorCallback, defaultHalogenStyle} from '../../../utils';
import Query from '../../query';
import BoxItemAvailable from './BoxItemAvailable';
import WidgetAreaContainer from './WidgetAreaContainer';
import {connect} from 'react-redux';
import {
  loadWidgetAreasSuccess, 
  loadWidgetsAvailableSuccess
} from '../../../actions'
import Notification from 'react-notification-system';
import Halogen from 'halogen';


class Widgets extends React.Component {
    constructor(props){
        super(props);


      var themeFunctions = require('../../../theme/default/functions.js');
        themeFunctions.default();
    }

    componentDidMount(){


        require ('jquery-ui/themes/base/theme.css');
      require ('../../../../public/css/AdminLTE.css');
      require ('../../../../public/css/skins/_all-skins.css');
      require('./custom.css')

        var activeWidgetArea = localStorage.getItem("activeWidgetArea");
        activeWidgetArea = activeWidgetArea.split(",");

        var _newWidgetArea = []
        _.forEach(activeWidgetArea, function(item){
            _newWidgetArea.push({
                id: item,
                widgets: []
            })
        });
        this.props.dispatch(loadWidgetAreasSuccess(_newWidgetArea));
    }

    componentWillMount(){
        /*
         * all registered widget
         */
        riques(Query.getAllWidgets,
            (error, response, data) => {
                if (!error && !data.errors && response.statusCode === 200){
                  this.props.dispatch(loadWidgetsAvailableSuccess(data.data.viewer.allOptions.edges))
                } else {
              errorCallback(error, data.errors?data.errors[0].message:null);
            }
            }
        )

    }


	render(){
    let me = this;

		return (
			<div className="content-wrapper">
			<div className="container-fluid">
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
                <div className="notifications-wrapper"></div>

                <div className="row" style={{opacity: this.props.opacity}}>
                  {this.props.isProcessing &&
                    <div style={defaultHalogenStyle}><Halogen.PulseLoader color="#4DAF7C"/></div>
                  }
                <div style={{paddingRight: 60, paddingLeft: 60}}>
                <p className="lead">To active the widget click Add to button after selecting a widget area. To deactivate a widget and its settings you can click Clear All button in each widget area or click the close button in each widget. Also, you can drag-n-drop widget to reorder position</p>
                </div>

                <div className="col-md-8 masonry">
                {
                    _.map(this.props.widgetAreas, function(item, index){
                      return <WidgetAreaContainer 
                        id={item.id}
                        key={index} 
                        title={item.id}
                        widgets={item.widgets}
                        notif={me.refs.notificationSystem}
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
                                            <BoxItemAvailable widget={widget.node}/>

                                          </div>
                                    ))}

                                </ul>
                                                
                                </div>
                            </div>
                        </div>
                    </div> 
                </div>
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
    widgetAreas: state.widgets.widgetAreas,
    widgetsAvailable: state.widgets.widgetsAvailable,
    opacity: state.maskArea.opacity,
    isProcessing: state.maskArea.isProcessing
  }
}

Widgets = connect(mapStateToProps)(Widgets);

export default Widgets;
