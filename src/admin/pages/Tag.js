import React from 'react';
import CategoryContent from '../lib/TagContent';
//import AdminConfig from '../AdminConfig';
//import Query from '../query';

let TagPost = React.createClass({
  render: function() {
    return <CategoryContent 
        postType="post"
        slug="posts"
        handleNav={this.props.handleNav}
      />
  }
});

module.exports = TagPost;