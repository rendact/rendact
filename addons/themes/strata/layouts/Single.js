import $ from 'jquery'
import React from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import moment from 'moment';
import {Link} from 'react-router';
import scrollToElement from 'scroll-to-element';


let Single = React.createClass({
  componentDidMount(){
    require('../assets/css/main.css')
  },

render(){
    let {
      postData,
      theConfig,
      data,
      thePagination,
      loadDone,
      isHome
    } = this.props

    return (
	    <div>	
				<header id="header">
					<div className="inner">
						<div className="image avatar">
							<Link to="/">
								<img src={ require('images/logo-128.png') } alt="" />
							</Link>
						</div>
						<h1><strong>We are {theConfig?theConfig.name:"Rendact"} Team</strong><br />
						{theConfig?theConfig.tagline:"Hello, this is new theme"}<br />
						crafted by <a href="http://html5up.net">HTML5 UP</a>.</h1>
					</div>
				</header>

				{postData &&
					<div id="main">
						<section id="one">
							<div id="head">
								<nav id="nav">
			            {this.props.theMenu()}
			          </nav>
			        </div>
							<header className="major">
								<h2>{postData.title && postData.title}</h2>
							</header>
							<a href="#" className="image fit">
								<img src={postData.imageFeatured ? postData.imageFeatured.blobUrl: require('images/logo-128.png') } alt="" />
							</a>
							<p dangerouslySetInnerHTML={{__html: postData.content ? postData.content:""}} />
						</section>
					</div>
				}
				<footer id="footer">
					<div className="inner">
						<ul className="icons">
							<li><a href="#" className="icon fa-twitter"><span className="label">Twitter</span></a></li>
							<li><a href="#" className="icon fa-github"><span className="label">Github</span></a></li>
							<li><a href="#" className="icon fa-dribbble"><span className="label">Dribbble</span></a></li>
							<li><a href="#" className="icon fa-envelope-o"><span className="label">Email</span></a></li>
						</ul>
						<ul className="copyright">
							<li className="copyright">&copy; Rendact Team. Credits: <a href="http://html5up.net">HTML5 UP</a></li>
						</ul>
					</div>
				</footer>
			</div>
		)
  }
});

export default Single;