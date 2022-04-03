import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, HeartIcon, CommentIcon, HeartOutlineIcon } from './Icons/FontIcons';

const BlogCard = ({ postid, userimage, username, image, title, excerpt, likes, comments }) => {
  const [like, setLike] = useState(false);
  return (
    <div className="blogcard">
      <section className="blogcard__image">
        <img src={image} alt="" />
      </section>
      <section className="blogcard__content">
        <div className="blogcard__title">{title}</div>
        <div className="blogcard__excerpt">{excerpt}</div>
        <article className="blogcard__author">
          <div className="blogcard__author-image">
            <img src={userimage} alt="" />
          </div>
          <p>{username}</p>
        </article>
        <article className="blogcard__bottom">
          <div className="blogcard__social">
            <button className="blogcard__social-btn" onClick={() => setLike(!like)}>
              {like ? (
                <HeartOutlineIcon className="icon-medium primary-blue" />
              ) : (
                <HeartIcon className="icon-medium primary-blue" />
              )}
              <div className="blogcard__social-count">{likes.length}</div>
            </button>
            <button className="blogcard__social-btn">
              <CommentIcon className="icon-medium primary-blue" />
              <div className="blogcard__social-count">{comments.length}</div>
            </button>
          </div>

          <Link href={`/blog/${postid}`} passHref>
            <a className="blogcard__link">
              <ChevronRight className="icon-medium primary-blue" />
              <span>Read more</span>
            </a>
          </Link>
        </article>
      </section>
    </div>
  );
};

export default BlogCard;
