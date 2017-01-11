import React from 'react';
import '../lib/app.min.js';
import '../../../public/css/AdminLTE.css';
import '../../../public/css/skins/_all-skins.min.css';
import images from '../../../public/images/photo4.jpg';


var Posts = React.createClass({
	render: function(){
		return (
			<div className="content-wrapper" style={{height: '100%'}}>
				<section className="content-header">
			      <h1>
			        Post List
			        <small>Control panel</small>
			      </h1>
			      <ol className="breadcrumb">
			        <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
			        <li className="active">Post List</li>
			      </ol>
			    </section>

			    <section className="content-header">
			    	<div className="row">
			    	<div className="col-md-8">
			    		<a href="#">All</a> (657) | <a href="#">Mine</a> (259) | <a href="#">Published</a> (646) | <a href="#">Sticky</a> (2) | <a href="#">Drafts</a> (13) | <a href="#">Pending</a> (6) | <a href="#">Private</a> (6) | <a href="#">Trash</a> (5)
			    	</div>

			    	<div className="col-md-4">
			    		<form className="navbar-form navbar-right">
					        <div className="form-group">
					          <input type="text" className="form-control" placeholder="Search" />
					          <button type="submit" className="btn btn-default">Search Article</button>
					        </div>
					     </form>
			    	</div>
			    	</div>
			    </section>

			    <section className="content-header">
			    	<div className="col-md-2">
			    		<form className="form-horizontal">
					  		<div className="form-group">
							  	<select>
							  		<option>All Action</option>
							  		<option>First</option>
							  		<option>Second</option>
							  	</select>
								<button type="submit" className="btn btn-default">Apply</button>
							</div>
						</form>
			    	</div>
			    	<div className="col-md-10">
			    		<form className="form-horizontal">
					  		<div className="form-group">
							  	<select>
							  		<option>All Dates</option>
							  		<option>Wew</option>
							  		<option>Old</option>
							  	</select>
							  	<select>
							  		<option>All Category</option>
							  		<option>Social</option>
							  		<option>Politic</option>
							  	</select>
							  	<select>
							  		<option>Format Post</option>
							  		<option>Long</option>
							  		<option>Short</option>
							  	</select>
								<button type="submit" className="btn btn-default">Filter</button>
							</div>
						</form>
			    	</div>
			    </section>

			    <section className="content">
			    	<table className="table table-striped">
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
					  <tbody>
							<tr>
								<td><input type="checkbox"></input></td>
								<td><img src={images} height="50" /></td>
								<td>Dianjurkan Mumakai Penutup Kepala Ketika Sholat</td>
								<td>Yulian</td>
								<td>Fikih</td>
								<td>Sholat, Fikih</td>
								<td>32</td>
								<td>Published 12/01/2017</td>
							</tr>
							<tr>
								<td><input type="checkbox"></input></td>
								<td><img src={images} height="50" /></td>
								<td>Dianjurkan Mumakai Penutup Kepala Ketika Sholat</td>
								<td>Yulian</td>
								<td>Fikih</td>
								<td>Sholat, Fikih</td>
								<td>32</td>
								<td>Published 12/01/2017</td>
							</tr>
							<tr>
								<td><input type="checkbox"></input></td>
								<td><img src={images} height="50" /></td>
								<td>Dianjurkan Mumakai Penutup Kepala Ketika Sholat</td>
								<td>Yulian</td>
								<td>Fikih</td>
								<td>Sholat, Fikih</td>
								<td>32</td>
								<td>Published 12/01/2017</td>
							</tr>
					</tbody>
					</table>
			    </section>
		    </div>
		)
	}
});

export default Posts;