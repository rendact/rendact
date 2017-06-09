//import './Header.css'
import React from 'react'

//import logo from '../../../public/images/logo.svg';
//{logo}

// navbar-static-top && navbar-fixed-top
const Header = ({params}) => {
	return (
		<div className="banner two" id="home">
				<div className="header-bottom">
				 <div className="fixed-header">
					<div className="container">
						<div className="logo">
							<a href="index.html"><h1>Rend<span>act</span></h1></a>
						</div>
						<span className="menu"> </span>
						<div className="top-menu">
						<nav className="navigation">
							<ul className="cl-effect-16">
								<li><a className="active" href="index.html">Home</a></li>
								<li><a href="blogs">Blogs</a></li>
								<li><a href="#">Menu 2</a></li>
								<li><a href="#">Menu 3</a></li>
								<li><a href="#">Menu 4</a></li>
								<li><a href="#">Menu 5</a></li>
							</ul>
						</nav>		
						</div>

						<div className="clearfix"></div>
					</div>
				 </div>
			</div>
		</div>

	)
}

export default Header
