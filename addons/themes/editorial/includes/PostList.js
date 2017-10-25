import React from 'react';


const PostList = ({image, title, content, id}) => (
  <article>
    <a className="image" href={"/post/"+ id}><img src={image} alt=""/></a>
    <h3>{title}</h3>
    <p dangerouslySetInnerHTML={{__html: content}}/>
    <ul className="actions">
      <li><a className="button" href={"/post/" + id}>More</a></li>
    </ul>
  </article>
)

export default PostList;
