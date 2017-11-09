import $ from 'jquery'
import React from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import moment from 'moment';
import {Link} from 'react-router';
import Menu from '../includes/Menu';

let Single = React.createClass({
  componentDidMount(){
    require('../assets/css/main.css')
  },

  handleShowMenu(){
    document.body.className = "is-menu-visible";
  },

  render(){
    let {
    	postData,
      theConfig,
      data,
      thePagination,
      loadDone
    } = this.props
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
						<nav>
							<a href="#" onClick={this.handleShowMenu}>Menu</a>
						</nav>
					</header>

					<section id="banner">
						<div className="inner">
							<div className="logo"><img src={ require('images/logo-128.png') } alt="" /></div>
							<p>{theConfig ? theConfig.tagline: "hello"}</p>
						</div>
					</section>

					<section id="wrapper">

						{postData &&
							<section id="one" className= "wrapper spotlight style1">
								<div className="inner">
									<div className="content">
										<h2 className="major">{postData.title && postData.title}</h2>
									</div>
								</div>
								<div className="inner">
									<img src={postData.imageFeatured ? postData.imageFeatured.blobUrl: require('images/logo-128.png') } alt="" />
								</div>
								<div className="inner">
									<div className="content">
										<h5 className="major"></h5>
										<p dangerouslySetInnerHTML={{__html: postData.content ? postData.content:""}} />
									</div>
								</div>
							</section>
						}

					</section>

					<section id="footer">
						<div className="inner">

            <h5 className="major"></h5>
						
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

export default Single;