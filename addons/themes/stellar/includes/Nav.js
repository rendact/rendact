import React from "react";
import { Link } from "react-router";

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnScroll = this.handleOnScroll.bind(this);

    this.state = {
      alt: false
    };
  }

  handleOnScroll(e) {
    let navControl, footer;
    navControl = document.getElementById("navControl");
    footer = document.getElementById("footer");

    let rect = navControl && navControl.getBoundingClientRect();

    let footerRect = footer && footer.getBoundingClientRect();

    if (rect.top <= window.pageXOffset) {
      this.setState({ alt: true });
    } else {
      this.setState({ alt: false });
    }

    if (footerRect.top + rect.height <= window.pageXOffset) {
      this.setState({ alt: false });
    }
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleOnScroll);
  }
  componentWillUnMount() {
    window.removeEventListener("scroll", this.handleOnScroll);
  }
  render() {
    let theMenu = this.props.theMenu();
    return (
      <div>
        <div id="navControl" />
        <nav id="nav" className={this.state.alt ? "alt" : null}>
          {theMenu.props.menuItems.length ? (
            <ul className="icons" style={{ position: "absolute" }}>
              <li>
                <Link to="/" className="icon fa-home">
                  {" "}
                  Home
                </Link>
              </li>
            </ul>
          ) : null}
          {theMenu}
        </nav>
      </div>
    );
  }
}

export default Nav;
