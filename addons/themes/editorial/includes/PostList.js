import React from 'react';
import {Link} from 'react-router';


const PostList = ({image, title, content, id}) => (
  <article>
    <Link className="image" to={"/post/"+ id}><img src={image} alt=""/></Link>
    <h3>{title}</h3>
    <p dangerouslySetInnerHTML={{__html: content}}/>
    <ul className="actions">
      <li><Link className="button" to={"/post/" + id}>More</Link></li>
    </ul>
  </article>
)

export default PostList;
