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
      </section>
    );
  }

  componentDidMount() {
    require("../assets/css/main.css");
  }
  render() {
    return (
      <div id="wrapper">
        <Header title="Rendact" tagline="hello" />
        <Nav />
        <Main>{this.renderPostList(this.props.data)}</Main>
        <Footer />
      </div>
    );
  }
}

export default Home;
