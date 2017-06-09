import React from 'react';

const searchWidget = 
		<div className="sidebar-box">
			<h3><span className="opening">Search</span></h3>
			<p>
				<input className="form-control input" type="text" placeholder="type key to search"/>
			</p>
		</div>

const topPostWidget = 
		<div className="sidebar-box">
			<h3><span className="opening">Top Posts</span></h3>
			<a href="#"><h5>Lorem ipsum dolor sit amet</h5></a>
			<p>Sed rhoncus nulla turpis, vitae rutrum velit iaculis et. Curabitur vestibulum, erat non im</p>
			<p className="month">April 1, 2014 , By Robert Louise</p>
			<a href="#"><h5>Lorem ipsum dolor sit amet</h5></a>
			<p>Sed rhoncus nulla turpis, vitae rutrum velit iaculis et. Curabitur vestibulum, erat non im</p>
			<p className="month">April 1, 2014 , By Robert Louise</p>
		</div>

const categoriesWidget = 
		<div className="sidebar-box">
			<h3><span className="opening">Categories</span></h3>
			<ul className="category">
				<li><a href="#">News</a></li>
				<li><a href="#">Arts</a></li>
				<li><a href="#">Opinion</a></li>
				<li><a href="#">Hot Info</a></li>
			</ul>
		</div>

const archiveWidget = 
		<div className="sidebar-box">
			<h3><span className="opening">Archives</span></h3>
				<ul>
					<li><a href="#">February 2015</a></li>
					<li><a href="#">January 2015</a></li>
					<li><a href="#">December 2015</a></li>
					<li><a href="#">November 2015</a></li>
					<li><a href="#">February 2015</a></li>
					<li><a href="#">December 2015</a></li>
				</ul>
		</div>

const recentPostWidget = 
		<div className="col-md-4 footer-grid">
			<h3>Recent<span className="opening">Posts</span></h3>
			<a href="#"><h5>Lorem ipsum dolor sit amet</h5></a>
			<p>Sed rhoncus nulla turpis, vitae rutrum velit iaculis et. Curabitur vestibulum, erat non im</p>
			<p className="month">April 1, 2014 , By Robert Louise</p>
			<a href="#"><h5>Lorem ipsum dolor sit amet</h5></a>
			<p>Sed rhoncus nulla turpis, vitae rutrum velit iaculis et. Curabitur vestibulum, erat non im</p>
			<p className="month">April 1, 2014 , By Robert Louise</p>
		</div>

const aboutUsWidget = 
		<div className="col-md-4 footer-grid">
			<h3>About<span className="opening">Us</span></h3>
		  <a href="#"><h5>Lorem ipsum dolor sit amet</h5></a>
		  <p>Sed rhoncus nulla turpis, vitae rutrum velit iaculis et. Curabitur vestibulum, erat non im</p>
		</div>

const contactUsWidget = 
		<div className="col-md-4 footer-grid">
			<h3>contact<span className="opening">info</span></h3>
			<ul className="address">
				 <li>123, new street, 129907 New Yark</li>
				 <li>023 456 23456</li>
				 <li><a className="mail" href="mailto:info@example.com">123 int@example.com</a></li>
			</ul>
			<div className="support">
				<input type="text" className="text" defaultValue="Enter email... " />
				<input type="submit" value="SUBMIT" className="botton" />
				<p>Lorem ipsum dolor sit amet conse aliqua. Ut enim ad minim veniam Lorem ctetur adipisicing .</p>
			</div>
		</div>

module.exports = {
	searchWidget: searchWidget,
	topPostWidget: topPostWidget,
	categoriesWidget: categoriesWidget,
	archiveWidget: archiveWidget,
	aboutUsWidget: aboutUsWidget,
	recentPostWidget: recentPostWidget,
	contactUsWidget: contactUsWidget
}