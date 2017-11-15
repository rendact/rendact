import $ from 'jquery'
import React from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import moment from 'moment';
import {Link} from 'react-router';

let Home = React.createClass({
  componentDidMount(){
    require('../assets/css/main.css')
  },

  render(){
    let {
      theConfig,
      data,
      thePagination,
      loadDone
    } = this.props
    // debugger
    return (
    	<div>
				<header id="header">
					<a href="#" className="logo"><img src={require('images/logo-128.png')} alt="" /></a>
					<p>{theConfig ? theConfig.tagline: "A simple template for telling the world when you will launch"}</p>
				</header>

		
				<form id="signup-form" method="post" action="#">
					<input type="email" name="email" id="email" placeholder="Email Address" />
					<input type="submit" value="Sign Up" />
				</form>

		
				<footer id="footer">
					<ul className="icons">
						<li><a href="#" className="icon fa-twitter"><span className="label">Twitter</span></a></li>
						<li><a href="#" className="icon fa-instagram"><span className="label">Instagram</span></a></li>
						<li><a href="#" className="icon fa-github"><span className="label">GitHub</span></a></li>
						<li><a href="#" className="icon fa-envelope-o"><span className="label">Email</span></a></li>
					</ul>
					<ul className="copyright">
						<li>&copy; Rendact Team.</li><li>Credits: <a href="http://html5up.net">HTML5 UP</a></li>
					</ul>
				</footer>
			</div>
		)
  }
});

export default Home;