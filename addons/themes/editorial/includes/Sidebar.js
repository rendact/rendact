import React from 'react';

export default class Sidebar extends React.Component {
  constructor(props){
    super(props)

    this.handleToggleSidebar = this.handleToggleSidebar.bind(this)

    this.state = {
      w: null,
      active: true
    }
  }

  handleToggleSidebar(e){
    e.preventDefault();
    this.setState(prevState => ({active: !prevState.active}));
  }

  componentWillMount(){
    this.props.getWidgets('sidebar').then(w => this.setState({w: w}));
  }

  render(){
    let {
      theMenu,
      footerWidgets
    } = this.props;

    return(
      <div id="sidebar" className={!this.state.active?"inactive":""}>
        <div className="inner">

          <nav id="menu">
            <header className="major"><h2>Menu</h2></header>
            {theMenu()}
          </nav>

          {this.state.w}

          {footerWidgets.map((fw, i) => (
            <section key={i}>{fw}</section>
          ))}

          <footer id="footer">
            <p className="copyright">Editorial theme for Rendact</p>
          </footer>
        </div>
        <a className="toggle" href="#sidebar" onClick={this.handleToggleSidebar}>toggle</a>
      </div>
    )
  }
}
