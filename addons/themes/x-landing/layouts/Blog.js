import React from "react";
import Header from "../includes/Header";
import Footer from "../includes/Footer";
import HeaderMobile from "../includes/HeaderMobile";
import moment from "moment";
import scrollToElement from "scroll-to-element";
import { Link } from "react-router";

const HomeContentWithLatestPost = props => (
  <div>
    {props.latestPosts ? (
      props.latestPosts.map(item => {
        return (
          <div key={item.id} className="new">
            <div className="col-md-6 new-text wow fadeIn animated">
              {props.theTitle(item.id, item.title)}
              <small>
                {moment(item.createdAt).format("MMMM Do YY, h:mm:ss a")}
              </small>
              <section className="content-body">
                {props.theExcerpt(item.content)}
              </section>
            </div>
            <div className="col-md-6 welcome-img">
              {props.theImage && props.theImage(item.imageFeatured)}
            </div>
            <div className="clearfix"> </div>
          </div>
        );
      })
    ) : (
      <div style={{ height: 760, width: "100%", clear: "both" }}>&nbsp;</div>
    )}
    {props.thePagination}
  </div>
);

const Home = React.createClass({
  onContactLinkClick: function(e) {
    if (
      e.target &&
      e.target.nodeName === "A" &&
      e.target.className === "button"
    ) {
      e.preventDefault();
      this._reactInternalInstance._context.history.push("/page/UG9zdDozNzQ=");
    }
  },

  onGotoScrollyClick: function(e) {
    if (
      e.target &&
      e.target.nodeName === "A" &&
      e.target.className === "goto-next scrolly"
    ) {
      e.preventDefault();
      scrollToElement("#items", { duration: 2000, offset: 0 });
    }
  },

  componentDidMount: function() {
    document.body.addEventListener("click", this.onContactLinkClick);
    document.body.addEventListener("click", this.onGotoScrollyClick);
    require("../css/style.css");
    require("../css/main.min.css");
  },
  render: function() {
    return (
      <div id="page-wrapper">
        <Header {...this.props} />
        {<HomeContentWithLatestPost {...this.props} />}
        <Footer {...this.props} />
        <HeaderMobile {...this.props} />
      </div>
    );
  }
});

export default Home;
