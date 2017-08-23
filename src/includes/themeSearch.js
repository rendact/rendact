import React from 'react';
import {connect} from 'react-redux';
import {Menu} from './Menu.js';
import { aboutUsWidget, contactUsWidget, recentPostWidget} from './widgets';
import {getTemplateComponent} from './theme';
import {riques} from '../utils';
import Query from '../admin/query';

class ThemeSearch extends React.Component {
	constructor(props){
    super(props);
		this.state =  {
			loadDone: false,
			postData: false,
			config: null,
		}

    this.goHome = this.goHome.bind(this);
    this.theMenu = this.theMenu.bind(this);
    this.theBreadcrumb = this.theBreadcrumb.bind(this);
    this.theLogo = this.theLogo.bind(this);
    this.loadPost = this.loadPost.bind(this);

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

  loadPost(query){
    riques(Query.searchPost(query), (error, response, body) => {
      if(!error){
        console.log(body.data)
      }
    });
  }

  componentWillMount(){
    this.loadPost(this.props.query||this.props.params.search);
  }

  render(){
    let Search = getTemplateComponent('search');
    return <Search
          footerWidgets={[aboutUsWidget, recentPostWidget, contactUsWidget]}
          theMenu={this.theMenu}
          theLogo={this.theLogo}
          theBreadcrumb={this.theBreadcrumb}
          theConfig={this.state.config}
          searchQuery={this.props.query||this.props.params.search}
      />
  }
}


export default ThemeSearch = connect(
  state => {
    return {
    query: state.search.search,
  }},
)(ThemeSearch)
