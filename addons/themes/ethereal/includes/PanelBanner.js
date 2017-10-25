import React from 'react';

class PanelBanner extends React.Component {
  render(){
    return(
          <section className="panel banner right">
            <div className="content color0 span-3-75">
              <h1 className="major">{this.props.title}</h1>
              <p dangerouslySetInnerHTML={{__html: this.props.content}}/>
              <ul className="actions">
                <li><a className="button special color1 circle icon fa-angle-right" href="#first">Next</a></li>
              </ul>
            </div>
            <div className="image filtered span-1-75">
              <img src={this.props.image} alt=""/>
            </div>
          </section>
    )
  }
}

export default PanelBanner;
