import React from 'react';
import Header from '../includes/Header';
import FooterWidgets from '../includes/FooterWidgets';
import PostList from '../includes/PostList';
import MenuItems from '../includes/MenuItems';
import Footer from '../includes/Footer';

class HomeWithPostList extends React.Component {
  render(){
    return (
      <div>
            <section className="tiles">
              {this.props.data ? this.props.data.map(item => (
                <PostList className={"style"+(Math.floor(Math.random() *6)+1)}
                  image={item.imageFeatured?item.imageFeatured.blobUrl:null}
                  content={item.content && item.content.slice(0, 100) + " ..."}
                  title={item.title}
                  key={item.id}
                  id={item.id}
                />
              ))
                  :null
              }
            </section>
            
              <div style={{textAlign: "center"}}>
                {this.props.thePagination}
              </div>
           
        </div>
    )
  }
}

class HomeWithPage extends React.Component {
  render(){
    
    let {data} = this.props;
    return (
      <div>
    <span className="image main">

      {data && data.imageFeatured &&
          <img src={data.imageFeatured.blobUrl} alt={data.title}/>}
        </span>
        <div dangerouslySetInnerHTML={{__html: data && data.content}}/>
      </div>
    )
  }
}




class Home extends React.Component {
  componentDidMount(){
    require( '../css/style.css')
    document.body.className = ""
    document.body.style.background = ""
  }
  
  render(){
    return (
      <div>
      <div id="wrapper" style={{background: "#fff"}}>
        <Header {...this.props}/>
        <div id="main">
          <div className="inner">
            <header></header>
            {this.props.loadDone &&
                this.props.theConfig.frontPage === "latestPost"?
                  <HomeWithPostList {...this.props}/>
                  :
                  <HomeWithPage {...this.props}/>
              }
              
          </div>
        </div>
        <FooterWidgets {...this.props}/>
        <Footer />
      </div>
      <MenuItems {...this.props}/>
      </div>
    )
  }
}

export default Home
