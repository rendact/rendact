//import './Sidebar.css'
import React from 'react'

const Sidebar = ({params}) => {
	return (
			   <div className="col-md-4 ">
								<div className="categories">
											<h4 className="wow fadeInRight animated" data-wow-delay="0.4s">Categories</h4>
											<ul className="category">
												<li><a href="#">Cras ut ultrices</a></li>
												<li><a href="#">Nullam id enim</a></li>
												<li><a href="#">scelerisque enim</a></li>
												<li><a href="#">Ut tincidunt</a></li>
												<li><a href="#">Aliquam mauris nunc,</a></li>
												<li><a href="#">convallis ex urna, ege</a></li>
												<li><a href="#"> et commodo</a></li>
											</ul>
										</div>
								<div className="sidebar-bottom">
									<h4 className="wow fadeInRight animated" data-wow-delay="0.4s">Archives</h4>
											<ul>
												<li><a href="#">February 2015</a></li>
												<li><a href="#">January 2015</a></li>
												<li><a href="#">December 2015</a></li>
												<li><a href="#">November 2015</a></li>
												<li><a href="#">February 2015</a></li>
												<li><a href="#">December 2015</a></li>
											</ul>
								</div>
					 <ul className="times two">
							<h3 className="wow fadeInRight animated" data-wow-delay="0.4s">Opening<span className="opening">Hours</span></h3>
							<li><i className="calender"> </i><span className="week">Monday</span><div className="hours two">h.6:00-h.24:00</div>  <div className="clearfix"></div></li>
							<li><i className="calender"> </i><span className="week">Tuesday</span><div className="hours two">h.6:00-h.24:00</div>  <div className="clearfix"></div></li>
							<li><i className="calender"> </i><span className="week">Wednesday</span><div className="hours two">h.6:00-h.24:00</div>  <div className="clearfix"></div></li>
							<li><i className="calender"> </i><span className="week">Thrusday</span><div className="hours two">h.6:00-h.24:00</div>  <div className="clearfix"></div></li>
							<li><i className="calender"> </i><span className="week">Friday</span><div className="hours two">h.6:00-h.24:00</div>  <div className="clearfix"></div></li>
							<li><i className="calender"> </i><span className="week">Saturday</span><div className="hours two">h.6:00-h.24:00</div>  <div className="clearfix"></div></li>
							<li><i className="calender"> </i><span className="week">Sunday</span><div className="hours two">Closed</div>  <div className="clearfix"></div></li>
	
						 </ul>
					<ul  className="blog-list1">
					 <h4 className="wow fadeInRight animated" data-wow-delay="0.4s">Tags</h4>
						<li><a href="#">Javascript</a></li>
						<li><a href="#">PHP</a></li>
						<li><a href="#">Java</a></li>
						<li><a href="#">Phyton</a></li>
						<li><a href="#">React</a></li>
						<li><a href="#">Wordpress</a></li>
						<li><a href="#">Joomla</a></li>
						<li><a href="#">Android</a></li>
						<li><a href="#">Drupal</a></li>
						<li><a href="#">Magento</a></li>
						<li><a href="#">Etc</a></li>
						<li><a href="#">Mamboo</a></li>
						<div className="clearfix"></div>
					</ul>
		   	     </div>
	)
}

export default Sidebar
