import React from 'react';
import images1 from '../../../public/images/photo4.jpg';
import images2 from '../../../public/images/photo1.png';
import images3 from '../../../public/images/photo2.png';

const Tabs = React.createClass({
  displayName: 'Tabs',
  propTypes: {
    selected: React.PropTypes.number,
    children: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.element
    ]).isRequired
  },
  getDefaultProps() {
    return {
      selected: 0
    };
  },
  getInitialState() {
    return {
      selected: this.props.selected
    };
  },
  handleClick(index, event) {
    event.preventDefault();
    this.setState({
      selected: index
    });
  },
  _renderTitles() {
    function labels(child, index) {
      let activeClass = (this.state.selected === index ? 'active' : '');
      return (
        <li key={index}>
          <a href="#" 
            className={activeClass}
            onClick={this.handleClick.bind(this, index)}>
            {child.props.label}
          </a>
        </li>
      );
    }
    return (
      <ul className="nav nav-tabs">
        {this.props.children.map(labels.bind(this))}
      </ul>
    );
  },
  _renderContent() {
    return (
      <div className="tabs__content" style={{marginTop: 20}}>
        {this.props.children[this.state.selected]}
      </div>
    );
  },
  render() {
    return (
      <div className="tabs">
        {this._renderTitles()}
        {this._renderContent()}
      </div>
    );
  }
});

const Pane = React.createClass({
  displayName: 'Pane',
  propTypes: {
    label: React.PropTypes.string.isRequired,
    children: React.PropTypes.element.isRequired
  },
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
});




var Themes = React.createClass({
	getInitialState : function() {
      return { hovering: false }
    },

    style: function() {
      if (this.state.hovering) {
        return { 
        	opacity: 1
    	}
      } 
    },

    onMouseOver : function (e) {
      e.preventDefault();
    let state = this.state;    // I grab the current state object
    state.hovering = true;
    this.setState(state);
    },

    onMouseOut : function (e) {
      e.preventDefault();
    let state = this.state;    // As above, I grab the current state object
    state.hovering = false;
    this.setState(state);
    },

	render: function(){
		let state = this.state;
		return (
			<div className="content-wrapper">
        <div className="container-fluid">
				<section className="content-header">
			    	<h1>
            			Theme List
          			</h1>

          			<ol className="breadcrumb">
            			<li><a href="#"><i className="fa fa-dashboard"></i>Home</a></li>
            			<li className="active">Themes</li>
          			</ol>
          			<input type="search" placeholder="Search themes..." style={{marginTop: 10}}/>
                <div style={{borderBottom:"#eee" , borderBottomStyle:"groove", borderWidth:2, marginTop: 10}}></div>
			    </section>

			    <section className="content">
        			<div className="row">
            			<div className="col-md-12 col-sm-6 col-xs-12">
              				<div>
        						<Tabs selected={0}>
          							<Pane label="All">
          								<div className="col-md-4">
          								<div className="show-image"
          								onMouseOver={this.onMouseOver} 
                   						onMouseOut={this.onMouseOut} >
              								<div className="thumbnail" 
                   							style={(state.hovering) ? {opacity: 0.5} : {}} >
            									<img src={images1} alt="" />
            									<div className="caption">
                    								<p>Water
                    								<div className="pull-right box-tools">
                    									<button href="#"  className="btn btn-primary" style={{marginRight:10}}>Activate</button>
                    									<button href="#" className="btn btn-default">Preview</button>
                    								</div>
                    								</p>
                  								</div>
          									</div>
          								</div>
          								</div>
          								<div className="col-md-4">
          								<div className="show-image">
              								<div className="thumbnail">
            									<img src={images1} alt="" />
            									<div className="caption">
                    								<p>Water
                    								<div className="pull-right box-tools">
                    									<button href="#"  className="btn btn-primary" style={{marginRight:10}}>Activate</button>
                    									<button href="#" className="btn btn-default">Preview</button>
                    								</div>
                    								</p>
                  								</div>
          									</div>
          								</div>
          								</div>
          								<div className="col-md-4">
              								<div className="thumbnail">
            									<img src={images1} alt="" />
            									<div className="caption">
                    								<p>Water
                    								<div className="pull-right box-tools">
                    									<button href="#" className="btn btn-primary" style={{marginRight:10}}>Activate</button>
                    									<button href="#" className="btn btn-default">Preview</button>
                    								</div>
                    								</p>
                  								</div>
          									</div>
          								</div>
          								<div className="col-md-4">
              								<div className="thumbnail">
            									<img src={images1} alt="" />
            									<div className="caption">
                    								<p>Water
                    								<div className="pull-right box-tools">
                    									<button href="#" className="btn btn-primary" style={{marginRight:10}}>Activate</button>
                    									<button href="#" className="btn btn-default">Preview</button>
                    								</div>
                    								</p>
                  								</div>
          									</div>
          								</div>
          								<div className="col-md-4">
              								<div className="thumbnail">
            									<img src={images1} alt="" />
            									<div className="caption">
                    								<p>Water
                    								<div className="pull-right box-tools">
                    									<button href="#" className="btn btn-primary" style={{marginRight:10}}>Activate</button>
                    									<button href="#" className="btn btn-default">Preview</button>
                    								</div>
                    									</p>
                  								</div>
          									</div>
          								</div>
          								<div className="col-md-4">
              								<div className="thumbnail">
            									<img src={images1} alt="" />
            									<div className="caption">
                    								<p>Water
                    								<div className="pull-right box-tools">
                    									<button href="#" className="btn btn-primary" style={{marginRight:10}}>Activate</button>
                    									<button href="#" className="btn btn-default">Preview</button>
                    								</div>
                    								</p>
                  								</div>
          									</div>
          								</div>
          							</Pane>
          							<Pane label="Free">
            							<div className="col-md-4">
              								<div className="thumbnail">
            									<img src={images2} alt="" />
            									<div className="caption">
                    								<p>Water
                    								<div className="pull-right box-tools">
                    									<button href="#" className="btn btn-primary" style={{marginRight:10}}>Activate</button>
                    									<button href="#" className="btn btn-default">Preview</button>
                    								</div>
                    								</p>
                  								</div>
          									</div>
          								</div>
          								<div className="col-md-4">
              								<div className="thumbnail">
            									<img src={images2} alt="" />
            									<div className="caption">
                    								<p>Water
                    								<div className="pull-right box-tools">
                    									<button href="#" className="btn btn-primary" style={{marginRight:10}}>Activate</button>
                    									<button href="#" className="btn btn-default">Preview</button>
                    								</div>
                    								</p>
                  								</div>
          									</div>
          								</div>
          								<div className="col-md-4">
              								<div className="thumbnail">
            									<img src={images2} alt="" />
            									<div className="caption">
                    								<p>Water
                    								<div className="pull-right box-tools">
                    									<button href="#" className="btn btn-primary" style={{marginRight:10}}>Activate</button>
                    									<button href="#" className="btn btn-default">Preview</button>
                    								</div>
                    								</p>
                  								</div>
          									</div>
          								</div>
          								<div className="col-md-4">
              								<div className="thumbnail">
            									<img src={images2} alt="" />
            									<div className="caption">
                    								<p>Water
                    								<div className="pull-right box-tools">
                    									<button href="#" className="btn btn-primary" style={{marginRight:10}}>Activate</button>
                    									<button href="#" className="btn btn-default">Preview</button>
                    								</div>
                    								</p>
                  								</div>
          									</div>
          								</div>
          								<div className="col-md-4">
              								<div className="thumbnail">
            									<img src={images2} alt="" />
            									<div className="caption">
                    								<p>Water
                    								<div className="pull-right box-tools">
                    									<button href="#" className="btn btn-primary" style={{marginRight:10}}>Activate</button>
                    									<button href="#" className="btn btn-default">Preview</button>
                    								</div>
                    								</p>
                  								</div>
          									</div>
          								</div>
          								<div className="col-md-4">
              								<div className="thumbnail">
            									<img src={images2} alt="" />
            									<div className="caption">
                    								<p>Water
                    								<div className="pull-right box-tools">
                    									<button href="#" className="btn btn-primary" style={{marginRight:10}}>Activate</button>
                    									<button href="#" className="btn btn-default">Preview</button>
                    								</div>
                    								</p>
                  								</div>
          									</div>
          								</div>
          							</Pane>
          							<Pane label="Premium">
            							<div className="col-md-4">
              								<div className="thumbnail">
            									<img src={images3} alt="" />
            									<div className="caption">
                    								<p>Water
                    								<div className="pull-right box-tools">
                    									<button href="#" className="btn btn-primary" style={{marginRight:10}}>Activate</button>
                    									<button href="#" className="btn btn-default">Preview</button>
                    								</div>
                    								</p>
                  								</div>
          									</div>
          								</div>
          								<div className="col-md-4">
              								<div className="thumbnail">
            									<img src={images3} alt="" />
            									<div className="caption">
                    								<p>Water
                    								<div className="pull-right box-tools">
                    									<button href="#" className="btn btn-primary" style={{marginRight:10}}>Activate</button>
                    									<button href="#" className="btn btn-default">Preview</button>
                    								</div>
                    								</p>
                  								</div>
          									</div>
          								</div>
          								<div className="col-md-4">
              								<div className="thumbnail">
            									<img src={images3} alt="" />
            									<div className="caption">
                    								<p>Water
                    								<div className="pull-right box-tools">
                    									<button href="#" className="btn btn-primary" style={{marginRight:10}}>Activate</button>
                    									<button href="#" className="btn btn-default">Preview</button>
                    								</div>
                    								</p>
                  								</div>
          									</div>
          								</div>
          								<div className="col-md-4">
              								<div className="thumbnail">
            									<img src={images3} alt="" />
            									<div className="caption">
                    								<p>Water
                    								<div className="pull-right box-tools">
                    									<button href="#" className="btn btn-primary" style={{marginRight:10}}>Activate</button>
                    									<button href="#" className="btn btn-default">Preview</button>
                    								</div>
                    								</p>
                  								</div>
          									</div>
          								</div>
          								<div className="col-md-4">
              								<div className="thumbnail">
            									<img src={images3} alt="" />
            									<div className="caption">
                    								<p>Water
                    								<div className="pull-right box-tools">
                    									<button href="#" className="btn btn-primary" style={{marginRight:10}}>Activate</button>
                    									<button href="#" className="btn btn-default">Preview</button>
                    								</div>
                    								</p>
                  								</div>
          									</div>
          								</div>
          								<div className="col-md-4">
              								<div className="thumbnail">
            									<img src={images3} alt="" />
            									<div className="caption">
                    								<p>Water
                    								<div className="pull-right box-tools">
                    									<button href="#" className="btn btn-primary" style={{marginRight:10}}>Activate</button>
                    									<button href="#" className="btn btn-default">Preview</button>
                    								</div>
                    								</p>
                  								</div>
          									</div>
          								</div>
          							</Pane>
        						</Tabs>
      						</div>
            			</div>
					</div>
        		</section>
          </div>
		    </div>
		)
	}
});

export default Themes;