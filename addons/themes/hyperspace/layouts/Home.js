import React from "react";
import Nav from "../includes/Nav";
import Wrapper from "../includes/Wrapper";
import Sidebar from "../includes/Sidebar";
import Footer from "../includes/Footer";
import Spotlight from "../includes/Spotlight";

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.renderPostList = this.renderPostList.bind(this);
  }

  componentDidMount() {
    require("../assets/css/main.css");
  }

  renderPostList(data, pagination) {
    return (
      <section className="wrapper style2 spotlights">
        {data &&
          data.map((post, idx) => (
            <Spotlight
              className="inactive"
              content={data.content && data.content.trim.slice(0, 100)}
              title={post.title}
              image={
                post.imageFeatured
                  ? post.imageFeatured.blobUrl
                  : require("images/logo-128.png")
              }
              id={post.id}
              key={post.id}
            />
          ))}
      </section>
    );
  }

  render() {
    let { loadDone, theConfig, data } = this.props;
    return (
      <div>
        <Sidebar />
        <Wrapper>{this.renderPostList(data)}</Wrapper>
        <Footer />
      </div>
    );
  }
}

export default Home;
