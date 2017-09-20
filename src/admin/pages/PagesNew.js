import React from 'react';
import NewContentType from '../lib/ContentTypeNew';
import Query from '../query';

let NewPage = React.createClass({
  render: function() {
    return <NewContentType 
      name="Page"
      slug="pages" 
      postType="page"
      postId={this.props.postId} 
      tableName="Post"
      widgets={["pageHierarchy"]}
      viewRole="view-page"
      modifyRole="modify-page"
      handleNav={this.props.handleNav}
      handleUnsavedData={this.props.handleUnsavedData}
      urlParams={this.props.urlParams}
    />
  }
});

export default NewPage;
