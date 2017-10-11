import React from 'react'
import map from 'lodash/map'
import {setAllCategoryList} from '../../actions/setAllCategoryList'
import queries from '../../admin/query/Post';
import {gql, graphql} from 'react-apollo';
import {Link} from 'react-router';

class Widget extends React.Component {
  constructor(props){
    super(props)

    this.renderCategories = this.renderCategories.bind(this)
  }


  renderCategories(){
    return map(this.props.allCategoryList, item => (
      <li key={item.node.id}><Link to={"/category/" + item.node.id}>{item.node.name}</Link></li>
    ))
  }

  render(){
    if (this.props.loading){
      return null
    }
    return <ul>{this.renderCategories()}</ul>
  }
}

let qry = gql`${queries.getAllCategoryQry("post").query}`

Widget = graphql(qry, {
  props: ({ownProps, data}) => {
    if (!data.loading){
      let allCategoryList = data.viewer.allCategories.edges
      return {
        allCategoryList,
        loading: false,
      }

      return {loading: true}
    }
  }
})(Widget)

const WidgetFn = (widgetData) => {
	return (
    <Widget/>
	)
}

export default WidgetFn;

export const widgetForm = (widgetData) => {
	return null
}
