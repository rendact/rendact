import React from "react";

class Main extends React.Component {
  componentDidMount() {
    document.getElementById("root").style = "";
    document.getElementById("router").style = "";
  }
  render() {
    let { children, className } = this.props;
    return (
      <div id="main" className={className ? className : null}>
        {this.props.children}
      </div>
    );
  }
}

export default Main;
