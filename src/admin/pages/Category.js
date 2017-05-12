import React from 'react';
import CategoryContent from '../lib/CategoryContent';
//import AdminConfig from '../AdminConfig';
//import Query from '../query';

let CategoryPost = React.createClass({
  render: function() {
    return <CategoryContent 
        postType="post"
        slug="posts"
        handleNav={this.props.handleNav}
      />
  }
});

module.exports = CategoryPost;