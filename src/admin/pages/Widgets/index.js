import React from 'react';
import _ from 'lodash';
import {riques, swalert, errorCallback} from '../../../utils';
import Query from '../../query';
import BoxItemAvailable from './BoxItemAvailable';
import WidgetAreaContainer from './WidgetAreaContainer';
import {connect} from 'react-redux';
import {
  loadWidgetAreasSuccess, 
  addWidgetToWidgetArea, 
  removeAllWidgetsFromWidgetArea,
  removeSingleWidgetFromWidgetArea,
  updateWidgetsOrder,
  loadWidgetsAvailableSuccess
} from '../../../actions'


class Widgets extends React.Component {
    constructor(props){
        super(props);

      this.handleAddToWidgetArea = this.handleAddToWidgetArea.bind(this);
      this.handleRemoveSingleWidget = this.handleRemoveSingleWidget.bind(this);
      this.handleWidgetSort = this.handleWidgetSort.bind(this);

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


    handleAddToWidgetArea(id, widget){
      // params id => widgetAreaId
      this.props.dispatch(addWidgetToWidgetArea(id, widget))

    }

    handleRemoveSingleWidget(id, widgetAreaId){
        // params id === id or uuid the widget
        swalert("warning", "Sure want to remove this widget?", "", () => {
          this.props.dispatch(removeSingleWidgetFromWidgetArea(id, widgetAreaId))
        })
    
    }

  handleWidgetSort(widgetAreaId, widgets){
    this.props.dispatch(updateWidgetsOrder(widgetAreaId, widgets));
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

		return (
			<div className="content-wrapper">
			<div className="container-fluid">
                
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

                <div className="row">
                <div style={{paddingRight: 60, paddingLeft: 60}}>
                <p className="lead">To active the widget click Add to button after selecting a widget area. To deactivate a widget and its settings you can click Clear All button in each widget area or click the close button in each widget. Also, you can drag-n-drop widget to reorder position</p>
                </div>

                <div className="col-md-8">
                {
                    _.map(this.props.widgetAreas, function(item, index){
                      return <WidgetAreaContainer 
                        id={item.id}
                        key={index} 
                        title={item.id}
                        widgets={item.widgets}
                        addToWidgetArea={this.handleAddToWidgetArea}
                        sortWidgets={this.handleWidgetSort}
                        handleRemoveSingleWidget={this.handleRemoveSingleWidget}
                        />
                    }.bind(this))
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
                                            <BoxItemAvailable widget={widget.node} widgetAreas={this.props.widgetAreas} handleAddToWidgetArea={this.handleAddToWidgetArea}/>
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
    widgetsAvailable: state.widgets.widgetsAvailable
  }
}

Widgets = connect(mapStateToProps)(Widgets);

export default Widgets;
