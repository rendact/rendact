import React from 'react';

const Post = ({
  title,
  date,
  image,
  content,
  isHome
}) => (
  <section>
    {!isHome &&
    <header className="main">
      <h1>{title}</h1>
      <small>{date}</small>
    </header>
    }
    <span className="image main"><img src={image} alt=""/></span>
    <p dangerouslySetInnerHTML={{__html: content}}/>
  </section>
)

export default Post;
