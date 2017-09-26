import React from 'react'
import Header from '../includes/Header'
import Sidebar from '../includes/Sidebar'
import Footer from '../includes/Footer'
import _ from 'lodash'
import moment from 'moment';

const HomeContentWithLatestPost = (props) => (
<div>
  {props.data && props.data.map((item) => {
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

      <div className="single_desc">
        <div dangerouslySetInnerHTML={{__html: props.data.content}} />
      </div>
    </div>
  </div>
  }
</div>             
)

const Home = React.createClass({
	render: function() {
		return (
			<div className="application">
				<Header {...this.props} />	   
				<div className="container">
					<div className={this.props.theConfig.frontPage === "latestPost"? "col-md-8 new-section": "col-md-8"}>
						     {
                   this.props.theConfig.frontPage === 'latestPost' ? 
                     <HomeContentWithLatestPost {...this.props}/>
                     :
                     <HomeContentWithPage {...this.props}/>
						     }
					</div>	
					<Sidebar {...this.props} />
				  <div className="clearfix"></div>
				</div>
				<Footer {...this.props} />	
			</div>
		)
	}
});

export default Home;
