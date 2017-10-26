import React from 'react';
import {Link} from 'react-router';

class PostList extends React.Component {
  render(){
      let {
        title,
        content,
        id,
        image
      } = this.props;

    return (
      <div className="6u 12u$(small)">
        <h3>{title}</h3>
        <div><span className="image left"><img src={image}/></span>
          <div dangerouslySetInnerHTML={{__html: content}}/>
        </div>
        <ul className="actions">
          <li><Link className="button icon fa-search" to={"/post/" + id}>Read More</Link></li>
        </ul>
      </div>
    )
  }
}

export default PostList;
