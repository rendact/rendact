//import './Footer.css'
import React from 'react'

const Footer = ({params}) => {
	return (
		<div className="footer">
			<div className="container">
				<div className="f-grids">
					<div className="col-md-4 footer-grid wow fadeInUpBig animated animated" data-wow-delay="0.4s">
					<h3>Recent<span className="opening">Posts</span></h3>
					  <a href="#"><h5>Lorem ipsum dolor sit amet</h5></a>
					  <p>Sed rhoncus nulla turpis, vitae rutrum velit iaculis et. Curabitur vestibulum, erat non im</p>
					   <p className="month">April 1, 2014 , By Robert Louise</p>
					  <a href="#"><h5>Lorem ipsum dolor sit amet</h5></a>
					  <p>Sed rhoncus nulla turpis, vitae rutrum velit iaculis et. Curabitur vestibulum, erat non im</p>
					  <p className="month">April 1, 2014 , By Robert Louise</p>
					</div>
					
					<div className="col-md-4 footer-grid wow fadeInUpBig animated animated" data-wow-delay="0.3s">
						<div className="opening_hours">
							 <ul className="times">
								<h3>Opening<span className="opening">Hours</span></h3>
								<li><i className="calender"> </i><span className="week">Monday</span><div className="hours">h.6:00-h.24:00</div>  <div className="clearfix"></div></li>
								<li><i className="calender"> </i><span className="week">Tuesday</span><div className="hours">h.6:00-h.24:00</div>  <div className="clearfix"></div></li>
								<li><i className="calender"> </i><span className="week">Wednesday</span><div className="hours">h.6:00-h.24:00</div>  <div className="clearfix"></div></li>
								<li><i className="calender"> </i><span className="week">Thrusday</span><div className="hours">h.6:00-h.24:00</div>  <div className="clearfix"></div></li>
								<li><i className="calender"> </i><span className="week">Friday</span><div className="hours">h.6:00-h.24:00</div>  <div className="clearfix"></div></li>
								<li><i className="calender"> </i><span className="week">Saturday</span><div className="hours">h.6:00-h.24:00</div>  <div className="clearfix"></div></li>
								<li><i className="calender"> </i><span className="week">Sunday</span><div className="hours">Closed</div>  <div className="clearfix"></div></li>
		
							 </ul>
						</div>
					</div>
					
					<div className="col-md-4 footer-grid wow fadeInUpBig animated animated" data-wow-delay="0.2s">
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
					
					<div className="clearfix"></div>
				</div>
				
				<div className="copy">
					<p>Place sticky footer content here.<a></a></p>
		        </div>
			</div>
		</div>
	)
}

export default Footer
