import './Header.css'
import React from 'react'

//import logo from '../../../public/images/logo.svg';
//{logo}

const Header = ({params}) => {
	return (
		<div className="include-header">
			<nav className="navbar navbar-default">
				<div className="container-fluid">
					<div className="navbar-header">
						<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
							<span className="sr-only">Toggle navigation</span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
						</button>
						<a className="navbar-brand" href="#"><img src="/images/logo.svg" height="40px" className="logo" alt="logo"/></a>
					</div>
					<div id="navbar" className="navbar-collapse collapse">
						<ul className="nav navbar-nav">
							<li className="active">
								<a href="#">Menu1</a>
							</li>
							<li>
								<a href="#">Menu2</a>
							</li>
							<li>
								<a href="#">Menu3</a>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</div>
	)
}

export default Header
