import React from 'react'
import Header from '../includes/Header'
import Sidebar from '../includes/Sidebar'
import Footer from '../includes/Footer'
import {searchWidget} from '../../../includes/widgets'
import _ from 'lodash'

const Home = React.createClass({
	render: function() {
		return (
			<div className="application">
				<Header theMenu={this.props.theMenu()} theConfig={this.props.theConfig}/>	   
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
													{this.props.theImage(item.featuredImage)}
												</div>
												<div className="clearfix"> </div>
											</div>
						     	}.bind(this))
						     }
						     {this.props.thePagination()}
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