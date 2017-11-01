import React from "react";
import Nav from "../includes/Nav";
import Wrapper from "../includes/Wrapper";
import Sidebar from "../includes/Sidebar";
import Footer from "../includes/Footer";
import Spotlight from "../includes/Spotlight";
import Content from "../includes/Content";

class Home extends React.Component {
  componentDidMount() {
    require("../assets/css/main.css");
  }
  render() {
    let { postData: { title, content, imageFeatured } } = this.props;
    return (
      <div>
        <Nav />
        <Wrapper>
          <Content
            title={title}
            content={content}
            image={
              imageFeatured
                ? imageFeatured.blobUrl
                : require("images/logo-128.png")
            }
          />
        </Wrapper>
        <Footer />
      </div>
    );
  }
}

export default Home;
