import React from 'react';
import $ from 'jquery';
window.jQuery = $;

import './Users.css';
import images from '../../../public/images/avatar-default.png';
require ('datatables');

var Users = React.createClass({

	componentDidMount: function(){
        $(document).ready(function(){
		    $('#myTable').DataTable();
		})},

	render: function(){
		return (
			<div className="content-wrapper" style={{height: '100%'}}>
				<section className="content-header">
			      <h1>
			        Users List
			      </h1>
			      <ol className="breadcrumb">
			        <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
			        <li className="active">Users List</li>
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
	                      <table id="myTable" className="display">
	                        <thead>
	                          <tr>
	                            <th><input type="checkbox"></input></th>
	                            <th></th>
	                            <th>User Name</th>
	                            <th>Name</th>
	                            <th>Email</th>
	                            <th>Role</th>
	                            <th>Posts</th>
	                          </tr>
	                        </thead>
	                        <tbody>
		                        <tr>
		                            <td><input type="checkbox"></input></td>
		                            <td><img src={images} height="32" alt="thumbnail" /></td>
		                            <td><a href="#">Satu</a></td>
		                            <td><a href="#">Ardi Nugraha</a> </td>
		                            <td><a href="#">satu@gmail.com</a></td>
		                            <td><a href="#">satu</a></td>
		                            <td>32</td>
		                        </tr>
		                         <tr>
		                            <td><input type="checkbox"></input></td>
		                            <td><img src={images} height="32" alt="thumbnail" /></td>
		                            <td><a href="#">Dua</a></td>
		                            <td><a href="#">Dua</a> </td>
		                            <td><a href="#">Dua@gmail.com</a></td>
		                            <td><a href="#">Dua</a></td>
		                            <td>32</td>
		                        </tr>
		                        <tr>
		                            <td><input type="checkbox"></input></td>
		                            <td><img src={images} height="32" alt="thumbnail" /></td>
		                            <td><a href="#">Tiga</a></td>
		                            <td><a href="#">Tiga</a> </td>
		                            <td><a href="#">Tiga@gmail.com</a></td>
		                            <td><a href="#">Tiga</a></td>
		                            <td>32</td>
		                        </tr>
	                            <tr>
		                            <td><input type="checkbox"></input></td>
		                            <td><img src={images} height="32" alt="thumbnail" /></td>
		                            <td><a href="#">Empat</a></td>
		                            <td><a href="#">Empat</a> </td>
		                            <td><a href="#">Empat@gmail.com</a></td>
		                            <td><a href="#">Empat</a></td>
		                            <td>32</td>
		                        </tr>
		                        <tr>
		                            <td><input type="checkbox"></input></td>
		                            <td><img src={images} height="32" alt="thumbnail" /></td>
		                            <td><a href="#">Lima</a></td>
		                            <td><a href="#">Lima</a> </td>
		                            <td><a href="#">Lima@gmail.com</a></td>
		                            <td><a href="#">Lima</a></td>
		                            <td>32</td>
		                        </tr>
	                            <tr>
		                            <td><input type="checkbox"></input></td>
		                            <td><img src={images} height="32" alt="thumbnail" /></td>
		                            <td><a href="#">Enam</a></td>
		                            <td><a href="#">Enam</a> </td>
		                            <td><a href="#">Enam@gmail.com</a></td>
		                            <td><a href="#">Enam</a></td>
		                            <td>32</td>
		                        </tr>
		                        <tr>
		                            <td><input type="checkbox"></input></td>
		                            <td><img src={images} height="32" alt="thumbnail" /></td>
		                            <td><a href="#">Tujuh</a></td>
		                            <td><a href="#">Tujuh</a> </td>
		                            <td><a href="#">Tujuh@gmail.com</a></td>
		                            <td><a href="#">Tujuh</a></td>
		                            <td>32</td>
		                        </tr>
	                            <tr>
		                            <td><input type="checkbox"></input></td>
		                            <td><img src={images} height="32" alt="thumbnail" /></td>
		                            <td><a href="#">Delapan</a></td>
		                            <td><a href="#">Delapan</a> </td>
		                            <td><a href="#">Delapan@gmail.com</a></td>
		                            <td><a href="#">Delapan</a></td>
		                            <td>32</td>
		                        </tr>
		                        <tr>
		                            <td><input type="checkbox"></input></td>
		                            <td><img src={images} height="32" alt="thumbnail" /></td>
		                            <td><a href="#">Sepuluh</a></td>
		                            <td><a href="#">Sepuluh</a> </td>
		                            <td><a href="#">Sepuluh@gmail.com</a></td>
		                            <td><a href="#">Sepuluh</a></td>
		                            <td>32</td>
		                        </tr>
		                        <tr>
		                            <td><input type="checkbox"></input></td>
		                            <td><img src={images} height="32" alt="thumbnail" /></td>
		                            <td><a href="#">Sebelas</a></td>
		                            <td><a href="#">Sebelas</a> </td>
		                            <td><a href="#">Sebelas@gmail.com</a></td>
		                            <td><a href="#">Sebelas</a></td>
		                            <td>32</td>
		                        </tr>
		                        <tr>
		                            <td><input type="checkbox"></input></td>
		                            <td><img src={images} height="32" alt="thumbnail" /></td>
		                            <td><a href="#">Duabelas</a></td>
		                            <td><a href="#">Duabelas</a> </td>
		                            <td><a href="#">Duabelas@gmail.com</a></td>
		                            <td><a href="#">Duabelas</a></td>
		                            <td>32</td>
		                        </tr>
	                        </tbody>
	                        <tfoot>
	                          <tr>
	                            <th><input type="checkbox"></input></th>
	                            <th></th>
	                            <th>User Name</th>
	                            <th>Name</th>
	                            <th>Email</th>
	                            <th>Role</th>
	                            <th>Posts</th>
	                          </tr>
	                        </tfoot>
	                      </table>
	                    </div>
	                  </div>
	                </div>
	              </div>
	            </section>
		    </div>
		)
	}
});

export default Users;