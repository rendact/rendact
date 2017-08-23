import React from 'react';
import {connect} from 'react-redux';
import {Menu} from './Menu.js';
import { aboutUsWidget, contactUsWidget, recentPostWidget} from './widgets';
import {getTemplateComponent, getWidgets, theExcerpt} from './theme';
import {riques} from '../utils';
import Query from '../admin/query';
import {setSearchQuery, setSearchResults, maskArea} from '../actions';

class ThemeSearch extends React.Component {
	constructor(props){
    super(props);
    this.state = {
      listOfWidgets: []
    }

    this.goHome = this.goHome.bind(this);
    this.theMenu = this.theMenu.bind(this);
    this.theBreadcrumb = this.theBreadcrumb.bind(this);
    this.theLogo = this.theLogo.bind(this);
    this.loadPosts = this.loadPosts.bind(this);
    this.getWidgets = getWidgets.bind(this);
    this.theExcerpt = theExcerpt.bind(this);

	}
	goHome(e) {
		e.preventDefault();
		this._reactInternalInstance._context.history.push('/')
	}


	theMenu(){
      return <Menu goHome={this.goHome}/>
	}

	theBreadcrumb(){
		return <h2><a href="#" onClick={this.goHome}><h5>Home </h5></a> / PAGE</h2>
	}

	theLogo(){
		return <div className="logo">
							<a href="#" onClick={this.goHome}><h1>Rend<span>act</span></h1></a>
						</div>
	}

  loadPosts(query){
    this.props.dispatch(maskArea(true))
    riques(Query.searchPost(query), (error, response, body) => {
      if(!error){
        let results = body.data.viewer.allPosts.edges.map(item => item.node)
        this.props.dispatch(setSearchResults(results));
        this.props.dispatch(maskArea(false))
      }
    });
  }

  componentWillReceiveProps(props){
    if(!this.props.query){
      this.props.dispatch(setSearchQuery(props.params.search))
    } else if(this.props.query !== props.params.search) {
      this.loadPosts(props.params.search)
    }
  }

  componentDidMount(){
		var c = window.config.theme;
		require ('bootstrap/dist/css/bootstrap.css');
		require('../theme/'+c.path+'/css/style.css');
		require('../theme/'+c.path+'/functions.js');
  }

  componentWillMount(){
    //
    let me = this;
    riques(Query.getListOfWidget, 
		    	function(error, response, body) { 
		    		if (!error && !body.errors && response.statusCode === 200) {
		    			me.setState({listOfWidgets: JSON.parse(body.data.getOptions.value)})
		    		} else {
              console.log(error, body.errors)
		        }
		    	}
    );
    this.loadPosts(this.props.query||this.props.params.search);
  }

  render(){
    let Search = getTemplateComponent('search');
    return <Search
          footerWidgets={[aboutUsWidget, recentPostWidget, contactUsWidget]}
          theMenu={this.theMenu}
          theLogo={this.theLogo}
          theBreadcrumb={this.theBreadcrumb}
          searchQuery={this.props.query||this.props.params.search}
          searchResults={this.props.results}
          getWidgets={this.getWidgets}
          theExcerpt={this.theExcerpt}
          opacity={this.props.opacity}
          isProcessing={this.props.isProcessing}
      />
  }
}


export default ThemeSearch = connect(
  state => {
    return {
      query: state.search.search,
      results: state.search.results,
      opacity: state.maskArea.opacity,
      isProcessing: state.maskArea.isProcessing
  }},
)(ThemeSearch)
