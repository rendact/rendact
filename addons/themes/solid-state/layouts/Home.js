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

			<div id="page-wrapper">

				
					{/* <header id="header" className="alt">*/}
					<header id="header" className="">
						<h1><a href="index.html">Solid State</a></h1>
						<nav>
							<a href="#menu">Menu</a>
						</nav>
					</header>

			
					<nav id="menu">
						<div className="inner">
							<h2>Menu</h2>
							<ul className="links">
								<li><a href="index.html">Home</a></li>
								<li><a href="generic.html">Generic</a></li>
								<li><a href="elements.html">Elements</a></li>
								<li><a href="#">Log In</a></li>
								<li><a href="#">Sign Up</a></li>
							</ul>
							<a href="#" className="close">Close</a>
						</div>
					</nav>

				
					<section id="banner">
						<div className="inner">
							<div className="logo"><span className="icon fa-diamond"></span></div>
							<h2>This is Solid State</h2>
							<p>Another free + fully responsive site template by <a href="http://html5up.net">HTML5 UP</a></p>
						</div>
					</section>

				
					<section id="wrapper">

						
							<section id="one" className="wrapper spotlight style1">
								<div className="inner">
									<a href="#" className="image"><img src="images/pic01.jpg" alt="" /></a>
									<div className="content">
										<h2 className="major">Magna arcu feugiat</h2>
										<p>Lorem ipsum dolor sit amet, etiam lorem adipiscing elit. Cras turpis ante, nullam sit amet turpis non, sollicitudin posuere urna. Mauris id tellus arcu. Nunc vehicula id nulla dignissim dapibus. Nullam ultrices, neque et faucibus viverra, ex nulla cursus.</p>
										<a href="#" className="special">Learn more</a>
									</div>
								</div>
							</section>

					
							<section id="two" className="wrapper alt spotlight style2">
								<div className="inner">
									<a href="#" className="image"><img src="images/pic02.jpg" alt="" /></a>
									<div className="content">
										<h2 className="major">Tempus adipiscing</h2>
										<p>Lorem ipsum dolor sit amet, etiam lorem adipiscing elit. Cras turpis ante, nullam sit amet turpis non, sollicitudin posuere urna. Mauris id tellus arcu. Nunc vehicula id nulla dignissim dapibus. Nullam ultrices, neque et faucibus viverra, ex nulla cursus.</p>
										<a href="#" className="special">Learn more</a>
									</div>
								</div>
							</section>

				
							<section id="three" className="wrapper spotlight style3">
								<div className="inner">
									<a href="#" className="image"><img src="images/pic03.jpg" alt="" /></a>
									<div className="content">
										<h2 className="major">Nullam dignissim</h2>
										<p>Lorem ipsum dolor sit amet, etiam lorem adipiscing elit. Cras turpis ante, nullam sit amet turpis non, sollicitudin posuere urna. Mauris id tellus arcu. Nunc vehicula id nulla dignissim dapibus. Nullam ultrices, neque et faucibus viverra, ex nulla cursus.</p>
										<a href="#" className="special">Learn more</a>
									</div>
								</div>
							</section>

						
							<section id="four" className="wrapper alt style1">
								<div className="inner">
									<h2 className="major">Vitae phasellus</h2>
									<p>Cras mattis ante fermentum, malesuada neque vitae, eleifend erat. Phasellus non pulvinar erat. Fusce tincidunt, nisl eget mattis egestas, purus ipsum consequat orci, sit amet lobortis lorem lacus in tellus. Sed ac elementum arcu. Quisque placerat auctor laoreet.</p>
									<section className="features">
										<article>
											<a href="#" className="image"><img src="images/pic04.jpg" alt="" /></a>
											<h3 className="major">Sed feugiat lorem</h3>
											<p>Lorem ipsum dolor sit amet, consectetur adipiscing vehicula id nulla dignissim dapibus ultrices.</p>
											<a href="#" className="special">Learn more</a>
										</article>
										<article>
											<a href="#" className="image"><img src="images/pic05.jpg" alt="" /></a>
											<h3 className="major">Nisl placerat</h3>
											<p>Lorem ipsum dolor sit amet, consectetur adipiscing vehicula id nulla dignissim dapibus ultrices.</p>
											<a href="#" className="special">Learn more</a>
										</article>
										<article>
											<a href="#" className="image"><img src="images/pic06.jpg" alt="" /></a>
											<h3 className="major">Ante fermentum</h3>
											<p>Lorem ipsum dolor sit amet, consectetur adipiscing vehicula id nulla dignissim dapibus ultrices.</p>
											<a href="#" className="special">Learn more</a>
										</article>
										<article>
											<a href="#" className="image"><img src="images/pic07.jpg" alt="" /></a>
											<h3 className="major">Fusce consequat</h3>
											<p>Lorem ipsum dolor sit amet, consectetur adipiscing vehicula id nulla dignissim dapibus ultrices.</p>
											<a href="#" className="special">Learn more</a>
										</article>
									</section>
									<ul className="actions">
										<li><a href="#" className="button">Browse All</a></li>
									</ul>
								</div>
							</section>

					</section>

				
					<section id="footer">
						<div className="inner">
							<h2 className="major">Get in touch</h2>
							<p>Cras mattis ante fermentum, malesuada neque vitae, eleifend erat. Phasellus non pulvinar erat. Fusce tincidunt, nisl eget mattis egestas, purus ipsum consequat orci, sit amet lobortis lorem lacus in tellus. Sed ac elementum arcu. Quisque placerat auctor laoreet.</p>
							<form method="post" action="#">
								<div className="field">
									<label for="name">Name</label>
									<input type="text" name="name" id="name" />
								</div>
								<div className="field">
									<label for="email">Email</label>
									<input type="email" name="email" id="email" />
								</div>
								<div className="field">
									<label for="message">Message</label>
									<textarea name="message" id="message" rows="4"></textarea>
								</div>
								<ul className="actions">
									<li><input type="submit" value="Send Message" /></li>
								</ul>
							</form>
							<ul className="contact">
								<li className="fa-home">
									Untitled Inc<br />
									1234 Somewhere Road Suite #2894<br />
									Nashville, TN 00000-0000
								</li>
								<li className="fa-phone">(000) 000-0000</li>
								<li className="fa-envelope"><a href="#">information@untitled.tld</a></li>
								<li className="fa-twitter"><a href="#">twitter.com/untitled-tld</a></li>
								<li className="fa-facebook"><a href="#">facebook.com/untitled-tld</a></li>
								<li className="fa-instagram"><a href="#">instagram.com/untitled-tld</a></li>
							</ul>
							<ul className="copyright">
								<li>&copy; Untitled Inc. All rights reserved.</li><li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
							</ul>
						</div>
					</section>

			</div>
    )
  }
});

export default Home;