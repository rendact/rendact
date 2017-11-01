import React from "react";

class Wrapper extends React.Component {
  render() {
    let { footerWidgets } = this.props;
    return (
      <div id="wrapper">
        {this.props.children}
        <section className="wrapper style1 fade-up" style={{ padding: 50 }}>
          <div className="row">
            {footerWidgets &&
              footerWidgets.map((fw, idx) => <div className="4u">{fw}</div>)}
          </div>
        </section>
      </div>
    );
  }
}

export default Wrapper;
