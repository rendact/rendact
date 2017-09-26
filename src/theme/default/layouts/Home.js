import React from 'react'
import Header from '../includes/Header'
import Sidebar from '../includes/Sidebar'
import Footer from '../includes/Footer'
import _ from 'lodash'
import moment from 'moment';

const Home = React.createClass({
	render: function() {
    debugger
		return (
			<div className="application">
				<Header {...this.props} />	   
				<div className="container">
					<div className="col-md-8 new-section">
						     {
                   this.props.theConfig.frontPage === 'latestPost' ? 
                     <div>
                       {this.props.data && this.props.data.map(function(item){
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
                     :
                     <div>
                       {this.props.data &&
              <div className="blog_box">
							 	<div className="blog_grid">
							  	<h3 className="wow rollIn animated" data-wow-delay="0.4s">{this.props.data.title}</h3>
								  { this.props.data.imageFeatured &&
								  <a href="single.html">
									  <img src={this.props.data.imageFeatured.blobUrl} className="img-responsive" alt=""/>
									</a>
									}
					  
								  <div className="singe_desc">
								    <div dangerouslySetInnerHTML={{__html: this.props.data.content}} />
								    
								    <div className="comments">
						  				<ul className="links">
						  					<li><i className="blog_icon1"> </i><br /><span>April 14, 2014</span></li>
						  					<li><a href="#"><i className="blog_icon2"> </i><br /><span>admin</span></a></li>
						  					<li><a href="#"><i className="blog_icon3"> </i><br /><span>1206</span></a></li>
						  					<li><a href="#"><i className="blog_icon4"> </i><br /><span>1206</span></a></li>
						  				</ul>
						  		    <div className="clearfix"></div>
							  	 	</div>
									</div>
								</div>
              </div>
                       }
							</div>             
						     }
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
