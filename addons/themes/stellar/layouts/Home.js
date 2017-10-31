import React from "react";
import Header from "../includes/Header";
import Footer from "../includes/Footer";
import Main from "../includes/Main";
import Content from "../includes/Content";
import Nav from "../includes/Nav";

class Home extends React.Component {
  componentDidMount() {
    require("../assets/css/main.css");
  }
  render() {
    return (
      <div id="wrapper">
        <Header />
        <Nav />
        <Content />
        <Footer />
      </div>
    );
  }
}

export default Home;
