import React from "react";
import { Link } from "react-router";

class Spotlight extends React.Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll(e) {
    if (this.section) {
      let rect = this.section.getBoundingClientRect(),
        scrollPos =
          document.documentElement.scrollTop || document.body.scrollTop;

      if (rect.top + 20 * 0.65 <= scrollPos) {
        this.section.classList.remove("inactive");
      } else {
        this.section.classList.add("innactive");
      }
    }
  }
  render() {
    let { image, content, title, id, className } = this.props;
    return (
      <section
        ref={section => {
          this.section = section;
        }}
        className="inactive"
      >
        <a
          href="#"
          className="image"
          style={{
            backgroundImage: `url(${image})`,
            backgroundPosition: "center center"
          }}
        />
        <span className="content">
          <span className="inner">
            <h2>{title}</h2>
            <p dangerouslySetInnerHTML={{ __html: content }} />
            <ul className="actions">
              <li>
                <Link to={"/post/" + id} className="button">
                  Read More
                </Link>
              </li>
            </ul>
          </span>
        </span>
      </section>
    );
  }
}

export default Spotlight;
