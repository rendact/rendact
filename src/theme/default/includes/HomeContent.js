import React from 'react';
import Loadable from 'react-loadable'
import Sidebar from '../includes/Sidebar'

const HomeContentWithLatestPost = Loadable({
  loader: () => new Promise((resolve) =>
    require.ensure(['../includes/HomeContentWithLastestsPost'], () => resolve(require('../includes/HomeContentWithLastestsPost')),
	 'themehomewithlastestpost')),
  loading: () => null
})


const HomeContentWithPage = Loadable({
  loader: () => new Promise((resolve) =>
    require.ensure(['../includes/HomeContentWithPage'], () => resolve(require('../includes/HomeContentWithPage')),
	 'themehomewithpage')),
  loading: () => null
})

const HomeContent = (props) => (
<div className="container">
					<div className={props.theConfig.frontPage === "latestPost"? "col-md-8 new-section": "col-md-8"}>
						     {
                   props.theConfig.frontPage === 'latestPost' ? 
                     <HomeContentWithLatestPost {...props}/>
                     :
                     <HomeContentWithPage {...props}/>
						     }
					</div>	
					<Sidebar {...props} />
				  <div className="clearfix"></div>
				</div>
)

export default HomeContent;
