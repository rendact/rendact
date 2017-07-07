import React from 'react';
import CategoryContent from '../lib/TagContent';

let TagPost = React.createClass({
  render: function() {
    return <CategoryContent 
        postType="post"
        slug="posts"
        handleNav={this.props.handleNav}
      />
  }
});

export default TagPost;