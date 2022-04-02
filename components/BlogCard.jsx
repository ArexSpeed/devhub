import Link from 'next/link';
import { ChevronRight, HeartIcon, CommentIcon } from './Icons/FontIcons';

const BlogCard = ({ postid, title, excerpt, userimage, username, likes, comments }) => {
  return (
    <div className="blogcard">
      <section className="blogcard__image">
        <img
          src="https://res.cloudinary.com/dbpsxmtcb/image/upload/v1648750351/iwtdp37s91oqth8wliev.jpg"
          alt=""
        />
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
            <button className="blogcard__social-btn">
              <HeartIcon className="icon-medium primary-blue" />
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
