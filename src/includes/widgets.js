import React from 'react';
import {riques} from '../utils';
import uuid from 'uuid';
import Query from '../admin/query';


export const registerWidget = (type, title, value) => {
    let item = "widget_" + type + uuid();
    let values = Object.assign({}, value, {
        title: title
    });

    riques(Query.createWidget(item, values),
        (error, response, data) => {
            if (!error && !data.errors && response.statusCode === 200){
                return data
            }
            console.log(data.errors)
        })
}


export const searchWidget = 
		<div key="sidebar" className="sidebar-box">
			<h3><span>Search</span></h3>
			<p>
				<input className="form-control input" type="text" placeholder="type key to search"/>
			</p>
		</div>

export const topPostWidget = 
		<div key="topPost" className="sidebar-box">
		<h3><span>Top Posts</span></h3>
		<ul className="posts-list">
			<li>
				<a href="#"><h5>Lorem ipsum dolor sit amet</h5></a>
				<p>Sed rhoncus nulla turpis, vitae rutrum velit iaculis et. Curabitur vestibulum, erat non im</p>
				<small>April 1, 2014 , By Robert Louise</small>
			</li>
			<li>
				<a href="#"><h5>Lorem ipsum dolor sit amet</h5></a>
				<p>Sed rhoncus nulla turpis, vitae rutrum velit iaculis et. Curabitur vestibulum, erat non im</p>
				<small>April 1, 2014 , By Robert Louise</small>
			</li>
		</ul>
		</div>

export const categoriesWidget = 
		<div key="category" className="sidebar-box">
			<h3><span>Categories</span></h3>
			<ul className="category">
				<li><a href="#">News</a></li>
				<li><a href="#">Arts</a></li>
				<li><a href="#">Opinion</a></li>
				<li><a href="#">Hot Info</a></li>
			</ul>
		</div>

export const archiveWidget = 
		<div key="archive" className="sidebar-box">
			<h3><span>Archives</span></h3>
				<ul>
					<li><a href="#">February 2015</a></li>
					<li><a href="#">January 2015</a></li>
					<li><a href="#">December 2015</a></li>
					<li><a href="#">November 2015</a></li>
					<li><a href="#">February 2015</a></li>
					<li><a href="#">December 2015</a></li>
				</ul>
		</div>

export const recentPostWidget = 
		<div key="recentPost" className="col-md-4 footer-grid">
			<h3>Recent<span className="opening">Posts</span></h3>
			<a href="#"><h5>Lorem ipsum dolor sit amet</h5></a>
			<p>Sed rhoncus nulla turpis, vitae rutrum velit iaculis et. Curabitur vestibulum, erat non im</p>
			<p className="month">April 1, 2014 , By Robert Louise</p>
			<a href="#"><h5>Lorem ipsum dolor sit amet</h5></a>
			<p>Sed rhoncus nulla turpis, vitae rutrum velit iaculis et. Curabitur vestibulum, erat non im</p>
			<p className="month">April 1, 2014 , By Robert Louise</p>
		</div>

export const aboutUsWidget = 
		<div key="aboutUs" className="col-md-4 footer-grid">
			<h3>About<span className="opening">Us</span></h3>
		  <a href="#"><h5>Lorem ipsum dolor sit amet</h5></a>
		  <p>Sed rhoncus nulla turpis, vitae rutrum velit iaculis et. Curabitur vestibulum, erat non im</p>
		</div>

export const contactUsWidget = 
		<div key="contactUs" className="col-md-4 footer-grid">
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
