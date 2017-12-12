import moment from 'moment';
import React from 'react'

const HomeContentWithLatestsPost = (props) => (
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

export default HomeContentWithLatestsPost
