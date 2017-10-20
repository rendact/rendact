import React from 'react'
import Loadable from 'react-loadable';
import Notification from 'react-notification-system';
import moment from 'moment'
import Halogen from 'halogen'
import {Link} from 'react-router';
import MetaTags from 'react-meta-tags';

const Sidebar = React.createClass({
  getInitialState: function() {
    return {
      widgets: '' 
    }
  },
  async componentDidMount(){
    this.props.getWidgets('Sidebar').then(widgets => {
       this.setState({widgets: widgets})
    })
  },
	render: function() {
		return ( this.state.widgets ?
			<div className="col-md-4 new-section">	
				<div className="sidebar-grid wow fadeInUpBig animated" data-wow-delay="0.4s">
          {this.state.widgets}
				</div>
			</div>
      :
      null
		)
	}
});

const HomeContentWithPage = React.createClass({
	render: function() {
		return (
		<div>
		  {this.props.data &&
		  <div className="blog_box">
		    <div className="blog_grid">
		      { this.props.data.imageFeatured &&
		      <a href="single.html">
		        <img src={this.props.data.imageFeatured.blobUrl} className="img-responsive" alt=""/>
		      </a>
		      }

		      <div className="single_desc">
		        <div dangerouslySetInnerHTML={{__html: this.props.data.content}} />
		      </div>
		    </div>
		  </div>
		  }
		</div>    
		)         
	}
});

const HomeContentWithLatestPost = React.createClass({
	render: function() {
		return (
			<div>
			  {this.props.data ? this.props.data.map((item) => {
			    return 	<div key={item.id} className="new">
			        <div className="col-md-6 new-text wow fadeIn animated">
			          {this.props.theTitle(item.id, item.title)}
			          <small>{moment(item.createdAt).format("MMMM Do YY, h:mm:ss a")}</small>
			          <section className="content-body">
			            {this.props.theExcerpt(item.content)}
			          </section>
			        </div>
			        <div className="col-md-6 welcome-img">
			          {this.props.theImage(item.imageFeatured)}
			        </div>
			        <div className="clearfix"> </div>
			      </div>
			    })
			      :
			      <div style={{height: 760, width: "100%", clear: 'both'}}>&nbsp;</div>
			  }
			  {this.props.thePagination}
			</div>
			)
	}
})

const HomeContent = React.createClass({
	render: function() {
		return <div className="container">
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
	}
})

const Header = React.createClass({
	render: function() {
		return (
			<div className="banner two" id="home">
				{this.props.theConfig && 
					<MetaTags>
	          <title>{this.props.theConfig.name}</title>
	          <meta id="meta-description" name="description" content={this.props.theConfig.tagline} />
	        </MetaTags>
      	}
					<div className="header-bottom">
					 <div className="fixed-header">
						<div className="container">
							{this.props.theLogo()}
							<span className="menu"> </span>
							<div className="top-menu">
								<nav className="navigation">
									{this.props.theMenu}
								</nav>		
							</div>
							<div className="clearfix"></div>
						</div>
					 </div>
				</div>
			</div>
		)
	}
});

const Footer = React.createClass({
	render: function() {
		return (
		<div className="footer">
			<div className="container">
				<div className="f-grids">
					{
						this.props.footerWidgets.map(function(item) { return item })
					}
					<div className="clearfix"></div>
				</div>
				
				<div className="copy">
					<p>Place sticky footer content here.<a></a></p>
		        </div>
			</div>
		</div>
		)
	}
});

export const Home = React.createClass({
  componentDidMount(){
    require('./style.css')
    require('bootstrap/dist/css/bootstrap.css')
  },
	render: function() {
		return (
			<div className="application">
				<Header {...this.props} />	   
        {this.props.loadDone ?
          <HomeContent {...this.props}/>
            :
            <div style={{height: '100vh'}}>&nbsp;</div>
        }
				<Footer {...this.props} />	
			</div>
		)
	}
});

export const Single = React.createClass({
	componentDidMount: function() {
  	this.notification = this.refs.notificationSystem;
    require('./style.css')
    require('bootstrap/dist/css/bootstrap.css')
	},
	render: function() {
		return (
			<div className="application">
				<Header {...this.props} />	   
				<div className="second-head">
					<div className="container">
						{this.props.theBreadcrumb}
					 </div>
				</div>
				<div className="container">
		      <div className="row single-top">
				  	<div className="col-md-8">
				  	 	<div className="blog_box">
							 	<div className="blog_grid">
                  {!this.props.loadDone ?
                  <div style={{left: "50%", top: "50%", position: "relative", margin: "7rem 0"}}>
                    <Halogen.ClipLoader color="#698a9a"/>
                  </div>
                      :
                      <div>
							  	<h3 className="wow rollIn animated" data-wow-delay="0.4s">{this.props.postData.title}</h3>
								  { this.props.postData.imageFeatured &&
								  <a href="single.html">
									  <img src={this.props.postData.imageFeatured.blobUrl} className="img-responsive" alt=""/>
									</a>
									}
					  
								  <div className="singe_desc">
								    <div dangerouslySetInnerHTML={{__html: this.props.postData.content}} />
								    
								    <div className="comments">
						  				<ul className="links">
						  					<li><i className="blog_icon1"> </i><br /><span>April 14, 2014</span></li>
						  					<li><a href="#"><i className="blog_icon2"> </i><br /><span>admin</span></a></li>
						  					<li><a href="#"><i className="blog_icon3"> </i><br /><span>1206</span></a></li>
						  					<li><a href="#"><i className="blog_icon4"> </i><br /><span>1206</span></a></li>
						  				</ul>
						  		    <div className="clearfix"></div>
							  	 	</div>
									</div>
                </div>

          }
								</div>
							</div>
					  </div>			
						<Sidebar {...this.props} />
					   	<div className="clearfix"></div>
					  
					  
					  	<div className="single_grid2">
						  <h4 className="tz-title-4 tzcolor-blue">
					      <p className="tzweight_Bold">Comments</p>
					    </h4>
					    <ul className="list">
			        {
			        	this.props.postData.comments && this.props.postData.comments.edges.map(function(item){
			        		return <li>
							            <div className="col-md-10 data">
							                <div className="title"><a href={item.node.website}>{item.node.name}</a><br /><span className="m_14">{moment(item.node.createdAt).format("MMMM Do YY, h:mm:ss a")}</span></div>
							                <p>{item.node.content}</p>
															<h5 className="m_26"> <a href="#">reply</a></h5>
							            </div>
							           <div className="clearfix"></div>
							        </li>
			        	})
			        }
					    </ul>
							</div>
							<Notification ref="notificationSystem" />
							<div className="single">
									<div className="leave">
										<h4>Leave a comment</h4>
									</div>
									{this.props.theCommentForm}
							</div>
					</div>
		    </div>
				<Footer {...this.props} />	
			</div>
			)
	}
});

export const Search = React.createClass({
  componentDidMount(){
    require('./style.css')
    require('bootstrap/dist/css/bootstrap.css')
  },
  renderSearchResult(){
    if (this.props.isProcessing){
      return <div><Halogen.PulseLoader color='green'/></div>
    }else if (this.props.searchResults.length) {
      return (
        this.props.searchResults.map((post, index) => (
                <div key={post.id} className="new">
                  <div style={{width: '100%'}} className="col-md-12 new-text wow fadeIn animated">
                    <h4><Link to={'/post/'+post.id}>{post.title}</Link></h4>
                    <small>{moment(post.createdAt).format("MMM Do YY, h:mm:ss a")}</small>
                    <section className="content-body" >
                      {this.props.theExcerpt(post.content)}
                    </section>
                  </div>
                  <div className="clearfix"></div>
                </div>
              ))
      )
    } else {
      return <p style={{color:'red'}}>No Result Found</p>
    }
  },
  render(){
    let resultStyle = {
      background: '#698a9a',
      color: 'white',
      padding: '0.5rem',
      borderRadius: '10px 0',
    }

    return (
      <div className="application">
        <Header {...this.props}/>
        <div className="container">
          <div className="col-md-8 new-section" style={{opacity: this.props.opacity}}>
            <h3>Result of <span style={resultStyle}>{this.props.searchQuery}</span></h3>
            {
              this.renderSearchResult()
            }
          </div>
          <Sidebar {...this.props}/>
          <div className="clearfix"></div>
        </div>
        <Footer {...this.props}/>
      </div>
    )
  }
});

export const Blog = React.createClass({
  componentDidMount(){

    require('./style.css')
    require('bootstrap/dist/css/bootstrap.css')
  },
	render: function() {
		return (
			<div className="application">
				<Header {...this.props} />   
				<div className="container">
					<div className="col-md-8 new-section">
						     {
						     	this.props.latestPosts && this.props.latestPosts.map(function(item){
						     		return 	<div className="new">
												<div className="col-md-6 new-text wow rollIn animated animated" data-wow-delay="0.4s" style={{"visibility": "visible", "animationDelay": "0.4s", "animationName": "rollIn"}}>
													<small>{item.createdAt}</small>
													{this.props.theTitle(item.id, item.title)}
													<section className="content-body">
														{this.props.theContent(item.content)}
													</section>
												</div>
												<div className="col-md-6 welcome-img">
													<a href="article" className="mask"><img src={item.featuredImage} alt="" className="img-responsive zoom-img" /></a>
												</div>
												<div className="clearfix"> </div>
											</div>
						     	}.bind(this))
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

export const widgetArea = ["Sidebar", "Single", "Footer"]
