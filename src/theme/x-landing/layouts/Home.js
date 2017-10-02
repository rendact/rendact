import React from 'react'
import Header from '../includes/Header'
import Footer from '../includes/Footer'
import HeaderMobile from '../includes/HeaderMobile'
import moment from 'moment';
import '../css/main.min.css'
import '../css/style.css'
import scrollToElement from 'scroll-to-element'
import {Link} from 'react-router'

const HomeContentWithLatestPost = (props) => (
<div>
  {props.data ? props.data.map((item) => {
    return 	<div key={item.id} className="new">
        <div className="col-md-6 new-text wow fadeIn animated">
          {props.theTitle(item.id, item.title)}
          <small>{moment(item.createdAt).format("MMMM Do YY, h:mm:ss a")}</small>
          <section className="content-body">
            {props.theExcerpt(item.content)}
          </section>
        </div>
        <div className="col-md-6 welcome-img">
          {props.theImage(item.imageFeatured)}
        </div>
        <div className="clearfix"> </div>
      </div>
    })
      :
      <div style={{height: 760, width: "100%", clear: 'both'}}>&nbsp;</div>
  }
  {props.thePagination}
</div>
)


const HomeContentWithPage = (props) => (
<div>
  {props.data &&
  <div className="blog_box">
    <div className="blog_grid">
      { props.data.imageFeatured &&
      <a href="single.html">
        <img src={props.data.imageFeatured.blobUrl} className="img-responsive" alt=""/>
      </a>
      }

        <div dangerouslySetInnerHTML={{__html: props.data.content}} />
    </div>
  </div>
  }
</div>             
)


const Home = React.createClass({
  onContactLinkClick: function(e){
    if (e.target && e.target.nodeName === 'A' && e.target.className === 'button'){
      e.preventDefault()
      this._reactInternalInstance._context.history.push('/page/UG9zdDozNzQ=')
    }
  },

  onGotoScrollyClick: function(e){
    if (e.target && e.target.nodeName === 'A' && e.target.className === "goto-next scrolly"){
      e.preventDefault()
      scrollToElement("#items", {duration: 2000, offset:0})
    }
  },

  componentDidMount: function(){
    document.body.addEventListener('click', this.onContactLinkClick)
    document.body.addEventListener('click', this.onGotoScrollyClick)
  
  },
	render: function() {
		return (
			<div id="page-wrapper">
				<Header {...this.props} />	   
						     {
                   this.props.theConfig.frontPage === 'latestPost' ? 
                     <HomeContentWithLatestPost {...this.props}/>
                     :
                     <HomeContentWithPage {...this.props}/>
						     }
				<Footer {...this.props} />	
        <HeaderMobile {...this.props}/>
			</div>
		)
	}
});

export default Home;
