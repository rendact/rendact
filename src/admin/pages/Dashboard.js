import React from 'react';
import config from '../../config';
import $ from 'jquery';
const jQuery = $;
window.jQuery = $;


require ('jvectormap');



var Dashboard = React.createClass({
	componentDidMount: function(){
		window.Morris.Area({
		    element: 'sales-chart',
		    resize: true,
		    data: [
		      {y: '2011 Q1', item1: 2666, item2: 2666},
		      {y: '2011 Q2', item1: 2778, item2: 2294},
		      {y: '2011 Q3', item1: 4912, item2: 1969},
		      {y: '2011 Q4', item1: 3767, item2: 3597},
		      {y: '2012 Q1', item1: 6810, item2: 1914},
		      {y: '2012 Q2', item1: 5670, item2: 4293},
		      {y: '2012 Q3', item1: 4820, item2: 3795},
		      {y: '2012 Q4', item1: 15073, item2: 5967},
		      {y: '2013 Q1', item1: 10687, item2: 4460},
		      {y: '2013 Q2', item1: 8432, item2: 5713}
		    ],
		    xkey: 'y',
		    ykeys: ['item1', 'item2'],
		    labels: ['Item 1', 'Item 2'],
		    lineColors: ['#a0d0e0', '#3c8dbc'],
		    hideHover: 'auto' 
		  })
	},
	render: function(){
		return (
			<div className="content-wrapper" style={{height: '100%'}}>
				<section className="content-header">
			      <h1>
			        Dashboard
			      </h1>
			      <ol className="breadcrumb">
			        <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
			        <li className="active">Dashboard</li>
			      </ol>
			    </section>

			    <section className="content">
			    	<div className="row">
        				<div className="col-md-6">
					    	<div className="box box-primary">
					            <div className="box-header with-border">
					              <h3 className="box-title">Latest {config.contentTypeList[config.activeContentType].label}</h3>
					              <div className="box-tools pull-right">
					                <button type="button" className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-minus"></i>
					                </button>
					                <button type="button" className="btn btn-box-tool" data-widget="remove"><i className="fa fa-times"></i></button>
					              </div>
					            </div>
					            <div className="box-body">
					              <ul className="products-list product-list-in-box">
					                <li className="item">
					                  <div className="product-img">
					                    <img src="../../images/default-50x50.gif" alt="Product"/>
					                  </div>
					                  <div className="product-info">
					                    <a href="#" className="product-title">Eartquake in Myanmar takes 1000 lifes
					                      <span className="label label-info pull-right">1 day ago</span></a>
					                        <span className="product-description">
					                          Myanmar shaked by 7 richter scale eartquake on Sunday morning (1/1/2016)
					                        </span>
					                  </div>
					                </li>
					                <li className="item">
					                  <div className="product-img">
					                    <img src="../../images/default-50x50.gif" alt="Product"/>
					                  </div>
					                  <div className="product-info">
					                    <a href="#" className="product-title">Bicycle
					                      <span className="label label-info pull-right">2 days ago</span></a>
					                      <span className="product-description">
					                          26" Mongoose Dolomite Men's 7-speed, Navy Blue.
					                        </span>
					                  </div>
					                </li>
					                <li className="item">
					                  <div className="product-img">
					                    <img src="../../images/default-50x50.gif" alt="Product"/>
					                  </div>
					                  <div className="product-info">
					                    <a href="#" className="product-title">Xbox Launched New Console <span className="label label-info pull-right">3 days ago</span></a>
					                        <span className="product-description">
					                          Xbox One Console Bundle with Halo Master Chief Collection.
					                        </span>
					                  </div>
					                </li>
					                <li className="item">
					                  <div className="product-img">
					                    <img src="../../images/default-50x50.gif" alt="Product"/>
					                  </div>
					                  <div className="product-info">
					                    <a href="#" className="product-title">PlayStation 4
					                      <span className="label label-info pull-right">4 days ago</span></a>
					                        <span className="product-description">
					                          PlayStation 4 500GB Console (PS4)
					                        </span>
					                  </div>
					                </li>
					              </ul>
					            </div>
					            <div className="box-footer text-center">
					              <a href="#" className="uppercase">View All News</a>
					            </div>
					        </div>
					    </div>
					    <div className="col-md-6 connectedSortable">
						    <div className="nav-tabs-custom">
					            <ul className="nav nav-tabs pull-right">
						            <li className="active"><a href="#revenue-chart" data-toggle="tab">Area</a></li>
						            <li><a href="#sales-chart" data-toggle="tab">Donut</a></li>
						            <li className="pull-left header"><i className="fa fa-inbox"></i> Statistics</li>
						        </ul>
						        <div className="tab-content no-padding">
								

								</div>
					        </div>
					    </div>
			        </div>
			        <div className="row">
			        	<div className="col-md-6">
				        	<div className="box box-info">
					            <div className="box-header">
					              <h3 className="box-title">Quick {config.contentTypeList[config.activeContentType].label}</h3>
					              <div className="pull-right box-tools">
					                <button type="button" className="btn btn-info btn-sm" data-widget="remove" data-toggle="tooltip" title="Remove">
					                  <i className="fa fa-times"></i></button>
					              </div>
					            </div>
					            <div className="box-body">
					              <form action="#" method="post">
					                <div className="form-group">
					                  <input type="text" className="form-control" name="subject" placeholder="Title"/>
					                </div>
					                <div>
					                  <textarea className="textarea" placeholder="Content" style={{width: "100%", height: 125, fontSize: 14, lineHeight: 18, border: "1px solid #dddddd", padding: 10}}></textarea>
					                </div>
					              </form>
					            </div>
					            <div className="box-footer clearfix">
					              <button type="button" className="pull-right btn btn-default" id="sendEmail">Publish
					                <i className="fa fa-arrow-circle-right"></i></button>
					            </div>
					        </div>
					    </div>
					    <div className="col-md-6 connectedSortable">
						    <div className="box box-solid bg-light-blue-gradient">
					            <div className="box-header">
					              

					              <i className="fa fa-map-marker"></i>

					              <h3 className="box-title">
					                Visitors
					              </h3>
					            </div>
					            <div className="box-body">
					              <div id="world-map"></div>
					            </div>
					        </div>
					    </div>
			        </div>
			    </section>
		    </div>
		)
	}
});

export default Dashboard;