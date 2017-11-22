import $ from 'jquery'
import React from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import moment from 'moment';
import {Link} from 'react-router';

let Blog = React.createClass({
  componentDidMount(){
    require('../assets/css/main.css');
  },

  render(){
    let { theConfig, latestPosts: data, thePagination, loadDone } = this.props;
    
    return (

		<div id="page-wrapper">

				<header id="header">
					<h1 id="logo"><Link to="/"><strong>{theConfig ? theConfig.name : "Rendact"}</strong></Link></h1>
					<nav id="nav">
								{this.props.theMenu()}
					</nav>
				</header>

				<div id="main" className="wrapper style1">
					<div className="container">
						<header className="major">
							<h2><strong>{theConfig ? theConfig.name : "Rendact"}</strong></h2>
							<p>{theConfig ? theConfig.tagline: "hello"}</p>
						</header>
						<div className="row 150%">
							<div className="8u 12u$(medium)">

   							{data && data.map((post, index) => (
									<section id="content">
										<Link className="image fit" to={"/post/" + post.id}>
											<img src={post.imageFeatured ? post.imageFeatured.blobUrl: require('images/logo-128.png') } alt="" />
										</Link>
										<Link to={"/post/" + post.id}>
											<h3>{post.title && post.title}</h3>
										</Link>
										<p dangerouslySetInnerHTML={{__html: post.content ? post.content.slice(0, 300):""}} />
										<footer>
											<ul className="actions">
												<li><Link className="button" to={"/post/" + post.id}>Learn More</Link></li>
											</ul>
										</footer>
									<hr />
									</section>
								))}
   							<div style={{textAlign: "center"}}>
	                {thePagination}
	              </div>
							</div>
							<div className="4u 12u$(medium)">

									<section id="sidebar">
										<section>
											{this.props.footerWidgets.map((fw, i) => (
						            <section key={i}>{fw}</section>
						          ))}
						          <hr />
										</section>
									</section>

							</div>
						</div>
					</div>
				</div>

				<footer id="footer">
					<ul className="icons">
						<li><a href="#" className="icon alt fa-twitter"><span className="label">Twitter</span></a></li>
						<li><a href="#" className="icon alt fa-facebook"><span className="label">Facebook</span></a></li>
						<li><a href="#" className="icon alt fa-linkedin"><span className="label">LinkedIn</span></a></li>
						<li><a href="#" className="icon alt fa-instagram"><span className="label">Instagram</span></a></li>
						<li><a href="#" className="icon alt fa-github"><span className="label">GitHub</span></a></li>
						<li><a href="#" className="icon alt fa-envelope"><span className="label">Email</span></a></li>
					</ul>
					<ul className="copyright">
						<li>&copy; Rendact Team. All rights reserved.</li><li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
					</ul>
				</footer>

		</div>

    )
  }
});

export default Blog;
