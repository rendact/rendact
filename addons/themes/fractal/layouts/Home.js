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
    debugger
    return (
    <div>
			<header id="header">
				<div className="content">
					<h1><a href="#">Fractal</a></h1>
					<p>Just a simple, single page responsive<br />
					template brought to you by <a href="http://html5up.net">HTML5 UP</a></p>
					<ul className="actions">
						<li><a href="#" className="button special icon fa-download">Download</a></li>
						<li><a href="#one" className="button icon fa-chevron-down scrolly">Learn More</a></li>
					</ul>
				</div>
				<div className="image phone"><div className="inner"><img src="images/screen.jpg" alt="" /></div></div>
			</header>

			<section id="one" className="wrapper style2 special">
				<header className="major">
					<h2>Sed ipsum magna lorem tempus amet<br />
					vehicula et gravida elementum</h2>
				</header>
				<ul className="icons major">
					<li><span className="icon fa-camera-retro"><span className="label">Shoot</span></span></li>
					<li><span className="icon fa-refresh"><span className="label">Process</span></span></li>
					<li><span className="icon fa-cloud"><span className="label">Upload</span></span></li>
				</ul>
			</section>

			<section id="two" className="wrapper">
				<div className="inner alt">
					<section className="spotlight">
						<div className="image"><img src="images/pic01.jpg" alt="" /></div>
						<div className="content">
							<h3>Magna sed ultrices</h3>
							<p>Morbi mattis ornare ornare. Duis quam turpis, gravida at leo elementum elit fusce accumsan dui libero, quis vehicula lectus ultricies eu. In convallis amet leo non sapien iaculis efficitur consequat lorem ipsum.</p>
						</div>
					</section>
					<section className="spotlight">
						<div className="image"><img src="images/pic02.jpg" alt="" /></div>
						<div className="content">
							<h3>Ultrices nullam aliquam</h3>
							<p>Morbi mattis ornare ornare. Duis quam turpis, gravida at leo elementum elit fusce accumsan dui libero, quis vehicula lectus ultricies eu. In convallis amet leo non sapien iaculis efficitur consequat lorem ipsum.</p>
						</div>
					</section>
					<section className="spotlight">
						<div className="image"><img src="images/pic03.jpg" alt="" /></div>
						<div className="content">
							<h3>Aliquam sed magna</h3>
							<p>Morbi mattis ornare ornare. Duis quam turpis, gravida at leo elementum elit fusce accumsan dui libero, quis vehicula lectus ultricies eu. In convallis amet leo non sapien iaculis efficitur consequat lorem ipsum.</p>
						</div>
					</section>
					<section className="special">
						<ul className="icons labeled">
							<li><span className="icon fa-camera-retro"><span className="label">Ipsum lorem accumsan</span></span></li>
							<li><span className="icon fa-refresh"><span className="label">Sed vehicula elementum</span></span></li>
							<li><span className="icon fa-cloud"><span className="label">Elit fusce consequat</span></span></li>
							<li><span className="icon fa-code"><span className="label">Lorem nullam tempus</span></span></li>
							<li><span className="icon fa-desktop"><span className="label">Adipiscing amet sapien</span></span></li>
						</ul>
					</section>
				</div>
			</section>

			<section id="three" className="wrapper style2 special">
				<header className="major">
					<h2>Magna leo sapien gravida</h2>
					<p>Gravida at leo elementum elit fusce accumsan dui libero, quis vehicula<br />
					lectus ultricies eu. In convallis amet leo sapien iaculis efficitur.</p>
				</header>
				<ul className="actions">
					<li><a href="#" className="button special icon fa-download">Download</a></li>
					<li><a href="#" className="button">Learn More</a></li>
				</ul>
			</section>

			<footer id="footer">
				<ul className="icons">
					<li><a href="#" className="icon fa-facebook"><span className="label">Facebook</span></a></li>
					<li><a href="#" className="icon fa-twitter"><span className="label">Twitter</span></a></li>
					<li><a href="#" className="icon fa-instagram"><span className="label">Instagram</span></a></li>
				</ul>
				<p className="copyright">&copy; Untitled. Credits: <a href="http://html5up.net">HTML5 UP</a></p>
			</footer>
		</div>	
		)
  }
});

export default Home;