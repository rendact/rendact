import React from "react";
import { Link } from "react-router";

class Spotlight extends React.Component {
  render() {
    let { image, content, title, id, className } = this.props;
    return (
      <section className={className}>
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
