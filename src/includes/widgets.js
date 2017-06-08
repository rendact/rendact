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

module.exports = {
	searchWidget: searchWidget,
	topPostWidget: topPostWidget
}