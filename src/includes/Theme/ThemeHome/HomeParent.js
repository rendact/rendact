import React from 'react' 
import {getTemplateComponent, theTitle, theContent, theExcerpt, theMenu,getWidgets, theLogo, theImage, thePagination, theCommentForm} from './../includes'
import {aboutUsWidget, contactUsWidget, recentPostWidget} from '../../widgets';

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

  getInitialState: function(){
    return {
      Home:null
    }
  },

  componentDidMount(){
    getTemplateComponent('home').then(Home => {
      if (Home){
        this.setState({Home: Home})
      }
    });
  },

	render(){
    //let Home = getTemplateComponent('home')    
        return this.state.Home  && <this.state.Home 
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
          theCommentForm={theCommentForm(this.props.postId)}
				/> 

	}
})



export default HomeParent;
