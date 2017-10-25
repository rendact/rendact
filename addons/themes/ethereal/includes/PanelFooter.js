import React from 'react';

class PanelFooter extends React.Component {
  render(){
    return (

                    <section className="panel color4-alt">
                      {this.props.footerWidgets.map((fw, i) => (
                        <div key={i} className="inner span-3 divided">{fw}</div>
                      ))}
                    </section>
    )
  }
}

export default PanelFooter;


