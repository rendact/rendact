import React from "react";
import Header from "../includes/Header";
import Footer from "../includes/Footer";
import Main from "../includes/Main";
import Content from "../includes/Content";
import Nav from "../includes/Nav";
import PostList from "../includes/PostList";

class Home extends React.Component {
  renderPostList(data, thePagination) {
    return (
      <section className="main">
        {data &&
          data.map(post => (
            <PostList
              key={post.id}
              title={post.title}
              content={post.content && post.content.trim().slice(0, 100)}
              image={
                post.imageFeatured
                  ? post.imageFeatured.blobUrl
                  : require("images/logo-128.png")
              }
              id={post.id}
            />
          ))}
        {thePagination}
      </section>
    );
  }

  componentDidMount() {
    require("../assets/css/main.css");
  }
  render() {
    let { data, thePagination, loadDone, theConfig } = this.props;
    return (
      <div id="wrapper">
        <Header
          title={(theConfig && theConfig.name) || "Rendact"}
          tagline={
            (theConfig && theConfig.tagline) || "Just another rendact blog"
          }
          logo={
            (theConfig && theConfig.logo) || require("images/logo-circle.svg")
          }
        />
        <Nav {...this.props} />
        <Main>
          {loadDone ? (
            theConfig.frontPage === "page" ? (
              <Content content={data && data.content} />
            ) : (
              this.renderPostList(data, thePagination)
            )
          ) : null}
        </Main>
        <Footer {...this.props} />
      </div>
    );
  }
}

export default Home;
