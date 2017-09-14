import React from 'react';
import Notification from 'react-notification-system';
import {getValue, setValue} from '../../utils';
import Query from '../../admin/query';
import gql from 'graphql-tag'
import {graphql} from 'react-apollo';

let CommentForm = React.createClass({
	componentDidMount() {
  	this.notification = this.refs.notificationSystem;
	},

	handleSubmitBtn(event){
		event.preventDefault();
		var me = this;
		var author = getValue("author");
		var email = getValue("email");
		var comment = getValue("comment");
		
	  this.props.addComment({
	  	variables: {
        input: {
          name: author,
          email: email,
          content: comment,
          postId: this.props.postId
        }
      }}).then(({data}) => {
	    	me.notification.addNotification({
						message: 'Comment has been sent',
						level: 'success',
						position: 'tr',
						autoDismiss: 5
					});
				author=setValue("author","");
				email=setValue("email","");
				comment=setValue("comment","");
    });
	} ,

	render() {
		return (
			<form onSubmit={this.handleSubmitBtn} id="commentform">
				<Notification ref="notificationSystem" />
				 <p className="comment-form-author-name"><label htmlFor="author">Name</label>
					<input id="author" className="form-control" name="author" type="text" size="30" />
				 </p>
				 <p className="comment-form-email">
					<label htmlFor="email">Email</label>
					<input id="email" className="form-control" name="email" type="text" size="30" />
				 </p>
				 <p className="comment-form-comment">
					<label htmlFor="comment">Comment</label>
					<textarea id="comment" className="form-control"></textarea>
				 </p>
				 <div className="clearfix"></div>
				<input type="submit" value="send" className="btn btn-primary btn-sm" />
			</form>
		)
	}
})

CommentForm = graphql(Query.createComment, {name: 'addComment'})(CommentForm);

export default CommentForm;