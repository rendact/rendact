import React from 'react';

class Post extends React.Component {
  render(){
    let {
      title,
      image,
      content
    } = this.props;
    return(
      <section id="one">
        <div className="inner">
          <header className="major">
            <h1>{title}</h1>
          </header>
          <span className="image main"><img src={image} alt=""/></span>
          <div dangerouslySetInnerHTML={{__html: content}}/>
        </div>
      </section>
    )
  }
}


export default Post;
