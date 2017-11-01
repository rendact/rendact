import React from "react";

class Sidebar extends React.Component {
  render() {
    let { theMenu } = this.props;
    return (
      <section id="sidebar">
        <div className="inner">
          <nav>{theMenu()}</nav>
        </div>
      </section>
    );
  }
}

export default Sidebar;
