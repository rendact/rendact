import React from "react";

class Header extends React.Component {
  render() {
    let logo, title, tagline;
    ({ logo, title, tagline } = this.props);
    return (
      <header id="header">
        {logo && (
          <span className="logo">
            <img src={logo} />
          </span>
        )}
        <h2>{title}</h2>
        <p>{tagline}</p>
      </header>
    );
  }
}

export default Header;
