import React from 'react';
import {Link} from 'react-router';

const PostList = (props) => (
  <article>
    <header>
      <span className="date">{props.date}</span>
      <h2><Link to={"/post/" + props.postId}>{props.title}</Link></h2>
    </header>
    <Link to="#" className="image fit">
      <img src={props.imageFeatured}/>
    </Link>
    <p dangerouslySetInnerHTML={{__html: props.content}}/>
    <ul className="actions">
      <li>
        <Link className="button" to={"/post/" + props.postId}>Full Content</Link>
      </li>
    </ul>
  </article>
)

export default PostList;
