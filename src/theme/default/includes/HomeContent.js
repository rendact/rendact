import React from 'react';
import Loadable from 'react-loadable'
import Sidebar from '../includes/Sidebar'

const HomeContentWithLatestPost = Loadable({
  loader: () => import('../includes/HomeContentWithLastestsPost'),
  loading: () => null
})


const HomeContentWithPage = Loadable({
  loader: () => import('../includes/HomeContentWithPage'),
  loading: () => null
})

const HomeContent = (props) => {
return <div className="container">
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
}

export default HomeContent;
