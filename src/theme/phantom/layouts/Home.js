import React from 'react';
import Header from '../includes/Header';
import Footer from '../includes/Footer';
import PostList from '../includes/PostList';

class Home extends React.Component {
  componentDidMount(){
    require( '../css/style.css')
    document.body.className = ""
    document.body.style.background = ""
  }
  
  render(){
    return (
      <div id="wrapper" style={{background: "#fff"}}>
        <Header {...this.props}/>
        <div id="main">
          <div className="inner">
            <header></header>
            <section className="tiles">
              {this.props.data ? this.props.data.map(item => (
                <PostList className={"style"+(Math.floor(Math.random() *6)+1)}
                  image={item.imageFeatured?item.imageFeatured.blobUrl:null}
                  content={item.content}
                  title={item.title}
                  key={item.id}
                  id={item.id}
                />
              ))
                  :null
              }
            </section>
          </div>
        </div>
        <Footer {...this.props}/>
      </div>
    )
  }
}

export default Home
