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
    	
			<header id="header">
				<div className="content">
					<Link to="/">
						<img src={ require('images/logo-128.png') } alt="" />
					</Link>
					<p>{theConfig?theConfig.tagline:"Hello"}<br />
					Just a simple, single page responsive</p>
					<div className="actions">
						<a href="#two" className="button icon fa-chevron-down scrolly">Learn More</a>
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

					{postData &&
						<section className="spotlight">
							<div className="image">
									<img src={postData.imageFeatured ? postData.imageFeatured.blobUrl: require('images/logo-128.png') } alt="" />
							</div>
							<div className="content">
								<h3>{postData.title && postData.title}</h3>
								<p dangerouslySetInnerHTML={{__html: postData.content ? postData.content :""}} />
							</div>
						</section>
					}

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