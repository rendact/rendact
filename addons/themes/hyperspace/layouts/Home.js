import React from "react";
import Nav from "../includes/Nav";
import Wrapper from "../includes/Wrapper";
import Sidebar from "../includes/Sidebar";
import Footer from "../includes/Footer";
import Spotlight from "../includes/Spotlight";
import Content from "../includes/Content";

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
      <section
        className="wrapper style2 spotlights"
        style={
          data && data.length ? { minHeight: null } : { minHeight: "100vh" }
        }
      >
        {data &&
          data.map((post, idx) => (
            <Spotlight
              className="inactive"
              content={post.content && post.content.trim().slice(0, 100)}
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
        {pagination}
      </section>
    );
  }

  render() {
    let {
      loadDone,
      theConfig,
      data,
      theMenu,
      thePagination,
      footerWidgets
    } = this.props;
    return (
      <div>
        <Sidebar theMenu={theMenu} />
        <Wrapper footerWidgets={footerWidgets}>
          {loadDone ? (
            theConfig.frontPage === "latestPost" ? (
              this.renderPostList(data, thePagination)
            ) : (
              <Content
                image={data.imageFeatured ? data.imageFeatured.blobUrl : null}
                content={data.content}
              />
            )
          ) : null}
        </Wrapper>
        <Footer />
      </div>
    );
  }
}

export default Home;
