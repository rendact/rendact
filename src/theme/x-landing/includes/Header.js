import React from 'react';
import MetaTags from 'react-meta-tags';
import {Link} from 'react-router'

const Header = React.createClass({
	render: function() {
		return (
	<header id="header">
    {this.props.theConfig &&
        <MetaTags>
          <title>{this.props.theConfig.name}</title>
          <meta id="meta-description" name="description" content={this.props.theConfig.tagline}/>
        </MetaTags>
    }
		<h1 id="logo">
      <Link to="/"><span>R</span>endact</Link>
		</h1>
    <nav id="nav">
      {this.props.theMenu}
		</nav>
	</header>
		)
	}
});

export default Header
