import React from 'react';
import ContentType from '../lib/ContentType';
import AdminConfig from '../AdminConfig';
import Query from '../query';
import _ from 'lodash';
import Config from '../../config';

let Users = React.createClass({
  render: function() {
    return <ContentType 
			name="User" 
			slug="users"
			tableName="User"
			fields={AdminConfig.UserFields}
			listQuery={Query.getUserListByTypeQry}
			viewRole="view-user"
			modifyRole="modify-user"
			statusList={_.concat(["All"],Config.roleList)}
			handleNav={this.props.handleNav}
			/>
  }
});

module.exports = Users;