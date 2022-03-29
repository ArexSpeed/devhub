import React from 'react';
import { ChevronRight, Heart, Comment } from './Icons/FontIcons';

export default function BlogCard(props) {
  return (
    <div>
      <div className="blog__card">
        <div className="blog__card-top"></div>
        <div className="blog__card-content">
          <div className="blog__card-title">{props.title}</div>
          <div className="blog__card-text">{props.excerpt}</div>
          <div className="blog__card-author">
            <span className="dot"></span>
            {props.username}
          </div>
          <div className="blog__card-bottom">
            <div className="blog__card-social">
              <Heart /> <span className="blog__card-social-length dot">{props.likes.length}</span>
              <Comment />{' '}
              <span className="blog__card-social-length dot">{props.comments.length}</span>
            </div>
            <div className="blog__card-more">
              <ChevronRight className="icon-medium" /> Read more
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
