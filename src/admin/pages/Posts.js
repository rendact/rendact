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
		                            <td><img src={images} height="50" /></td>
		                            <td>Hidup tenang dengan meninggalkan dunia</td>
		                            <td>Ardi Nugraha</td>
		                            <td>Fikih</td>
		                            <td>Sholat, Fikih</td>
		                            <td>32</td>
		                            <td>Published 12/01/2017</td>
		                        </tr>
		                        <tr>
		                            <td><input type="checkbox"></input></td>
		                            <td><img src={images} height="50" /></td>
		                            <td>Sunyi Sepi</td>
		                            <td>Bayu Nugraha</td>
		                            <td>Hidup</td>
		                            <td>Hidup</td>
		                            <td>23</td>
		                            <td>Published 01/01/2017</td>
		                        </tr>
		                          <tr>
	                              <td><input type="checkbox"></input></td>
	                              <td><img src={images} height="50" /></td>
	                              <td>Meninggalkan dunia</td>
	                              <td>Sultan Nugraha</td>
	                              <td>Ahlak</td>
	                              <td>Hidup</td>
	                              <td>37</td>
	                              <td>Published 12/12/2016</td>
	                            </tr>
	                            <tr>
	                              <td><input type="checkbox"></input></td>
	                              <td><img src={images} height="50" /></td>
	                              <td>Karam Merdeka Sepi</td>
	                              <td>Wulan Nugraha</td>
	                              <td>Kehidupan</td>
	                              <td>Hidup</td>
	                              <td>83</td>
	                              <td>Published 22/12/2016</td>
	                            </tr>
	                            <tr>
	                              <td><input type="checkbox"></input></td>
	                              <td><img src={images} height="50" /></td>
	                              <td>Hidup tenang dengan meninggalkan dunia</td>
	                              <td>damar Nugraha</td>
	                              <td>Fikih</td>
	                              <td>Sholat, Fikih</td>
	                              <td>32</td>
	                              <td>Published 21/01/2017</td>
	                            </tr>
	                            <tr>
	                              <td><input type="checkbox"></input></td>
	                              <td><img src={images} height="50" /></td>
	                              <td>Sunyi Sepi</td>
	                              <td>kunir Nugraha</td>
	                              <td>Hidup</td>
	                              <td>Hidup</td>
	                              <td>23</td>
	                              <td>Published 14/01/2017</td>
	                            </tr>
	                            	<tr>
	                                <td><input type="checkbox"></input></td>
	                                <td><img src={images} height="50" /></td>
	                                <td>Meninggalkan dunia</td>
	                                <td>Sultan Nugraha</td>
	                                <td>Ahlak</td>
	                                <td>Hidup</td>
	                                <td>37</td>
	                                <td>Published 30/12/2016</td>
	                            </tr>
	                            <tr>
	                                <td><input type="checkbox"></input></td>
	                                <td><img src={images} height="50" /></td>
	                                <td>Karam Merdeka Sepi</td>
	                                <td>Yudi Nugraha</td>
	                                <td>Kehidupan</td>
	                                <td>Hidup</td>
	                                <td>83</td>
	                                <td>Published 25/12/2016</td>
	                            </tr>
		                        <tr>
		                            <td><input type="checkbox"></input></td>
		                            <td><img src={images} height="50" /></td>
		                            <td>Hidup tenang dengan meninggalkan dunia</td>
		                            <td>Ardi Nugraha</td>
		                            <td>Fikih</td>
		                            <td>Sholat, Fikih</td>
		                            <td>32</td>
		                            <td>Published 12/01/2017</td>
		                        </tr>
		                        <tr>
		                            <td><input type="checkbox"></input></td>
		                            <td><img src={images} height="50" /></td>
		                            <td>Sunyi Sepi</td>
		                            <td>Bayu Nugraha</td>
		                            <td>Hidup</td>
		                            <td>Hidup</td>
		                            <td>23</td>
		                            <td>Published 01/01/2017</td>
		                        </tr>
		                        <tr>
	                              <td><input type="checkbox"></input></td>
	                              <td><img src={images} height="50" /></td>
	                              <td>Keroncong Indonesia</td>
	                              <td>Waljinah</td>
	                              <td>Ahlak</td>
	                              <td>Hidup</td>
	                              <td>37</td>
	                              <td>Published 12/12/2016</td>
	                            </tr>
	                            <tr>
	                              <td><input type="checkbox"></input></td>
	                              <td><img src={images} height="50" /></td>
	                              <td>Singgung Neraca</td>
	                              <td>Katimin</td>
	                              <td>Kehidupan</td>
	                              <td>Hidup</td>
	                              <td>83</td>
	                              <td>Published 22/12/2016</td>
	                            </tr>
	                            <tr>
	                              <td><input type="checkbox"></input></td>
	                              <td><img src={images} height="50" /></td>
	                              <td>Menata Hari</td>
	                              <td>Lukman</td>
	                              <td>Fikih</td>
	                              <td>Sholat, Fikih</td>
	                              <td>32</td>
	                              <td>Published 21/01/2017</td>
	                            </tr>
	                            <tr>
	                              <td><input type="checkbox"></input></td>
	                              <td><img src={images} height="50" /></td>
	                              <td>Besok Mau Makan Apa</td>
	                              <td>Wulan</td>
	                              <td>Hidup</td>
	                              <td>Hidup</td>
	                              <td>23</td>
	                              <td>Published 14/01/2017</td>
	                            </tr>
	                            <tr>
	                                <td><input type="checkbox"></input></td>
	                                <td><img src={images} height="50" /></td>
	                                <td>Elok di tepi Pantai</td>
	                                <td>Sumarni</td>
	                                <td>Ahlak</td>
	                                <td>Hidup</td>
	                                <td>37</td>
	                                <td>Published 30/12/2016</td>
	                            </tr>
	                            <tr>
	                                <td><input type="checkbox"></input></td>
	                                <td><img src={images} height="50" /></td>
	                                <td>Hanya Gambaran</td>
	                                <td>Ida</td>
	                                <td>Kehidupan</td>
	                                <td>Hidup</td>
	                                <td>83</td>
	                                <td>Published 25/12/2016</td>
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