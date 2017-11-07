import React from 'react';

class Menu extends React.Component {
  handleCloseMenu(){
    document.body.className = "";
  }
  render(){
    return(
      <nav id="menu" onClick={this.handleCloseMenu}>

              <section>
                <form className="search" method="get" action="#">
                  <input type="text" name="query" placeholder="Search" />
                </form>
              </section>

       
              <section>
                <ul className="links">
                  <li>
                    <a href="#">
                      <h3>Lorem ipsum</h3>
                      <p>Feugiat tempus veroeros dolor</p>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <h3>Dolor sit amet</h3>
                      <p>Sed vitae justo condimentum</p>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <h3>Feugiat veroeros</h3>
                      <p>Phasellus sed ultricies mi congue</p>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <h3>Etiam sed consequat</h3>
                      <p>Porta lectus amet ultricies</p>
                    </a>
                  </li>
                </ul>
              </section>

           
              <section>
                <ul className="actions vertical">
                  <li><a href="#" className="button big fit">Log In</a></li>
                </ul>
              </section>

      </nav>
    )
  }
}

export default Menu;