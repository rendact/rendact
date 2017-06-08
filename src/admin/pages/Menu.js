import React from 'react';
import images1 from '../../../public/images/photo4.jpg';
import images2 from '../../../public/images/photo1.png';
import images3 from '../../../public/images/photo2.png';

var Menu = React.createClass({
	render: function(){
		return (
			<div className="content-wrapper">
        	  <div className="container-fluid">
				<section className="content-header">
			    	<h1>
            			Menus
          			</h1>
          			<ol className="breadcrumb">
            			<li><a href="#"><i className="fa fa-dashboard"></i>Home</a></li>
            			<li className="active">Menus</li>
          			</ol>
          			<div style={{borderBottom:"#eee" , borderBottomStyle:"groove", borderWidth:2, marginTop: 10, marginBottom: 10}}></div>
			    </section>
		            <div className="box box-default">
		              <div className="box-header with-border attachment-block clearfix">
		                <div className="container-fluid">
		                  <div className="row">
		                    <div className="col-xs-12">
		                      <div className="row">
		                    	<div className="col-xs-2">
		                    		<h5><b>Select a menu to edit :</b></h5>
		                    	</div>
		                    	<div className="col-md-3">
								   <div className="form-group">
									<select className="form-control">
									  <option>option 1</option>
									  <option>option 2</option>
									</select>
								  </div>
								</div>
								<div className="col-md-2">
								  <h5> or <a href="#">create a new menu</a> </h5> 
								</div>
		                  	  </div>
		                    </div>
		                  </div>
			    		</div>
			    	  </div>
			    	</div>
			    	<div className="row">
				     	<div className="col-md-3">
							<div className="box box-default box-solid">
								<div className="box-header with-border">
									<h3 className="box-title">Pages</h3>
									<div className="box-tools pull-right">
									    <button type="button" className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-plus"></i>
									    </button>
									</div>
								</div>
								<div className="box-body">
									The body of the box
								</div>
							</div>
							<div className="box box-default collapsed-box box-solid">
								<div className="box-header with-border">
									<h3 className="box-title">Posts</h3>
									<div className="box-tools pull-right">
									    <button type="button" className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-plus"></i>
									    </button>
									</div>
								</div>
								<div className="box-body">
									The body of the box
								</div>
							</div>
							<div className="box box-default collapsed-box box-solid">
								<div className="box-header with-border">
									<h3 className="box-title">Custom Links</h3>
									<div className="box-tools pull-right">
									    <button type="button" className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-plus"></i>
									    </button>
									</div>
								</div>
								<div className="box-body">
									The body of the box
								</div>
							</div>
							<div className="box box-default collapsed-box box-solid">
								<div className="box-header with-border">
									<h3 className="box-title">Categories</h3>
									<div className="box-tools pull-right">
									    <button type="button" className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-plus"></i>
									    </button>
									</div>
								</div>
								<div className="box-body">
									The body of the box
								</div>
							</div>
						</div>
		                <div className="col-md-9">
					      <div className="box box-default">
							<div className="box-header with-border attachment-block clearfix">
								<div className="form-group">
									<div className="col-md-2">
										<h4>Menu Name :</h4>
									</div>
									<div className="col-md-4">
										<input type="text" name="name" className="form-control" />
									</div>
									<div className="col-md-6">
										<div className="box-tools pull-right">
										<button className="btn btn-flat btn-primary">Save Menu</button>
										</div>
									</div>
								</div>
							</div>
								<div class="box-body">
									<section className="content">
										<h4>Menu Structure</h4>
										<p>Drag each item into the order you prefer. Click the arrow on the right of the item to reveal additional configuration options.</p>
										<div className="row">
									        <div className="col-md-6">
									          <div className="box box-default collapsed-box box-solid">
									            <div className="box-header with-border">
									              <h3 className="box-title">Home</h3>

									              <div className="box-tools pull-right">
									                <button type="button" className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-plus"></i>
									                </button>
									              </div>
									            </div>
									            <div className="box-body">
									              The body of the box
									            </div>
									          </div>
									        </div>
									    </div>
									    <div style={{borderBottom:"#eee" , borderBottomStyle:"groove", borderWidth:2, marginTop: 5, marginBottom: 20}}></div>
										<h4>Menu Settings</h4>
										<div className="row">
											<div className="col-md-3">
												<i>Auto add pages</i>
											</div>
											<div className="col-md-9">
												<div className="checkbox">
								                    <label>
								                      <input type="checkbox"/>
								                      Checkbox 1
								                    </label>
								                </div>
											</div>
										</div>
										<div className="row">
											<div className="col-md-3">
												<i>Display location</i>
											</div>
											<div className="col-md-9">
												<div className="checkbox">
								                    <label>
								                      <input type="checkbox"/>
								                      Checkbox 2
								                    </label>
								                </div>
											</div>
										</div>
									</section>
								</div>
								<div className="box-header with-border attachment-block clearfix">
								<div className="form-group">
									<div className="col-md-6">
										<button className="btn btn-flat btn-danger">Delete Menu</button>
									</div>
									<div className="col-md-6">
										<div className="box-tools pull-right">
										<button className="btn btn-flat btn-primary">Save Menu</button>
										</div>
									</div>
								</div>
							</div>
							 </div>
		                </div>
		            </div>
          	  </div>
		    </div>
		)
	}
});

export default Menu;