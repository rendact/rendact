import React from "react";

class Content extends React.Component {
  render() {
    let { title, image, content } = this.props;
    return (
      <section id="main" className="wrapper">
        <div className="inner">
          <h1 className="major">{title}</h1>
          <span className="image fit">
            <img src={image} />
          </span>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </section>
    );
  }
}

export default Content;
