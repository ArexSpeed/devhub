import React from 'react'



export default function BlogCard(props) {
  return (
    <div>
      <div className="blog__card">
            <div className="blog__card-top">
                
            </div>
            <div className="blog__card-content">
                <div className="blog__card-title">
                  {props.title}
                </div>
                <div className="blog__card-text">
                  {props.excerpt}
                </div>
                <div className="blog__card-author">
                <span class="dot"></span>
                {props.username}
                </div>
                <div className="blog__card-bottom">
                    <div className="blog__card-social">
                      {props.likes}
                      {props.comments}
                    </div>
                    <div className="blog__card-more">
                      Read more
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
