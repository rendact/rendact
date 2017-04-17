import React from 'react';
import ContentType from '../lib/ContentType';
import AdminConfig from '../AdminConfig';
import Query from '../query';

let Posts = React.createClass({
  render: function() {
    return <ContentType 
			name="Post" 
			slug="posts"
			tableName="Post"
			fields={AdminConfig.PostFields}
			listQuery={Query.getPostListQry}
			viewRole="view-post"
			modifyRole="modify-post"
			statusList={["All", "Published", "Draft", "Pending Review", "Deleted"]}
			handleNav={this.props.handleNav}
			/>
  }
});

module.exports = Posts;