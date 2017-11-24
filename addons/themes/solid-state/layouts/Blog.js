import $ from 'jquery'
import React from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import moment from 'moment';
import {Link} from 'react-router';
import Menu from '../includes/Menu';

let Blog = React.createClass({
  componentDidMount(){
    require('../assets/css/main.css')
  },

  handleShowMenu(){
    document.body.className = "is-menu-visible";
  },

  render(){
    let { theConfig, latestPosts: data, thePagination, loadDone } = this.props;
    // debugger
    return (
    	<div>
				<div id="page-wrapper">

					{/* <header id="header" className="alt">*/}
					<header id="header" className="">
						<h1>
							<strong>
								<Link to="/">
									{theConfig ? theConfig.name : "Rendact"}
								</Link>
							</strong>
						</h1>
						<nav id="nav">
							<a href="#menu" className="menuToggle" onClick={this.handleShowMenu}><span>Menu</span></a>
						</nav>
					</header>

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
			<Menu {...this.props}/>
		</div>
    )
  }
});

export default Blog;