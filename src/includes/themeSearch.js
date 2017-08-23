import React from 'react';
import {connect} from 'react-redux';
import {Menu} from './Menu.js';
import { aboutUsWidget, contactUsWidget, recentPostWidget} from './widgets';
import {getTemplateComponent} from './theme';
import {riques} from '../utils';
import Query from '../admin/query';
import {setSearchResults} from '../actions';

class ThemeSearch extends React.Component {
	constructor(props){
    super(props);

    this.goHome = this.goHome.bind(this);
    this.theMenu = this.theMenu.bind(this);
    this.theBreadcrumb = this.theBreadcrumb.bind(this);
    this.theLogo = this.theLogo.bind(this);
    this.loadPosts = this.loadPosts.bind(this);

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
    riques(Query.searchPost(query), (error, response, body) => {
      if(!error){
        let results = body.data.viewer.allPosts.edges.map(item => item.node)
        this.props.dispatch(setSearchResults(results));
      }
    });
  }

  componentWillMount(){
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
      />
  }
}


export default ThemeSearch = connect(
  state => {
    return {
    query: state.search.search,
    results: state.search.results
  }},
)(ThemeSearch)
