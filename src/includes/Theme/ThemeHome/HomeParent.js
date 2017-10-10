import React from 'react' import map from 'lodash/map'
import {getTemplateComponent, theTitle, theContent, theExcerpt, theMenu,getWidgets, theLogo, theImage, thePagination} from './../includes'
import {aboutUsWidget, contactUsWidget, recentPostWidget} from '../../widgets';
import Loadable from 'react-loadable';

let Home = Loadable({
  loader: () => getTemplateComponent('home'),
  loading: () => null
})

let HomeParent = React.createClass({
	propTypes: {
    loadDone: React.PropTypes.bool,
		isSlugExist: React.PropTypes.bool,
		slug: React.PropTypes.string,
		config: React.PropTypes.object,
		postPerPage: React.PropTypes.number,
		pageCount: React.PropTypes.number,
		activePage: React.PropTypes.number,
		isNoConnection: React.PropTypes.bool,
    mainMenu: React.PropTypes.object,
  },
 
  getDefaultProps: function() {
    return {
			loadDone: false,
			isSlugExist: false,
			slug: "",
			pageCount: 1,
			activePage: 1,
			isNoConnection: false,
      mainMenu: null,
      listOfWidgets: [],
		}
  },

	componentDidMount(){
		var c = window.config.theme;
		require ('bootstrap/dist/css/bootstrap.css');
    require('../../../theme/'+c.path+'/css/style.css');
    require('../../../theme/'+c.path+'/functions.js');

	},

	render(){
    
				return <Home 
					data={this.props.data}
					theTitle={theTitle}
					theContent={theContent}
					theExcerpt={theExcerpt}
					theMenu={theMenu(this.props.mainMenu)}
					theLogo={theLogo}
					theImage={theImage}
					theConfig={this.props.config}
					thePagination={thePagination(this.props.pageCount, this.props.activePage, this.props.handlePageClick)}
					getWidgets={getWidgets.bind(this)}
					footerWidgets={[aboutUsWidget, recentPostWidget, contactUsWidget]}
					listOfWidgets={this.props.listOfWidgets}
          loadDone={this.props.loadDone}
				/>

	}
})



export default HomeParent;
