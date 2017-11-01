import React from "react";

class Header extends React.Component {
  render() {
    let logo, title, tagline;
    ({ logo, title, tagline } = this.props);
    return (
      <header id="header">
        {logo && (
          <span className="logo">
            <img src={logo} style={{ maxHeight: 85, maxWidth: 85 }} />
          </span>
        )}
        <h1>{title}</h1>
        <p>{tagline}</p>
      </header>
    );
  }
}

export default Header;
