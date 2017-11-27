import $ from 'jquery'
import React from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import moment from 'moment';
import {Link} from 'react-router';
import NavPanel from '../includes/NavPanel';

let Single = React.createClass({
  componentDidMount(){
    require('../assets/css/main.css')
  },

  render(){
    let {
      postData,
      theConfig,
      data,
      thePagination,
      loadDone,
      isHome
    } = this.props
    // debugger
    return (	
    <div>
			<div id="page-wrapper">
				<header id="header">
					<h1 id="logo"><Link to="/"><strong>{theConfig ? theConfig.name : "Rendact"}</strong></Link></h1>
					<nav id="nav">
								{this.props.theMenu()}
					</nav>
				</header>
				{postData &&
					<div id="main" className="wrapper style1">
						<div className="container">
							<header className="major">
								<h2>{postData.title && postData.title}</h2>
							</header>

								<section id="content">
									<a href="#" className="image fit">
										<img src={postData.imageFeatured ? postData.imageFeatured.blobUrl: require('images/logo-128.png') } alt="" />
									</a>
									<p dangerouslySetInnerHTML={{__html: postData.content ? postData.content:""}} />
								</section>

						</div>
					</div>
				}
				<footer id="footer">

					<div className="container">
		        <div className="row">
		          {this.props.footerWidgets.map((fw, i) => (
		            <div className="4u 12u$(medium)" key={i}>{fw}</div>
		          ))}
		        </div>
	      	</div>
	      	<hr />
					<ul className="icons">
						<li><a href="#" className="icon alt fa-twitter"><span className="label">Twitter</span></a></li>
						<li><a href="#" className="icon alt fa-facebook"><span className="label">Facebook</span></a></li>
						<li><a href="#" className="icon alt fa-linkedin"><span className="label">LinkedIn</span></a></li>
						<li><a href="#" className="icon alt fa-instagram"><span className="label">Instagram</span></a></li>
						<li><a href="#" className="icon alt fa-github"><span className="label">GitHub</span></a></li>
						<li><a href="#" className="icon alt fa-envelope"><span className="label">Email</span></a></li>
					</ul>
					<ul className="copyright">
						<li>&copy; Untitled. All rights reserved.</li><li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
					</ul>
				</footer>
			</div>
			<NavPanel {...this.props}/>
		</div>

		)
  }
});

export default Single;