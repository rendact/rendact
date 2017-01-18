import $ from 'jquery';
window.jQuery = $;

import './css/style.css';
import './css/animate.css';
import 'bootstrap/dist/css/bootstrap.css';

import React from 'react'
// import WOW from 'wowjs';
// import Helmet from "react-helmet";
import Home from './layouts/Home';
import Page from './layouts/Page';
import Post from './layouts/Post';

require ('bootstrap');


const Theme = React.createClass({
	getDefaultProps: function() {
		return {params: location.pathname.split("/").slice(1)};
	},
	getInitialState: function() {
		return {layout: "Home"};
	},
	render: function() {
		var rend_element
		switch (this.state.layout) {
			case "Home":
				rend_element = <Home/>;
				break;
			case "Page":
				rend_element = <Page/>;
				break;
			case "Post":
				rend_element = <Post/>;
				break;
			default:
				rend_element = <Home/>;
				break;
		}
				
				
		return (			
				<div className="application">
					{rend_element}
				</div>
		)	
	},
	componentDidMount() {
		//new WOW.WOW().init();
		
		$( "span.menu" ).click(function() {
		  $( ".top-menu" ).slideToggle( "slow", function() {
			// Animation complete.
		  });
		});
		
		$(document).ready(function() {
			 var navoffeset=$(".header-bottom").offset().top;
			 $(window).scroll(function(){
				var scrollpos=$(window).scrollTop(); 
				if(scrollpos >=navoffeset){
					$(".header-bottom").addClass("fixed");
				}else{
					$(".header-bottom").removeClass("fixed");
				}
			 });
			 
		});
		
	},
	
	componentDidUpdate: function() {
		
	}
	
});

export default Theme
