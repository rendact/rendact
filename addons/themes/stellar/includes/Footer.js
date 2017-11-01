import React from "react";

class Footer extends React.Component {
  render() {
    let { footerWidgets } = this.props;
    return (
      <footer id="footer">
        {footerWidgets &&
          footerWidgets.map((fw, i) => <section key={i}>{fw}</section>)}
        <p className="copyright">Rendact Team</p>
      </footer>
    );
  }
}

export default Footer;
