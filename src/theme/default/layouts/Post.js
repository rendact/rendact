//import './Home.css'
import React from 'react'

import Header from '../includes/Header'
import Sidebar from '../includes/Sidebar'
import Footer from '../includes/Footer'
//import RM from 
const Post = () => {

	return (

	<div>
		<Header/>
		<div className="second-head">
			<div className="container">
				<h2><a href="index.html"><h5>Home </h5></a> / Posts</h2>
			 </div>
		</div>
		
		<div className="container">
      		<div className="row single-top">
		  	   <div className="col-md-8">
		  	   	<div className="blog_box">
				 <div className="blog_grid">
				  <h3 className="wow rollIn animated" data-wow-delay="0.4s"><a href="post">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. </a></h3>
				  <a href="post"><img src="images/blog1.jpg" className="img-responsive" alt=""/></a>
				  <div className="singe_desc">
				    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis ni obortis nisl ut aliquip obortis nisl ut aliquip</p>
				     <div className="comments">
		  				<ul className="links">
		  					<li><i className="blog_icon1"> </i><br /><span>April 14, 2014</span></li>
		  					<li><a href="#"><i className="blog_icon2"> </i><br /><span>admin</span></a></li>
		  					<li><a href="#"><i className="blog_icon3"> </i><br /><span>1206</span></a></li>
		  					<li><a href="#"><i className="blog_icon4"> </i><br /><span>1206</span></a></li>
		  				</ul>
		  				<div className="btn_blog"><a href="post"><img src={require('../images/read.png')} className="img-responsive" alt="" /></a></div>
		  		        <div className="clearfix"></div>
		  		     </div>
				  </div>
				 </div>
				</div>

				<div className="blog_box">
				 <div className="blog_grid">
				   <h3 className="wow rollIn animated" data-wow-delay="0.4s"><a href="post">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. </a></h3>
				  <a href="post"><img src="images/blog2.jpg" className="img-responsive" alt=""/></a>
				  <div className="singe_desc">
				    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem </p>
				     <div className="comments">
		  				<ul className="links">
		  					<li><i className="blog_icon1"> </i><br /><span>April 14, 2014</span></li>
		  					<li><a href="#"><i className="blog_icon2"> </i><br /><span>admin</span></a></li>
		  					<li><a href="#"><i className="blog_icon3"> </i><br /><span>1206</span></a></li>
		  					<li><a href="#"><i className="blog_icon4"> </i><br /><span>1206</span></a></li>
		  				</ul>
		  				<div className="btn_blog"><a href="post"><img src={require('../images/read.png')} className="img-responsive" alt="" /></a></div>
		  		        <div className="clearfix"></div>
		  		     </div>
				  </div>
				 </div>
				</div>

				<div className="blog_box">
				 <div className="blog_grid">
				  <h3 className="wow rollIn animated" data-wow-delay="0.4s"><a href="post">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. </a></h3>
				  <a href="post"><img src="images/blog3.jpg" className="img-responsive" alt=""/></a>
				  <div className="singe_desc">
				    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem </p>
				     <div className="comments">
		  				<ul className="links">
		  					<li><i className="blog_icon1"> </i><br /><span>April 14, 2014</span></li>
		  					<li><a href="#"><i className="blog_icon2"> </i><br /><span>admin</span></a></li>
		  					<li><a href="#"><i className="blog_icon3"> </i><br /><span>1206</span></a></li>
		  					<li><a href="#"><i className="blog_icon4"> </i><br /><span>1206</span></a></li>
		  				</ul>
		  				<div className="btn_blog"><a href="post"><img src={require('../images/read.png')} className="img-responsive" alt="" /></a></div>
		  		        <div className="clearfix"></div>
		  		     </div>
				  </div>
				 </div>
				</div>
				<ul className="dc_pagination dc_paginationA dc_paginationA06 wow fadeInDownBig animated animated" data-wow-delay="0.4s">
				  <li><a href="#" className="current">Prev</a></li>
				  <li><a href="#">1</a></li>
				  <li><a href="#">2</a></li>
				  <li><a href="#">3</a></li>
				  <li><a href="#">4</a></li>
				  <li><a href="#">5</a></li>
				  <li><a href="#">...</a></li>
				  <li><a href="#">19</a></li>
				  <li><a href="#">20</a></li>
				  <li><a href="#" className="current">Next</a></li>
		       </ul>
			   </div>
				<Sidebar />
			   <div className="clearfix"></div>
			  </div>
      	</div>
		
		<Footer />	
		
	</div>


		
	)
}

export default Post