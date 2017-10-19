import React from 'react'
import {Link} from 'react-router'

const PostList = (props) => (
  <article className={props.className}>
    <span className="image">
      <img src={props.image} alt={props.alt} style={{height: 360, width:333}}/>
    </span>
    <Link to={"/post/"+props.id}>
      <h2>{props.title}</h2>
      <div className="content">
        
        <p dangerouslySetInnerHTML={{__html: props.content}}/>
      </div>
    </Link>
  </article>
)

export default PostList;
