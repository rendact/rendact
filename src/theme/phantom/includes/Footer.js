import React from 'react';

class Footer extends React.Component {
  render(){
    return (
      <footer id="footer">
        <div className="inner">
          <section>
            <h2>Get in touch</h2>
            <form method="post" action="#">
              <div className="field half first">
                <input type="text" name="name" id="name" placeholder="Name"/>
              </div>
              <div className="field half">
                <input type="email" name="email" id="email" placeholder="Email"/>
              </div>
              <div className="field">
                <textarea name="message" id="message" placeholder="Message"></textarea>
              </div>

              <ul className="actions">
                <li>
                  <input type="submit" value="Send" className="special"/></li>
              </ul>
            </form>
          </section>

          <section>
          </section>
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
