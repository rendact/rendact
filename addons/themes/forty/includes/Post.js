import React from 'react';

class Post extends React.Component {
  render(){
    let {
      title,
      image,
      content,
      isHome
    } = this.props;
    return(
      <section id="one">
        <div className="inner">
          {!isHome &&
          <header className="major">
            <h1>{title}</h1>
          </header>
          }
          <span className="image main"><img src={image} alt=""/></span>
          <div dangerouslySetInnerHTML={{__html: content}}/>
        </div>
      </section>
    )
  }
}


export default Post;
