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
    let { theConfig, postData } = this.props;
    return (
      <div id="wrapper">
        <Header title={postData.title} />
        <Nav {...this.props} />
        <Main>
          <Content
            image={
              postData.imageFeatured
                ? postData.imageFeatured.blobUrl
                : require("images/logo-128.png")
            }
            content={postData.content}
          />
        </Main>
        <Footer {...this.props} />
      </div>
    );
  }
}

export default Home;
