import React from 'react';

class Widgets extends React.Component {
	render(){
		return (
			<div className="content-wrapper" style={{height: '100%'}}>
			<div className="container-fluid">
				<section className="content-header">
			      <h1>
			        Widget Management Page
			      </h1>
			      <ol className="breadcrumb">
			        <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
			        <li className="active">Widget</li>
			      </ol>
			      <div style={{borderBottom:"#eee" , borderBottomStyle:"groove", borderWidth:2, marginTop: 10}}></div>
			    </section>

			    <section className="content">
			    </section>
			</div>
		    </div>
		)
	}
}

export default Widgets;
