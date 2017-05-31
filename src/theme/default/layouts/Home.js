import React from 'react'
import Header from '../includes/Header'
import Footer from '../includes/Footer'
import _ from 'lodash'

const Home = React.createClass({
	render: function() {
		return (
			<div className="application">
				<Header/>	   
				<div className="clases-section">
					<div className="container">
					             <h3>Top Posts</h3>
					     <div className="class-grids">
							 <div className="col-md-6 class-grid wow zoomInLeft animated animated" style={{"visibility": "visible", "animationName": "zoomInLeft"}}>
							     <img src="images/c1.jpg" className="img-responsive" alt="" />
								 <div className="bottom-color">
									<h4>Top post 1</h4>
									<p>by User one</p>
								</div>
								<div className="class-bottom">
									<div className="col-md-6 class-time ">
										 <ul className="time">
											<li><i className="sun"> </i><span>Sunday October 14 </span></li>
											<li><i className="time"></i><span>12:30PM</span></li>
											<div className="clearfix"></div>
										 </ul>
									</div>
									<div className="col-md-6 class-text">
										<div className="single-one"><span><a href="#"><i className="com"> </i>20l</a></span></div>
										<div className="single-one"><span><a href="#"><i className="four"> </i>400</a></span></div>
									</div>
									<div className="clearfix"></div>
									  <a className="button" href="article"><img src={require('../images/read.png')} className="img-responsive" alt="" /></a>
								</div>
							</div>
							 <div className="col-md-6 class-grid wow zoomInRight animated animated" style={{"visibility": "visible", "animationName": "zoomInRight"}}>
							     <img src="images/c2.jpg" className="img-responsive" alt="" />
								 <div className="bottom-color">
									<h4>Top post 2</h4>
									<p>by User two</p>
								</div>
								<div className="class-bottom">
									<div className="col-md-6 class-time">
										 <ul className="time">
											<li><i className="sun"> </i><span>Sunday October 14 </span></li>
											<li><i className="time"></i><span>12:30PM</span></li>
											<div className="clearfix"></div>
										 </ul>
									</div>
									<div className="col-md-6 class-text">
										<div className="single-one"><span><a href="#"><i className="com"> </i>20l</a></span></div>
										<div className="single-one"><span><a href="#"><i className="four"> </i>400</a></span></div>
									</div>
									<div className="clearfix"></div>
									   <a className="button" href="article"><img src={require('../images/read.png')} className="img-responsive" alt="" /></a>
								</div>
							</div>
							
							 <div className="col-md-6 class-grid wow zoomInLeft animated animated" style={{"visibility": "visible", "animationName": "zoomInLeft"}}>
							     <img src="images/c3.jpg" className="img-responsive" alt="" />
								 <div className="bottom-color">
									<h4>Top post 3</h4>
									<p>by User three</p>
								</div>
								<div className="class-bottom">
									<div className="col-md-6 class-time">
										 <ul className="time">
											<li><i className="sun"> </i><span>Sunday October 14 </span></li>
											<li><i className="time"></i><span>12:30PM</span></li>
											<div className="clearfix"></div>
										 </ul>
									</div>
									<div className="col-md-6 class-text">
										<div className="single-one"><span><a href="#"><i className="com"> </i>20l</a></span></div>
										<div className="single-one"><span><a href="#"><i className="four"> </i>400</a></span></div>
									</div>
									<div className="clearfix"></div>
									    <a className="button" href="article"><img src={require('../images/read.png')} className="img-responsive" alt="" /></a>
								</div>
							</div>
							 <div className="col-md-6 class-grid wow zoomInRight animated animated" style={{"visibility": "visible", "animationName": "zoomInRight"}}>
							     <img src="images/c1.jpg" className="img-responsive" alt="" />
								 <div className="bottom-color">
									<h4>Top post 4</h4>
									<p>by Someone</p>
								</div>
								<div className="class-bottom">
									<div className="col-md-6 class-time">
										 <ul className="time">
											<li><i className="sun"> </i><span>Sunday October 14 </span></li>
											<li><i className="time"></i><span>12:30PM</span></li>
											<div className="clearfix"></div>
										 </ul>
									</div>
									<div className="col-md-6 class-text">
										<div className="single-one"><span><a href="#"><i className="com"> </i>20l</a></span></div>
										<div className="single-one"><span><a href="#"><i className="four"> </i>400</a></span></div>

									</div>
									<div className="clearfix"></div>
									  <a className="button" href="article"><img src={require('../images/read.png')} className="img-responsive" alt="" /></a>
								</div>
							</div>
							<div className="clearfix"></div>
						 </div>
					</div>
				</div>
				
				

		<div className="new-section">
				   <div className="container">
				     <h3>Latest Posts</h3>
				     {
				     	this.props.latestPosts && this.props.latestPosts.map(function(item){
				     		return <div className="new">
											   <div className="col-md-6 new-text wow rollIn animated animated" data-wow-delay="0.4s" style={{"visibility": "visible", "animationDelay": "0.4s", "animationName": "rollIn"}}>
												   <h5>{item.createdAt}</h5>
												   <a href="article"><h4>{item.title}</h4></a>
												   {item.content}
											   </div>
												<div className="col-md-6 welcome-img">
												 <a href="article" className="mask"><img src={item.featuredImage} alt="" className="img-responsive zoom-img" /></a>
												</div>
											   <div className="clearfix"> </div>
										   </div>
				     	})
				     }
				</div>
			</div>		
					   <div className="clearfix"></div>
					   
					  
		      	
				
				<Footer />	
				
			</div>


				
			)
	}
});

export default Home