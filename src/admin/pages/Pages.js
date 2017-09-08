import React from 'react';
import ContentType from '../lib/ContentType';
import AdminConfig from '../AdminConfig';
import Query from '../query';

let Pages = React.createClass({
  render: function() {
    return <ContentType 
			name="Page" 
			slug="pages"
			tableName="Post"
			fields={AdminConfig.PageFields}
			listQuery={Query.getPageListQry}
			viewRole="view-page"
			modifyRole="modify-page"
			statusList={["All", "Published", "Draft", "Reviewing", "Trash"]}
			handleNav={this.props.handleNav}
			postType="page"
			/>
  }
});

export default Pages;