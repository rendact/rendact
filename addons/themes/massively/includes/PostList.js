import React from 'react';

const PostList = (props) => (
  <article>
    <header>
      <span className="date">{props.date}</span>
      <h2><a href={"/post/" + props.postId}>{props.title}</a></h2>
    </header>
    <a href="#" className="image fit">
      <img src={props.imageFeatured}/>
    </a>
    <p dangerouslySetInnerHTML={{__html: props.content}}/>
    <ul className="actions">
      <li>
        <a className="button" href={"/post/" + props.postId}>Full Content</a>
      </li>
    </ul>
  </article>
)

export default PostList;
