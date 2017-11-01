import React from "react";
import Nav from "../includes/Nav";
import Wrapper from "../includes/Wrapper";
import Sidebar from "../includes/Sidebar";
import Footer from "../includes/Footer";
import Spotlight from "../includes/Spotlight";

class Home extends React.Component {
  render() {
    return (
      <div>
        <Sidebar />
        <Wrapper />
        <Footer />
      </div>
    );
  }
}

export default Home;
