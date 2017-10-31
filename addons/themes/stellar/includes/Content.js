import React from "react";

class Content extends React.Component {
  render() {
    let image, title, content, date;
    ({ image, title, content, date } = this.props);
    return (
      <section id="content" className="main">
        <span className="image main">
          <img src={image} style={{ marginTop: 80 }} />
        </span>
        <h2>{title}</h2>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </section>
    );
  }
}

export default Content;
