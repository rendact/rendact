import React from 'react'
import _ from 'lodash'
import {reduxForm, Field} from 'redux-form'
import {connect} from 'react-redux'
import {setWidgetData} from '../../actions'
import {riques, swalert} from '../../utils'
import Query from '../../admin/query';

class Widget extends React.Component {
  constructor(props){
    super(props)
  }

  getDefaultProps() {
    return {
      widgetData: {}
    }
  }

  componentDidMount(){
    var me = this;
    riques(Query.findWidget(this.props.widgetId, this.props.widgetName),
      (error, response, data) => {
        if (!error) {
          let found = data.data.viewer.allOptions.edges
          if (found) {
            me.props.dispatch(setWidgetData(JSON.parse(found[0].node.value)))
          }
        }
      }
    );	
  }

  render(){
    return <ul>{this.props.widgetData && this.props.widgetData.text}</ul>
  }
}

Widget.propTypes = {
  widgetData: React.PropTypes.object
};

const mapStateToProps = function(state){
	if (!_.isEmpty(state.widgets)) {
		return state.widgets
  } else return {};
}
Widget = connect(mapStateToProps)(Widget);

const WidgetFn = (id, name) => {
	return (
    <Widget widgetId={id} widgetName={name}/>
	)
}

export default WidgetFn;

export const widgetForm = (id) => {
	return (
    <div className="form-group">
      <label htmlFor="description">Text</label>
      <Field name={id+".text"} className="form-control" component='textarea'/>
    </div>
  )
}
