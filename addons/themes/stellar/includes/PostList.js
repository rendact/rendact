import React from "react";
import { Link } from "react-router";

class PostList extends React.Component {
  render() {
    let { image, content, title, date, id } = this.props;
    return (
      <section className="row">
        <div className="8u">
          <h2 style={{ textTransform: "capitalize" }}>{title}</h2>
          <p dangerouslySetInnerHTML={{ __html: content }} />
          <ul className="actions align-right">
            <li>
              <Link to={"/post/" + id} className="button">
                Read More
              </Link>
            </li>
          </ul>
        </div>
        <div className="4u">
          <span className="image fit">
            <img src={image} />
          </span>
        </div>
      </section>
    );
  }
}

export default PostList;
