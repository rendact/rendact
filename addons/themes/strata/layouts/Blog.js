import $ from 'jquery'
import React from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import moment from 'moment';
import {Link} from 'react-router';
import scrollToElement from 'scroll-to-element';


let Blog = React.createClass({
  componentDidMount(){
    require('../assets/css/main.css')
  },


  render(){
    let { theConfig, latestPosts: data, thePagination, loadDone } = this.props;

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

				<div id="main">
					<section id="two">
						<div id="head">
							<nav id="nav">
		            {this.props.theMenu()}
		          </nav>
		        </div>
						<h2>Post List</h2>
						<div className="row">
							{data && data.map((post, index) => (
								<article className="6u 12u$(xsmall) work-item">									
									<Link to={"/post/" + post.id} className="image fit thumb">
										<img src={post.imageFeatured ? post.imageFeatured.blobUrl: require('images/logo-128.png') } alt="" />
									</Link>
									<h3><Link to={"/post/" + post.id}>{post.title && post.title}</Link></h3>
									<p dangerouslySetInnerHTML={{__html: post.content ? post.content.slice(0, 60):""}} />
								</article>
							))}
						</div>
						<ul className="actions" style={{textAlign: "center"}}>
							<li>{this.props.thePagination}</li>
						</ul>
					</section>

					<section id="three">
						<div className="row">
	            {this.props.footerWidgets &&
	              this.props.footerWidgets.map((fw, idx) => <div className="4u">{fw}</div>)}
	          </div>
					</section>
					<section id="four">
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
					</section>
				</div>
			</div>
		)
  }
});

export default Blog;