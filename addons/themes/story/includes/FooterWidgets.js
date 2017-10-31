import React from 'react';

class FooterWidgets extends React.Component {
  render(){
    let {
      footerWidgets
    } = this.props;
    return(
      <section className="wrapper style1">
        <div className="inner">
          <div className="row">
            {footerWidgets.map((fw, i) => (
              <div className="4u 12u$(medium)" key={i}>{fw}</div>
            ))}
          </div>
        </div>
      </section>
    )
  }
}

export default FooterWidgets;