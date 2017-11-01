import React from "react";

class Wrapper extends React.Component {
  render() {
    return <div id="wrapper">{this.props.children}</div>;
  }
}

export default Wrapper;
