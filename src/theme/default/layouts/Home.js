import React from 'react'
import Header from '../includes/Header'
import Footer from '../includes/Footer'
import _ from 'lodash'

const Home = React.createClass({
	render: function() {
		return (
			<div className="application">
				<Header theMenu={this.props.theMenu()}/>	   
				<div className="container">
					<div className="col-md-8 new-section">
						     {
						     	this.props.latestPosts && this.props.latestPosts.map(function(item){
						     		return 	<div className="new">
												<div className="col-md-6 new-text wow rollIn animated animated" data-wow-delay="0.4s" style={{"visibility": "visible", "animationDelay": "0.4s", "animationName": "rollIn"}}>
													<small>{item.createdAt}</small>
													{this.props.theTitle(item.id, item.title)}
													<section className="content-body">
														{this.props.theContent(item.content)}
													</section>
												</div>
												<div className="col-md-6 welcome-img">
													<a href="article" className="mask"><img src={item.featuredImage} alt="" className="img-responsive zoom-img" /></a>
												</div>
												<div className="clearfix"> </div>
											</div>
						     	}.bind(this))
						     }
					</div>	
					<div className="col-md-4 new-section">	
						<div className="sidebar-grid wow fadeInUpBig animated" data-wow-delay="0.4s">
							<h3><span className="opening">Top Posts</span></h3>
							<a href="#"><h5>Lorem ipsum dolor sit amet</h5></a>
							<p>Sed rhoncus nulla turpis, vitae rutrum velit iaculis et. Curabitur vestibulum, erat non im</p>
							<p className="month">April 1, 2014 , By Robert Louise</p>
							<a href="#"><h5>Lorem ipsum dolor sit amet</h5></a>
							<p>Sed rhoncus nulla turpis, vitae rutrum velit iaculis et. Curabitur vestibulum, erat non im</p>
							<p className="month">April 1, 2014 , By Robert Louise</p>
						</div>
					</div>
				  <div className="clearfix"></div>
				</div>
				<Footer />	
			</div>
		)
	}
});

export default Home;