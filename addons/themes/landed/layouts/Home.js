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

				<section id="banner">
					<div className="content">
						<header>
							<h2>The future has landed</h2>
							<p>And there are no hoverboards or flying cars.<br />
							Just apps. Lots of mother flipping apps.</p>
						</header>
						<span className="image"><img src="images/pic01.jpg" alt="" /></span>
					</div>
					<a href="#one" className="goto-next scrolly">Next</a>
				</section>

				<section id="one" className="spotlight style1 bottom">
					<span className="image fit main"><img src="images/pic02.jpg" alt="" /></span>
					<div className="content">
						<div className="container">
							<div className="row">
								<div className="4u 12u$(medium)">
									<header>
										<h2>Odio faucibus ipsum integer consequat</h2>
										<p>Nascetur eu nibh vestibulum amet gravida nascetur praesent</p>
									</header>
								</div>
								<div className="4u 12u$(medium)">
									<p>Feugiat accumsan lorem eu ac lorem amet sed accumsan donec.
									Blandit orci porttitor semper. Arcu phasellus tortor enim mi
									nisi praesent dolor adipiscing. Integer mi sed nascetur cep aliquet
									augue varius tempus lobortis porttitor accumsan consequat
									adipiscing lorem dolor.</p>
								</div>
								<div className="4u$ 12u$(medium)">
									<p>Morbi enim nascetur et placerat lorem sed iaculis neque ante
									adipiscing adipiscing metus massa. Blandit orci porttitor semper.
									Arcu phasellus tortor enim mi mi nisi praesent adipiscing. Integer
									mi sed nascetur cep aliquet augue varius tempus. Feugiat lorem
									ipsum dolor nullam.</p>
								</div>
							</div>
						</div>
					</div>
					<a href="#two" className="goto-next scrolly">Next</a>
				</section>

				<section id="two" className="spotlight style2 right">
					<span className="image fit main"><img src="images/pic03.jpg" alt="" /></span>
					<div className="content">
						<header>
							<h2>Interdum amet non magna accumsan</h2>
							<p>Nunc commodo accumsan eget id nisi eu col volutpat magna</p>
						</header>
						<p>Feugiat accumsan lorem eu ac lorem amet ac arcu phasellus tortor enim mi mi nisi praesent adipiscing. Integer mi sed nascetur cep aliquet augue varius tempus lobortis porttitor lorem et accumsan consequat adipiscing lorem.</p>
						<ul className="actions">
							<li><a href="#" className="button">Learn More</a></li>
						</ul>
					</div>
					<a href="#three" className="goto-next scrolly">Next</a>
				</section>

				<section id="three" className="spotlight style3 left">
					<span className="image fit main bottom"><img src="images/pic04.jpg" alt="" /></span>
					<div className="content">
						<header>
							<h2>Interdum felis blandit praesent sed augue</h2>
							<p>Accumsan integer ultricies aliquam vel massa sapien phasellus</p>
						</header>
						<p>Feugiat accumsan lorem eu ac lorem amet ac arcu phasellus tortor enim mi mi nisi praesent adipiscing. Integer mi sed nascetur cep aliquet augue varius tempus lobortis porttitor lorem et accumsan consequat adipiscing lorem.</p>
						<ul className="actions">
							<li><a href="#" className="button">Learn More</a></li>
						</ul>
					</div>
					<a href="#four" className="goto-next scrolly">Next</a>
				</section>

				<section id="four" className="wrapper style1 special fade-up">
					<div className="container">
						<header className="major">
							<h2>Accumsan sed tempus adipiscing blandit</h2>
							<p>Iaculis ac volutpat vis non enim gravida nisi faucibus posuere arcu consequat</p>
						</header>
						<div className="box alt">
							<div className="row uniform">
								<section className="4u 6u(medium) 12u$(xsmall)">
									<span className="icon alt major fa-area-chart"></span>
									<h3>Ipsum sed commodo</h3>
									<p>Feugiat accumsan lorem eu ac lorem amet accumsan donec. Blandit orci porttitor.</p>
								</section>
								<section className="4u 6u$(medium) 12u$(xsmall)">
									<span className="icon alt major fa-comment"></span>
									<h3>Eleifend lorem ornare</h3>
									<p>Feugiat accumsan lorem eu ac lorem amet accumsan donec. Blandit orci porttitor.</p>
								</section>
								<section className="4u$ 6u(medium) 12u$(xsmall)">
									<span className="icon alt major fa-flask"></span>
									<h3>Cubilia cep lobortis</h3>
									<p>Feugiat accumsan lorem eu ac lorem amet accumsan donec. Blandit orci porttitor.</p>
								</section>
								<section className="4u 6u$(medium) 12u$(xsmall)">
									<span className="icon alt major fa-paper-plane"></span>
									<h3>Non semper interdum</h3>
									<p>Feugiat accumsan lorem eu ac lorem amet accumsan donec. Blandit orci porttitor.</p>
								</section>
								<section className="4u 6u(medium) 12u$(xsmall)">
									<span className="icon alt major fa-file"></span>
									<h3>Odio laoreet accumsan</h3>
									<p>Feugiat accumsan lorem eu ac lorem amet accumsan donec. Blandit orci porttitor.</p>
								</section>
								<section className="4u$ 6u$(medium) 12u$(xsmall)">
									<span className="icon alt major fa-lock"></span>
									<h3>Massa arcu accumsan</h3>
									<p>Feugiat accumsan lorem eu ac lorem amet accumsan donec. Blandit orci porttitor.</p>
								</section>
							</div>
						</div>
						<footer className="major">
							<ul className="actions">
								<li><a href="#" className="button">Magna sed feugiat</a></li>
							</ul>
						</footer>
					</div>
				</section>
>
				<section id="five" className="wrapper style2 special fade">
					<div className="container">
						<header>
							<h2>Magna faucibus lorem diam</h2>
							<p>Ante metus praesent faucibus ante integer id accumsan eleifend</p>
						</header>
						<form method="post" action="#" className="container 50%">
							<div className="row uniform 50%">
								<div className="8u 12u$(xsmall)"><input type="email" name="email" id="email" placeholder="Your Email Address" /></div>
								<div className="4u$ 12u$(xsmall)"><input type="submit" value="Get Started" className="fit special" /></div>
							</div>
						</form>
					</div>
				</section>

	
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
						<li>&copy; Untitled. All rights reserved.</li><li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
					</ul>
				</footer>

		</div>

    )
  }
});

export default Home;
