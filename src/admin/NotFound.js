import React from 'react';

var NotFound = React.createClass({
	componentDidMount: function(){
		require ('../css/AdminLTE.css');
		require ('../css/skins/_all-skins.css');
	},
	render: function(){
		return (
			<div className="content-wrapper-full" style={{minHeight: 1126}}>
		    <section className="content-header">
		      <h1>
		        404 Error Page
		      </h1>
		      <ol className="breadcrumb">
		        <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
		        <li className="active">404 error</li>
		      </ol>
		    </section>

		    <section className="content">
		      <div className="error-page">
		        <h2 className="headline text-yellow"> 404</h2>

		        <div className="error-content">
		          <h3><i className="fa fa-warning text-yellow"></i> Oops! Page not found.</h3>

		          <p>
		            We could not find the page you were looking for.
		            Meanwhile, you may <a href="../../index.html">return to dashboard</a> or try using the search form.
		          </p>

		          <form className="search-form">
		            <div className="input-group">
		              <input type="text" name="search" className="form-control" placeholder="Search"/>

		              <div className="input-group-btn">
		                <button type="submit" name="submit" className="btn btn-warning btn-flat"><i className="fa fa-search"></i>
		                </button>
		              </div>
		            </div>
		          </form>
		        </div>
		      </div>
		    </section>
		  </div>
		)
	}
});

export default NotFound;
