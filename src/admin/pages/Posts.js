import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import $ from 'jquery';
window.jQuery = $;
//import images from '../../../public/images/photo4.jpg';

const postPosts = gql`
query getPosts {
     viewer{
       allPosts{
       	  edges{
       	  	node{
       	  	 image,
	         title,
	         author,
	         category,
		     tag,
		     like,
		     date
	     }
       }
     }
   }
}`;

class Post extends React.Component {
    render() {
        if (this.props.data.viewer) {
            return (
            <tbody>
            	{this.props.data.viewer.allPosts.edges.map(function(item){
                	return <tr key={item.node.title}>
		                <td><input type="checkbox"></input></td>
				        <td><img src={item.node.image} height="50" alt="thumbnail" /></td>
		                <td><a href="#">{item.node.title}</a></td>
		                <td><a href="#">{item.node.author}</a></td>
		                <td><a href="#">{item.node.category}</a></td>
				        <td><a href="#">{item.node.tag}</a></td>
				        <td>{item.node.like}</td>
				        <td>{item.node.date}</td>
                	</tr>
            	})}
            </tbody>
            )
        }
        else {
            return <div></div>
        }
    }
}
const PostWithData = graphql(postPosts)(Post);

var Posts = React.createClass({
	componentDidMount: function(){
		require ('datatables');
		require ('datatables/media/css/jquery.dataTables.min.css');
		require ('./Posts.css');

		$('#postListTbl').DataTable();
	},

	render: function(){
		return (
			<div className="content-wrapper" style={{height: '100%'}}>
			  <div className="container-fluid">
				<section className="content-header">
			      <h1>
			        Post List
			      </h1>
			      <ol className="breadcrumb">
			        <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
			        <li className="active">Post List</li>
			      </ol>
			    </section>

	        	<section className="content">
	              <div className="row">
	                <div className="col-xs-12">
	                  <div className="box">
	                    <div className="box-header">
	                      <h3 className="box-title"></h3>
	                    </div>
	                    
	                    <div className="box-body">
	                      <table id="postListTbl" className="display">
	                        <thead>
	                          <tr>
	                            <th><input type="checkbox"></input></th>
	                            <th></th>
	                            <th>Title</th>
	                            <th>Author</th>
	                            <th>Categories</th>
	                            <th>Tags</th>
	                            <th>Likes</th>
	                            <th>Date</th>
	                          </tr>
	                        </thead>
	                        <PostWithData/>
	                      </table>
	                    </div>

	                  </div>
	                </div>
	              </div>
	            </section>
	           </div>
		    </div>
		)},
});

export default Posts;