import React from 'react'

const Header = React.createClass({
	randomText: function(){
		return <p>Random</p>
	},
	goHome: function(e) {
		e.preventDefault();
		this._reactInternalInstance._context.history.push('/')
	},
	render: function() {
		return (
			<div className="banner two" id="home">
					<div className="header-bottom">
					 <div className="fixed-header">
						<div className="container">
							<div className="logo">
								<a href="#" onClick={this.goHome}><h1>Rend<span>act</span></h1></a>
							</div>
							<span className="menu"> </span>
							<div className="top-menu">
								<nav className="navigation">
									{this.props.theMenu}
								</nav>		
							</div>
							<div className="clearfix"></div>
						</div>
					 </div>
				</div>
			</div>
		)
	}
});

export default Header
