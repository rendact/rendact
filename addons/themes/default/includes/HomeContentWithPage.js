import React from 'react';

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

export default HomeContentWithPage;
