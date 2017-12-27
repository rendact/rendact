import $ from 'jquery'
import React from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import moment from 'moment';
import {Link} from 'react-router';
import scrollToElement from 'scroll-to-element';

let Blog = React.createClass({
  componentDidMount(){
    require('../assets/css/main.css')
  },

  handleScrolly(e){
    scrollToElement("#inti", {
      duration: 1500,
      offset: 0,
      ease: 'in-sine'
    })
  },

  render(){
    let { theConfig, latestPosts: data, thePagination, loadDone } = this.props;

    return (
      <div>
        <div id="content">
          <div className="inner">
            {data && data.map((post, index) => (
              <article className="box post post-excerpt">
                <header>
                  <h2><Link to={"/post/" + post.id}>{post.title && post.title}</Link></h2>
                </header>
                <div className="info">
                  <span className="date"><span className="month">Jul<span>y</span></span> <span className="day">14</span><span className="year">, 2014</span></span>
                  <ul className="stats">
                    <li><a href="#" className="icon fa-comment">16</a></li>
                    <li><a href="#" className="icon fa-heart">32</a></li>
                    <li><a href="#" className="icon fa-twitter">64</a></li>
                    <li><a href="#" className="icon fa-facebook">128</a></li>
                  </ul>
                </div>
                <Link className="image featured" to={"/post/" + post.id}>
                  <img src={post.imageFeatured ? post.imageFeatured.blobUrl: require('images/logo-128.png') } alt="" />
                </Link>
                <p dangerouslySetInnerHTML={{__html: post.content ? post.content.slice(0, 220):""}} />
                <Link className="button" to={"/post/" + post.id}>Read More</Link>
              </article>
            ))}
             <div style={{textAlign: "center"}}>
                {this.props.thePagination}
              </div> 
          </div>
        </div>

        <div id="sidebar">
            <h1 id="logo"><Link to={"/"}>{theConfig?theConfig.name:"Rendact"}</Link></h1>
            <nav id="nav">
              {this.props.theMenu()}
            </nav>
            <section className="box search">
              <form method="post" action="#">
                <input type="text" className="text" name="search" placeholder="Search" />
              </form>
            </section>

            <section className="box text-style1">
              <div className="inner">
                <p>
                  <strong>Striped:</strong> A free and fully responsive HTML5 site
                  template designed by <a href="http://twitter.com/ajlkn">AJ</a> for <a href="http://html5up.net/">HTML5 UP</a>
                </p>
              </div>
            </section>

            {this.props.footerWidgets &&
            this.props.footerWidgets.map((fw, idx) =><section className="box recent-posts">{fw}</section>)}

            <section className="box calendar">
              <div className="inner">
                <table>
                  <caption>July 2014</caption>
                  <thead>
                    <tr>
                      <th scope="col" title="Monday">M</th>
                      <th scope="col" title="Tuesday">T</th>
                      <th scope="col" title="Wednesday">W</th>
                      <th scope="col" title="Thursday">T</th>
                      <th scope="col" title="Friday">F</th>
                      <th scope="col" title="Saturday">S</th>
                      <th scope="col" title="Sunday">S</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colspan="4" className="pad"><span>&nbsp;</span></td>
                      <td><span>1</span></td>
                      <td><span>2</span></td>
                      <td><span>3</span></td>
                    </tr>
                    <tr>
                      <td><span>4</span></td>
                      <td><span>5</span></td>
                      <td><a href="#">6</a></td>
                      <td><span>7</span></td>
                      <td><span>8</span></td>
                      <td><span>9</span></td>
                      <td><a href="#">10</a></td>
                    </tr>
                    <tr>
                      <td><span>11</span></td>
                      <td><span>12</span></td>
                      <td><span>13</span></td>
                      <td className="today"><a href="#">14</a></td>
                      <td><span>15</span></td>
                      <td><span>16</span></td>
                      <td><span>17</span></td>
                    </tr>
                    <tr>
                      <td><span>18</span></td>
                      <td><span>19</span></td>
                      <td><span>20</span></td>
                      <td><span>21</span></td>
                      <td><span>22</span></td>
                      <td><a href="#">23</a></td>
                      <td><span>24</span></td>
                    </tr>
                    <tr>
                      <td><a href="#">25</a></td>
                      <td><span>26</span></td>
                      <td><span>27</span></td>
                      <td><span>28</span></td>
                      <td className="pad" colspan="3"><span>&nbsp;</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <ul id="copyright">
              <li>&copy; Rendact.</li><li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
            </ul>

        </div>
      </div>
    )
  }
});

export default Blog;