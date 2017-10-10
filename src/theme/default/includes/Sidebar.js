import React from 'react'

const Sidebar = React.createClass({
  getInitialState: function() {
    return {
      widgets: []
    }
  },
  componentWillMount: function(){
    this.props.getWidgets('Sidebar').then(widgets => {
      this.setState({widgets: widgets})
    })
  },
	render: function() {
		return (
			<div className="col-md-4 new-section">	
				<div className="sidebar-grid wow fadeInUpBig animated" data-wow-delay="0.4s">
          {this.state.widgets}
				</div>
			</div>
		)
	}
});

export default Sidebar
