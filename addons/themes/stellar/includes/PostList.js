import React from "react";
import { Link } from "react-router";

class PostList extends React.Component {
  render() {
    let { image, content, title, date } = this.props;
    return (
      <div>
        <span className="image left">
          <img src={image} />
        </span>
        <h2>{title}</h2>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    );
  }
}

export default PostList;
