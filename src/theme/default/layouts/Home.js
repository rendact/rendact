import React from 'react'
import Header from '../includes/Header'
import Sidebar from '../includes/Sidebar'
import Footer from '../includes/Footer'
import _ from 'lodash'
import moment from 'moment';

const Home = React.createClass({
	render: function() {
		return (
			<div className="application">
				<Header {...this.props} />	   
				<div className="container">
					<div className="col-md-8 new-section">
						     {
						     	this.props.latestPosts && this.props.latestPosts.map(function(item){
						     		return 	<div key={item.id} className="new">
												<div className="col-md-6 new-text wow fadeIn animated">
													{this.props.theTitle(item.id, item.title)}
													<small>{moment(item.createdAt).format("MMMM Do YY, h:mm:ss a")}</small>
													<section className="content-body">
														{this.props.theExcerpt(item.content)}
													</section>
												</div>
												<div className="col-md-6 welcome-img">
													{this.props.theImage(item.imageFeatured)}
												</div>
												<div className="clearfix"> </div>
											</div>
						     	}.bind(this))
						     }
						     {this.props.thePagination}
					</div>	
					<Sidebar {...this.props} />
				  <div className="clearfix"></div>
				</div>
				<Footer {...this.props} />	
			</div>
		)
	}
});

export default Home;
