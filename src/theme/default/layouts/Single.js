import React from 'react'
import Header from '../includes/Header'
import Sidebar from '../includes/Sidebar'
import Footer from '../includes/Footer'
import Notification from 'react-notification-system';
import moment from 'moment'
import {CommentForm} from '../../../includes/Theme/ThemeSingle';

const Single = React.createClass({
	componentDidMount: function() {
  	this.notification = this.refs.notificationSystem;
	},
	render: function() {
		return (
			<div className="application">
				<Header {...this.props} />	   
				<div className="second-head">
					<div className="container">
						{this.props.theBreadcrumb()}
					 </div>
				</div>
				
				<div className="container">
		      		<div className="row single-top">
				  	   <div className="col-md-8">
				  	   	<div className="blog_box">
						 <div className="blog_grid">
						  <h3 className="wow rollIn animated" data-wow-delay="0.4s">{this.props.postData.title}</h3>
						  { this.props.postData.featuredImage &&
						  <a href="single.html">
							  <img src={this.props.postData.featuredImage} className="img-responsive" alt=""/>
							</a>
							}
				  
						  <div className="singe_desc">
						    <div dangerouslySetInnerHTML={{__html: this.props.postData.content}} />
						    
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
					   </div>			
						<Sidebar {...this.props} />
					   <div className="clearfix"></div>
					  
					  
					  	 <div className="single_grid2">
						   <h4 className="tz-title-4 tzcolor-blue">
					            <p className="tzweight_Bold">Comments</p>
					        </h4>
					        <ul className="list">
					        {
					        	this.props.postData.comments && this.props.postData.comments.edges.map(function(item){
					        		return <li>
									            <div className="col-md-10 data">
									                <div className="title"><a href={item.node.website}>{item.node.name}</a><br /><span className="m_14">{moment(item.node.createdAt).format("MMMM Do YY, h:mm:ss a")}</span></div>
									                <p>{item.node.content}</p>
																	<h5 className="m_26"> <a href="#">reply</a></h5>
									            </div>
									           <div className="clearfix"></div>
									        </li>
					        	})
					        }
					     </ul>
					</div>
						<Notification ref="notificationSystem" />
						<div className="single">
								<div className="leave">
									<h4>Leave a comment</h4>
								</div>
								<CommentForm postId={this.props.postId}/>
						</div>
						
					  </div>
		      	</div>
				
				<Footer {...this.props} />	
				
			</div>


				
			)
	}
});

export default Single