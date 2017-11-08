import $ from 'jquery'
import React from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import moment from 'moment';
import {Link} from 'react-router';

let Home = React.createClass({
  componentDidMount(){
    require('../assets/css/main.css')
  },

  render(){
    let {
      theConfig,
      data,
      thePagination,
      loadDone
    } = this.props
    // debugger
    return (

			<div id="page-wrapper">

				
					{/* <header id="header" className="alt">*/}
					<header id="header" className="">
						<h1>{theConfig ? theConfig.name : "Rendact"}</h1>
						<nav>
							<a href="#menu">Menu</a>
						</nav>
					</header>

			
					<nav id="menu">
						<div className="inner">
							<h2>Menu</h2>
							<ul className="links">
								<li><a href="index.html">Home</a></li>
								<li><a href="generic.html">Generic</a></li>
								<li><a href="elements.html">Elements</a></li>
								<li><a href="#">Log In</a></li>
								<li><a href="#">Sign Up</a></li>
							</ul>
							<a href="#" className="close">Close</a>
						</div>
					</nav>

				
					<section id="banner">
						<div className="inner">
							<div className="logo"><img src={ require('images/logo-128.png') } alt="" /></div>
							<p>{theConfig ? theConfig.tagline: "hello"}</p>
						</div>
					</section>

				
					<section id="wrapper">

						{data && data.map((post, index) => (
							<section id="one" className={index%2===0 ? "wrapper spotlight style1":"wrapper alt spotlight style2" }>
								<div className="inner">
									<Link className="image" to={"/post/" + post.id}>
										<img src={post.imageFeatured ? post.imageFeatured.blobUrl: require('images/logo-128.png') } alt="" />
									</Link>
									<div className="content">
										<h2>
											<Link className="major" to={"/post/" + post.id}>{post.title && post.title}</Link>
										</h2>
										<p dangerouslySetInnerHTML={{__html: post.content ? post.content.slice(0, 200):""}} />
										<Link className="special" to={"/post/" + post.id}>Continue Reading</Link>
									</div>
								</div>
							</section>
						))}

					</section>


				
					<section id="footer">
						<div className="inner">

            <h2 className="major" style={{textAlign: "center"}}>
                {this.props.thePagination}
            </h2>
            <h2 className="major"></h2>
						
						<div className="row">
							{this.props.footerWidgets.map((fw, i) => (
	              <div className="4u 12u$(medium)" key={i}>{fw}</div>
	            ))}
						</div>

						<ul className="copyright">
							<li>&copy; Story based theme</li><li>html5up</li><li>converted by Rendact Team</li>
						</ul>
					</div>
				</section>

			</div>
    )
  }
});

export default Home;