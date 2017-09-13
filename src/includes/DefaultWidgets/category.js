import React from 'react'
import _ from 'lodash'
import {connect} from 'react-redux'
import {setAllCategoryList} from '../../actions'
import {riques} from '../../utils'
import Query from '../../admin/query';

class Widget extends React.Component {
  constructor(props){
    super(props)

    this.onClick = this.onClick.bind(this)
  }

  onClick(e){
  	e.preventDefault();
    var id = e.currentTarget.id;
		this._reactInternalInstance._context.history.push('/category/'+id);
  }

  componentDidMount(){
  	var me = this;
  	riques(Query.getAllCategoryQry("post"), 
      function(error, response, body) {
        if (!error) {
          var categoryList = [];
          _.forEach(body.data.viewer.allCategories.edges, function(item){
            categoryList.push((<li key={item.node.id}><a href={"/category/"+item.node.id} id={item.node.id} onClick={me.onClick}>{item.node.name}</a></li>));
          });
          me.props.dispatch(setAllCategoryList(categoryList))
        }
      }
    );
  }

  render(){
    return <ul>{this.props.allCategoryList}</ul>
  }
}

const mapStateToProps = function(state){
	if (!_.isEmpty(state.widgets)) {
		return state.widgets
  } else return {};
}
Widget = connect(mapStateToProps)(Widget);

const WidgetFn = (widgetData) => {
	return (
    <Widget/>
	)
}

export default WidgetFn;

export const widgetForm = (widgetData) => {
	return null
}
