import React from 'react';
import Header from '../includes/Header';
import Sidebar from '../includes/Sidebar';
import PostList from '../includes/PostList';
import Post from '../includes/Post';

const HomePostList = ({data, thePagination}) => (
            <section>
              <div className="posts">
                {data && data.map(post => (
                  <PostList
                    title={post.title}
                    content={post.content && post.content.trim().slice(0, 100)}
                    image={post.imageFeatured?post.imageFeatured.blobUrl:require('images/logo-128.png')}
                    id={post.id}
                  />
                ))}
              </div>
                {thePagination}
            </section>

)

export default class Home extends React.Component {
  componentDidMount(){
    require('../assets/css/main.css')
  }

  render(){
    let {
      theConfig,
      data,
      thePagination,
      loadDone
    } = this.props

    return (
      <div id="wrapper">
        <div id="main">
          <div className="inner">
            <Header name={theConfig ? theConfig.name : "Rendact"} tagline={theConfig ? theConfig.tagline: "a simple blog"}/>

            {loadDone ?  theConfig.frontPage === "latestPost"?
            <HomePostList data={data} thePagination={thePagination}/>
                :
                <Post
                  content={data && data.content}
                  isHome={true}
                  image={data && data.imageFeatured?data.imageFeatured.blobUrl:require('images/logo-128.png')}
                />
                :
                null
            }

          </div>
        </div>
            <Sidebar {...this.props}/>
      </div>

    )
  }
}
