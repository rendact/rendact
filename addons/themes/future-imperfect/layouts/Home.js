import $ from 'jquery'
import React from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';


let Home = React.createClass({
  componentDidMount(){
    require('../assets/css/main.css')
  },


  render(){
    let {
      theConfig,
      data,
      thePagination,
      loadDone
    } = this.props
    return (
        <div id="wrapper">

        
          <header id="header">
            <h1><a href="#">Future Imperfect</a></h1>
            <nav className="links">
              <ul>
                <li><a href="#">Lorem</a></li>
                <li><a href="#">Ipsum</a></li>
                <li><a href="#">Feugiat</a></li>
                <li><a href="#">Tempus</a></li>
                <li><a href="#">Adipiscing</a></li>
              </ul>
            </nav>
            <nav className="main">
              <ul>
                <li className="search">
                  <a className="fa-search" href="#search">Search</a>
                  <form id="search" method="get" action="#">
                    <input type="text" name="query" placeholder="Search" />
                  </form>
                </li>
                <li className="menu">
                  <a className="fa-bars" href="#menu">Menu</a>
                </li>
              </ul>
            </nav>
          </header>

  
          <section id="menu">

         
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

          </section>

    
          <div id="main">

            {data && data.map((post, index) => (
              <article className="post">
                <header>
                  <div className="title">
                    <h2><a href="#">{post.title && post.title}</a></h2>
                    <p dangerouslySetInnerHTML={{__html: post.content ? post.content.slice(0, 50):""}} />
                  </div>
                  <div className="meta">
                    <time className="published" datetime="2015-11-01">November 1, 2015</time>
                    <a href="#" className="author"><span className="name">Jane Doe</span><img src="images/avatar.jpg" alt="" /></a>
                  </div>
                </header>
                <a href="#" className="image featured"><img src={post.imageFeatured ? post.imageFeatured.blobUrl: require('images/logo-128.png') } alt="" /></a>
                <p dangerouslySetInnerHTML={{__html: post.content ? post.content.slice(0, 200):""}} />
                <footer>
                  <ul className="actions">
                    <li><a href="#" className="button big">Continue Reading</a></li>
                  </ul>
                  <ul className="stats">
                    <li><a href="#">General</a></li>
                    <li><a href="#" className="icon fa-heart">28</a></li>
                    <li><a href="#" className="icon fa-comment">128</a></li>
                  </ul>
                </footer>
              </article>
            ))}
         
            

            
              <ul className="actions pagination">
                <li><a href="" className="disabled button big previous">Previous Page</a></li>
                <li><a href="#" className="button big next">Next Page</a></li>
              </ul>

          </div>

       
          <section id="sidebar">

            
              <section id="intro">
                <a href="#" className="logo"><img src="images/logo.jpg" alt="" /></a>
                <header>
                  <h2>Future Imperfect</h2>
                  <p>Another fine responsive site template by <a href="http://html5up.net">HTML5 UP</a></p>
                </header>
              </section>

           
              <section>
                <div className="mini-posts">

                 
                    <article className="mini-post">
                      <header>
                        <h3><a href="#">Vitae sed condimentum</a></h3>
                        <time className="published" datetime="2015-10-20">October 20, 2015</time>
                        <a href="#" className="author"><img src="images/avatar.jpg" alt="" /></a>
                      </header>
                      <a href="#" className="image"><img src="images/pic04.jpg" alt="" /></a>
                    </article>

   
                    <article className="mini-post">
                      <header>
                        <h3><a href="#">Rutrum neque accumsan</a></h3>
                        <time className="published" datetime="2015-10-19">October 19, 2015</time>
                        <a href="#" className="author"><img src="images/avatar.jpg" alt="" /></a>
                      </header>
                      <a href="#" className="image"><img src="images/pic05.jpg" alt="" /></a>
                    </article>

                 
                    <article className="mini-post">
                      <header>
                        <h3><a href="#">Odio congue mattis</a></h3>
                        <time className="published" datetime="2015-10-18">October 18, 2015</time>
                        <a href="#" className="author"><img src="images/avatar.jpg" alt="" /></a>
                      </header>
                      <a href="#" className="image"><img src="images/pic06.jpg" alt="" /></a>
                    </article>

             
                    <article className="mini-post">
                      <header>
                        <h3><a href="#">Enim nisl veroeros</a></h3>
                        <time className="published" datetime="2015-10-17">October 17, 2015</time>
                        <a href="#" className="author"><img src="images/avatar.jpg" alt="" /></a>
                      </header>
                      <a href="#" className="image"><img src="images/pic07.jpg" alt="" /></a>
                    </article>

                </div>
              </section>

         
              <section>
                <ul className="posts">
                  <li>
                    <article>
                      <header>
                        <h3><a href="#">Lorem ipsum fermentum ut nisl vitae</a></h3>
                        <time className="published" datetime="2015-10-20">October 20, 2015</time>
                      </header>
                      <a href="#" className="image"><img src="images/pic08.jpg" alt="" /></a>
                    </article>
                  </li>
                  <li>
                    <article>
                      <header>
                        <h3><a href="#">Convallis maximus nisl mattis nunc id lorem</a></h3>
                        <time className="published" datetime="2015-10-15">October 15, 2015</time>
                      </header>
                      <a href="#" className="image"><img src="images/pic09.jpg" alt="" /></a>
                    </article>
                  </li>
                  <li>
                    <article>
                      <header>
                        <h3><a href="#">Euismod amet placerat vivamus porttitor</a></h3>
                        <time className="published" datetime="2015-10-10">October 10, 2015</time>
                      </header>
                      <a href="#" className="image"><img src="images/pic10.jpg" alt="" /></a>
                    </article>
                  </li>
                  <li>
                    <article>
                      <header>
                        <h3><a href="#">Magna enim accumsan tortor cursus ultricies</a></h3>
                        <time className="published" datetime="2015-10-08">October 8, 2015</time>
                      </header>
                      <a href="#" className="image"><img src="images/pic11.jpg" alt="" /></a>
                    </article>
                  </li>
                  <li>
                    <article>
                      <header>
                        <h3><a href="#">Congue ullam corper lorem ipsum dolor</a></h3>
                        <time className="published" datetime="2015-10-06">October 7, 2015</time>
                      </header>
                      <a href="#" className="image"><img src="images/pic12.jpg" alt="" /></a>
                    </article>
                  </li>
                </ul>
              </section>

         
              <section className="blurb">
                <h2>About</h2>
                <p>Mauris neque quam, fermentum ut nisl vitae, convallis maximus nisl. Sed mattis nunc id lorem euismod amet placerat. Vivamus porttitor magna enim, ac accumsan tortor cursus at phasellus sed ultricies.</p>
                <ul className="actions">
                  <li><a href="#" className="button">Learn More</a></li>
                </ul>
              </section>

           
              <section id="footer">
                <ul className="icons">
                  <li><a href="#" className="fa-twitter"><span className="label">Twitter</span></a></li>
                  <li><a href="#" className="fa-facebook"><span className="label">Facebook</span></a></li>
                  <li><a href="#" className="fa-instagram"><span className="label">Instagram</span></a></li>
                  <li><a href="#" className="fa-rss"><span className="label">RSS</span></a></li>
                  <li><a href="#" className="fa-envelope"><span className="label">Email</span></a></li>
                </ul>
                <p className="copyright">&copy; Untitled. Design: <a href="http://html5up.net">HTML5 UP</a>. Images: <a href="http://unsplash.com">Unsplash</a>.</p>
              </section>

          </section>

      </div>
    )
  }
});

export default Home;
