import React from 'react'

const Sidebar = React.createClass({
  getInitialState: function() {
    return {
      widgets: '' 
    }
  },
  async componentDidMount(){
    this.props.getWidgets('Sidebar').then(widgets => {
       this.setState({widgets: widgets})
    })
  },
	render: function() {
		return ( this.state.widgets ?
			<div className="col-md-4 new-section">	
				<div className="sidebar-grid wow fadeInUpBig animated" data-wow-delay="0.4s">
          {this.state.widgets}
				</div>
			</div>
      :
      null
		)
	}
});

export default Sidebar
