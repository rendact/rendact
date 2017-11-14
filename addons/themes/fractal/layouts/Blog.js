import $ from 'jquery'
import React from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import moment from 'moment';
import {Link} from 'react-router';

let Blog = React.createClass({
  componentDidMount(){
    require('../assets/css/main.css')
  },

render(){
  let { theConfig, latestPosts: data, thePagination, loadDone } = this.props;
    // debugger
    return (
    <div>
    	<header id="head" className="">
				<h1>
					<strong>
						<Link to="/">
							{theConfig ? theConfig.name : "Rendact"}
						</Link>
					</strong>
				</h1>
				<nav className="links">
          {this.props.theMenu()}
        </nav>
			</header>
			
			<section id="two" className="wrapper">
				<div className="inner alt">

					{data && data.map((post, index) => (
						<section className="spotlight">
							<div className="image">
								<img src={post.imageFeatured ? post.imageFeatured.blobUrl: require('images/logo-128.png') } alt="" />
							</div>
							<div className="content">
								<h3>{post.title && post.title}</h3>
								<p dangerouslySetInnerHTML={{__html: post.content ? post.content.slice(0, 300):""}} />
							</div>
						</section>
					))}

					<section className="special">
						<div style={{textAlign: "center"}}>
              {this.props.thePagination}
            </div>
					</section>
				</div>
			</section>

			<section id="three" className="wrapper style2 special" style={{ padding: 50 }}>
          <div className="row">
            {this.props.footerWidgets &&
              this.props.footerWidgets.map((fw, idx) => <div className="4u">{fw}</div>)}
          </div>
			</section>

			<footer id="footer">
				<ul className="icons">
					<li><a href="#" className="icon fa-facebook"><span className="label">Facebook</span></a></li>
					<li><a href="#" className="icon fa-twitter"><span className="label">Twitter</span></a></li>
					<li><a href="#" className="icon fa-instagram"><span className="label">Instagram</span></a></li>
				</ul>
				<p className="copyright">&copy; Rendact Team. Credits: <a href="http://html5up.net">HTML5 UP</a></p>
			</footer>
		</div>	
		)
  }
});

export default Blog;