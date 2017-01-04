import './Header.css'
import React from 'react'

//import logo from '../../../public/images/logo.svg';
//{logo}

// navbar-static-top && navbar-fixed-top
const Header = ({params}) => {
	return (
		<div className="pos-f-t">
			<div className="collapse" id="navbar-header">
				<div className="container bg-inverse p-1">
					<h3>Collapsed content</h3>
					<p>Toggleable via the navbar brand.</p>
				</div>
			</div>
			<nav className="navbar navbar-light navbar-static-top bg-faded">
				<div className="container">
					<button className="navbar-toggler hidden-sm-up" type="button" data-toggle="collapse" data-target="#exCollapsingNavbar2" aria-expanded="false" aria-controls="exCollapsingNavbar2" aria-label="Toggle navigation"></button>
					<div className="collapse navbar-toggleable-xs" id="exCollapsingNavbar2">
						<a className="navbar-brand" href="#"><img src="/images/logo.svg" height="30px" className="logo" alt="logo"/></a>
						<ul className="nav navbar-nav">
							<li className="nav-item active">
								<a className="nav-link" href="#">Home
									<span className="sr-only">(current)</span>
								</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="#">Menu1</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="#">Menu2</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="#">Menu3</a>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</div>
	)
}

export default Header
