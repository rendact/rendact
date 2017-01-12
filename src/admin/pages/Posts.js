import React from 'react';
import images from '../../../public/images/photo4.jpg';

require ('datatables');

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




			    <section className="content">
			      <div className="row">
			        <div className="col-xs-12">
			          <div className="box">
			            <div className="box-header">
			            	<div className="col-sm-8">
			            		<div className="dataTables_info">
			            			<a href="#">All</a> (657) | <a href="#">Mine</a> (259) | <a href="#">Published</a> (646) | <a href="#">Sticky</a> (2) | <a href="#">Drafts</a> (13) | <a href="#">Pending</a> (6) | <a href="#">Private</a> (6) | <a href="#">Trash</a> (5)
			            		</div>
							</div>
							<div className="col-sm-4">
								<div className="dataTables_filter">
									<div className="form-group">
									Search:  
									<input type="text" className="form-control input-sm" placeholder="Search" />
									</div>
								</div>
							</div>
			            </div>

			            <div className="box-header">
			            	<div className="col-sm-8">
			            		<div className="dataTables_length">
			            		<label>
			            			<select className="form-control input-sm" >
								  		<option>All Action</option>
								  		<option>First</option>
								  		<option>Second</option>
								  	</select>
			            		</label>
			            		<label>
			            			<select className="form-control input-sm margin-left">
								  		<option>All Dates</option>
								  		<option>Wew</option>
								  		<option>Old</option>
								  	</select>
			            		</label>
			            		<label>
			            			<select className="form-control input-sm margin-left">
								  		<option>All Category</option>
								  		<option>Social</option>
								  		<option>Politic</option>
								  	</select>
			            		</label>
			            		<label>
			            			<select className="form-control input-sm margin-left">
								  		<option>Format Post</option>
								  		<option>Long</option>
								  		<option>Short</option>
								  	</select>
			            		</label>
			            		</div>
			            	</div>
			            </div>
			            
			            <div className="box-body">
			              <table id="example2" className="table table-bordered table-striped">
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
									<td><img src={images} height="50" alt="thumbnail"/></td>
									<td>Dianjurkan Mumakai Penutup Kepala Ketika Sholat</td>
									<td>Yulian</td>
									<td>Fikih</td>
									<td>Sholat, Fikih</td>
									<td>32</td>
									<td>Published 12/01/2017</td>
								</tr>
								<tr>
									<td><input type="checkbox"></input></td>
									<td><img src={images} height="50" alt="thumbnail"/></td>
									<td>Hidup tenang dengan meninggalkan dunia</td>
									<td>Ardi Nugraha</td>
									<td>Fikih</td>
									<td>Sholat, Fikih</td>
									<td>32</td>
									<td>Published 12/01/2017</td>
								</tr>
								<tr>
									<td><input type="checkbox"></input></td>
									<td><img src={images} height="50" alt="thumbnail"/></td>
									<td>Keutamaan Sholat Malam</td>
									<td>Jarot Syaifullah</td>
									<td>Fikih</td>
									<td>Sholat, Fikih</td>
									<td>32</td>
									<td>Published 12/01/2017</td>
								</tr>
								</tbody>
			              </table>
			            </div>
			         
			        	

			            <div className="box-header">
			            	<div className="col-sm-6">
			            		<div className="dataTables_info">
			            			Showing 1 to 10 of 46 entries
			            		</div>
							</div>
							<div className="col-sm-6">
								<div className="dataTables_paginate paging_simple_numbers">
									<nav aria-label="Page navigation">
									  <ul className="pagination">
									    <li>
									      <a href="#" aria-label="Previous">
									        <span aria-hidden="true">&laquo;</span>
									      </a>
									    </li>
									    <li><a href="#">1</a></li>
									    <li><a href="#">2</a></li>
									    <li><a href="#">3</a></li>
									    <li><a href="#">4</a></li>
									    <li><a href="#">5</a></li>
									    <li>
									      <a href="#" aria-label="Next">
									        <span aria-hidden="true">&raquo;</span>
									      </a>
									    </li>
									  </ul>
									</nav>
								</div>
							</div>
			            </div>
			            </div>
			            </div>
			            </div>
			            </section>

		    </div>
		)
	}
});

export default Posts;