import $ from 'jquery';
window.jQuery = $;
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
		console.log("url "+location.pathname.split("/").slice(1))
		var rend_element
		
		if (location.pathname.split("/").slice(1) === "" || location.pathname.split("/").slice(1) === "index.html") {
			rend_element = <Home/>;
		} else if (location.pathname.split("/").slice(1) === "post") { 
			rend_element = <Page/>;
		} else if (location.pathname.split("/").slice(1) === "blogs") { 
			rend_element = <Post/>;
		} else {
			rend_element = <Home/>;
		}
				
				
		return (			
				<div className="application">
					{rend_element}
				</div>
		)	
	},
	componentDidMount() {
		require ('./css/style.css');
		require ('./css/animate.css');
		require ('bootstrap/dist/css/bootstrap.css');
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
