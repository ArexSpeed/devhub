import React from 'react';
import { CommentIcon, HeartIcon } from './Icons/FontIcons';

export default function PostCard({ title, excerpt, username }) {
  return (
    <div className="postcard">
      <section className="postcard__top">
        <article className="postcard__image">
          <img src="" alt="" />
        </article>
        <article className="postcard__description">
          <div className="postcard__info">
            <article className="blogcard__social">
              <button className="blogcard__social-btn">
                <HeartIcon className="icon-medium primary-blue" />
                <div className="blogcard__social-count">3</div>
              </button>
              <button className="blogcard__social-btn">
                <CommentIcon className="icon-medium primary-blue" />
                <div className="blogcard__social-count">3</div>
              </button>
            </article>
            <article className="postcard__author">
              <p>{username}</p>
              <div className="blogcard__author-image">
                <img src="" alt="" />
              </div>
            </article>
          </div>
          <div className="postcard__title">{title}</div>
          <p className="postcard__excerpt">{excerpt}</p>
        </article>
      </section>
      <section className="postcard__content">{excerpt}</section>
    </div>
  );
}
