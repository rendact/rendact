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
    debugger
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
				<nav>
					<a href="#" onClick={this.handleShowMenu}>Menu</a>
				</nav>
			</header>
			<header id="header">
				<div className="content">
					<h1><a href="#">{theConfig?theConfig.name:"Rendact"}</a></h1>
					<p>{theConfig?theConfig.tagline:"Hello"}<br />
					Just a simple, single page responsive</p>
					<div className="actions">
						<a href="#two" className="button icon fa-chevron-down scrolly">Learn More</a>
					</div>
				</div>
				<div className="inner">
					<img src={ require('images/logo-128.png') } alt="" />
				</div>
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

export default Home;