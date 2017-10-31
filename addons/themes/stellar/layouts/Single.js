import React from "react";
import Header from "../includes/Header";
import Footer from "../includes/Footer";
import Main from "../includes/Main";
import Content from "../includes/Content";
import Nav from "../includes/Nav";
import PostList from "../includes/PostList";

class Home extends React.Component {
  componentDidMount() {
    require("../assets/css/main.css");
  }
  render() {
    let { theConfig } = this.props;
    return (
      <div id="wrapper">
        <Header
          title={theConfig ? theConfig.name : "Rendact"}
          tagline={theConfig ? theConfig.tagline : "Just another rendact blog"}
        />
        <Nav {...this.props} />
        <Main>ksajfalfa</Main>
        <Footer {...this.props} />
      </div>
    );
  }
}

export default Home;
