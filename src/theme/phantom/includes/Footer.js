import React from 'react';

class Footer extends React.Component {
  render(){
    return (
      <footer id="footer">
        <div className="inner">
          {this.props.footerWidgets.map((widget,idx) => (
            <section key={idx}>
              {widget}
            </section>
          ))}
          <ul className="copyright">
            <li>&copy; Untitled. All rights reserved</li>
            <li>Design: <a href="http:///html5up.net">HTML5 UP</a></li>
            <li>Converted to jsx by: <a href="https://rendact.com">Rendact Team</a></li>
          </ul>
        </div>
      </footer>
    )
  }
}

export default Footer
