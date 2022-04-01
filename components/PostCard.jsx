import React from 'react';

export default function PostCard({ title, excerpt, username }) {
  return (
    <section className="postcard">
      <div className="postcard__container">
        <div className="postcard__description">
          <div className="postcard__image">Image</div>
          <div className="postcard__text">
            <div className="postcard__title">
              <p className="postcard__title-text">{title}</p>
            </div>
            <div className="postcard__excerpt">{excerpt}</div>
          </div>
          <div className="postcard__author">
            <span className="postcard__author-content">
              <p className="dot"></p>
              <p>{username}</p>
            </span>
          </div>
        </div>
        <div className="postcard__content">{excerpt}</div>
      </div>
    </section>
  );
}
