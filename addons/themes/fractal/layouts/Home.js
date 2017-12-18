import $ from 'jquery'
import React from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import moment from 'moment';
import {Link} from 'react-router';
import scrollToElement from 'scroll-to-element';

let Home = React.createClass({
  componentDidMount(){
    require('../assets/css/main.css')
  },

  handleScrolly(e){
    scrollToElement("#two", {
      duration: 1500,
      offset: 0,
      ease: 'in-sine'
    })
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
    <div>

			<header id="header">
				<div className="content">
					<Link to="/">
						<img src={ require('images/logo-128.png') } alt="" />
					</Link>
					<p>{theConfig?theConfig.tagline:"Hello"}<br />
					Just a simple, single page responsive</p>
					<div className="actions">
						<a href="#two" className="button icon fa-chevron-down scrolly" onClick={this.handleScrolly}>Learn More</a>
					</div>
				</div>
				<div className="inner">
					<nav id="menu">
            {this.props.theMenu()}
          </nav>
				</div>
			</header>

			<section id="two" className="wrapper">
				<div className="inner alt">

					{data && data.map((post, index) => (
						<section className="spotlight">
							<div className="image">
								<Link to={"/post/" + post.id}>
									<img src={post.imageFeatured ? post.imageFeatured.blobUrl: require('images/logo-128.png') } alt="" />
								</Link>
							</div>
							<div className="content">
								<Link to={"/post/" + post.id}><h3>{post.title && post.title}</h3></Link>
								<p dangerouslySetInnerHTML={{__html: post.content ? post.content.slice(0, 250):""}} />
								<Link className="button icon fa-chevron-down scrolly" to={"/post/" + post.id}>Read More</Link>
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