import React from 'react';
import NewContentType from '../lib/ContentTypeNew';
//import AdminConfig from '../AdminConfig';
import Query from '../query';

let NewPost = React.createClass({
  render: function() {
    return <NewContentType 
      name="Post"
      slug="posts" 
      postType="post"
      postId={this.props.postId} 
      loadQuery={Query.getPostQry}
      createQuery={Query.getCreatePostQry}
      updateQuery={Query.getUpdatePostQry}
      tableName="Post"
      widgets={["category", "tag", "featuredImage"]}
      viewRole="view-post"
      modifyRole="modify-post"
      handleNav={this.props.handleNav}
    />
  }
});

module.exports = NewPost;