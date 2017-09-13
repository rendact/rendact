import React from 'react';
import MetaTags from 'react-meta-tags';

const Header = React.createClass({
	render: function() {
		return (
			<div className="banner two" id="home">
				{this.props.theConfig && 
					<MetaTags>
	          <title>{this.props.theConfig.name}</title>
	          <meta id="meta-description" name="description" content={this.props.theConfig.tagline} />
	        </MetaTags>
      	}
					<div className="header-bottom">
					 <div className="fixed-header">
						<div className="container">
							{this.props.theLogo()}
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
