import React from 'react';

class Footer extends React.Component {
  render(){
    return(<div>

        <footer id="footer">
          {this.props.footerWidgets.map((fw,idx) => (
            <section key={idx}>{fw}</section>
          ))}
        </footer>

        <div id="copyright">
          <ul>
            <li>Massively theme</li>
            <li>converted by Rendact Team</li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Footer;
