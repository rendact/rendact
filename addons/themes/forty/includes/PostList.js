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
      <section>
        <Link className="image" to={"/post/" + id}><img src={image} alt=""/></Link>
        <div className="content">
          <div className="inner">
            <header className="major">
              <h3>{title}</h3>
            </header>
            <p dangerouslySetInnerHTML={{__html: content}}/>
            <ul className="actions">
              <li><Link className="button" to={"/post/" + id}>Read More</Link></li>
            </ul>
          </div>
        </div>
      </section>
    )
  }
}

export default PostList;
