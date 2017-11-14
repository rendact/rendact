import $ from 'jquery'
import React from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import moment from 'moment';
import {Link} from 'react-router';

let Home = React.createClass({
  componentDidMount(){
    require('../assets/css/main.css');
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

		<div id="page-wrapper">

				<header id="header">
					<h1 id="logo"><a href="index.html">Landed</a></h1>
					<nav id="nav">
						<ul>
							<li><a href="index.html">Home</a></li>
							<li>
								<a href="#">Layouts</a>
								<ul>
									<li><a href="left-sidebar.html">Left Sidebar</a></li>
									<li><a href="right-sidebar.html">Right Sidebar</a></li>
									<li><a href="no-sidebar.html">No Sidebar</a></li>
									<li>
										<a href="#">Submenu</a>
										<ul>
											<li><a href="#">Option 1</a></li>
											<li><a href="#">Option 2</a></li>
											<li><a href="#">Option 3</a></li>
											<li><a href="#">Option 4</a></li>
										</ul>
									</li>
								</ul>
							</li>
							<li><a href="elements.html">Elements</a></li>
							<li><a href="#" className="button special">Sign Up</a></li>
						</ul>
					</nav>
				</header>

				<div id="main" className="wrapper style1">
					<div className="container">
						<header className="major">
							<h2>{theConfig ? theConfig.name : "Rendact"}</h2>
							<p>{theConfig ? theConfig.tagline: "hello"}</p>
						</header>
						<div className="row 150%">
							<div className="8u 12u$(medium)">

   							{data && data.map((post, index) => (
									<section id="content">
										<a href="#" className="image fit">
											<img src={post.imageFeatured ? post.imageFeatured.blobUrl: require('images/logo-128.png') } alt="" />
										</a>
										<h3>{post.title && post.title}</h3>
										<p dangerouslySetInnerHTML={{__html: post.content ? post.content.slice(0, 300):""}} />
									</section>
								))}

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

export default Home;
