import React from 'react';
import $ from 'jquery';
window.jQuery = $;

import './Posts.css';
import images from '../../../public/images/photo4.jpg';

require ('datatables');

var Posts = React.createClass({

	componentDidMount: function(){
        $(document).ready(function(){
		    $('#postListTbl').DataTable();
		})},

	render: function(){
		return (
			<div className="content-wrapper" style={{height: '100%'}}>
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
	                        <tbody>
		                        <tr>
		                            <td><input type="checkbox"></input></td>
		                            <td><img src={images} height="50" alt="thumbnail" /></td>
		                            <td><a href="#">Satu</a></td>
		                            <td><a href="#">Ardi Nugraha</a> </td>
		                            <td><a href="#">satu</a></td>
		                            <td><a href="#">satu</a></td>
		                            <td>32</td>
		                            <td>Published 12/01/2017</td>
		                        </tr>
		                         <tr>
		                            <td><input type="checkbox"></input></td>
		                            <td><img src={images} height="50" alt="thumbnail" /></td>
		                            <td><a href="#">Dua</a></td>
		                            <td><a href="#">Dua</a> </td>
		                            <td><a href="#">Dua</a></td>
		                            <td><a href="#">Dua</a></td>
		                            <td>32</td>
		                            <td>Published 12/01/2017</td>
		                        </tr>
		                        <tr>
		                            <td><input type="checkbox"></input></td>
		                            <td><img src={images} height="50" alt="thumbnail" /></td>
		                            <td><a href="#">Tiga</a></td>
		                            <td><a href="#">Tiga</a> </td>
		                            <td><a href="#">Tiga</a></td>
		                            <td><a href="#">Tiga</a></td>
		                            <td>32</td>
		                            <td>Published 12/01/2017</td>
		                        </tr>
	                            <tr>
		                            <td><input type="checkbox"></input></td>
		                            <td><img src={images} height="50" alt="thumbnail" /></td>
		                            <td><a href="#">Empat</a></td>
		                            <td><a href="#">Empat</a> </td>
		                            <td><a href="#">Empat</a></td>
		                            <td><a href="#">Empat</a></td>
		                            <td>32</td>
		                            <td>Published 12/01/2017</td>
		                        </tr>
		                        <tr>
		                            <td><input type="checkbox"></input></td>
		                            <td><img src={images} height="50" alt="thumbnail" /></td>
		                            <td><a href="#">Lima</a></td>
		                            <td><a href="#">Lima</a> </td>
		                            <td><a href="#">Lima</a></td>
		                            <td><a href="#">Lima</a></td>
		                            <td>32</td>
		                            <td>Published 12/01/2017</td>
		                        </tr>
	                            <tr>
		                            <td><input type="checkbox"></input></td>
		                            <td><img src={images} height="50" alt="thumbnail" /></td>
		                            <td><a href="#">Enam</a></td>
		                            <td><a href="#">Enam</a> </td>
		                            <td><a href="#">Enam</a></td>
		                            <td><a href="#">Enam</a></td>
		                            <td>32</td>
		                            <td>Published 12/01/2017</td>
		                        </tr>
		                        <tr>
		                            <td><input type="checkbox"></input></td>
		                            <td><img src={images} height="50" alt="thumbnail" /></td>
		                            <td><a href="#">Tujuh</a></td>
		                            <td><a href="#">Tujuh</a> </td>
		                            <td><a href="#">Tujuh</a></td>
		                            <td><a href="#">Tujuh</a></td>
		                            <td>32</td>
		                            <td>Published 12/01/2017</td>
		                        </tr>
	                            <tr>
		                            <td><input type="checkbox"></input></td>
		                            <td><img src={images} height="50" alt="thumbnail" /></td>
		                            <td><a href="#">Delapan</a></td>
		                            <td><a href="#">Delapan</a> </td>
		                            <td><a href="#">Delapan</a></td>
		                            <td><a href="#">Delapan</a></td>
		                            <td>32</td>
		                            <td>Published 12/01/2017</td>
		                        </tr>
		                        <tr>
		                            <td><input type="checkbox"></input></td>
		                            <td><img src={images} height="50" alt="thumbnail" /></td>
		                            <td><a href="#">Sepuluh</a></td>
		                            <td><a href="#">Sepuluh</a> </td>
		                            <td><a href="#">Sepuluh</a></td>
		                            <td><a href="#">Sepuluh</a></td>
		                            <td>32</td>
		                            <td>Published 12/01/2017</td>
		                        </tr>
		                        <tr>
		                            <td><input type="checkbox"></input></td>
		                            <td><img src={images} height="50" alt="thumbnail" /></td>
		                            <td><a href="#">Sebelas</a></td>
		                            <td><a href="#">Sebelas</a> </td>
		                            <td><a href="#">Sebelas</a></td>
		                            <td><a href="#">Sebelas</a></td>
		                            <td>32</td>
		                            <td>Published 12/01/2017</td>
		                        </tr>
		                        <tr>
		                            <td><input type="checkbox"></input></td>
		                            <td><img src={images} height="50" alt="thumbnail" /></td>
		                            <td><a href="#">Duabelas</a></td>
		                            <td><a href="#">Duabelas</a> </td>
		                            <td><a href="#">Duabelas</a></td>
		                            <td><a href="#">Duabelas</a></td>
		                            <td>32</td>
		                            <td>Published 12/01/2017</td>
		                        </tr>
	                        </tbody>
	                      </table>
	                    </div>
	                  </div>
	                </div>
	              </div>
	            </section>

		    </div>
		)},
});



export default Posts;