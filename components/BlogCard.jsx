import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/client';
import Link from 'next/link';
import { ChevronRight, HeartIcon, CommentIcon, HeartOutlineIcon } from './Icons/FontIcons';
import { motion } from 'framer-motion';
import axios from 'axios';

const BlogCard = ({ postid, userimage, username, image, title, excerpt, comments }) => {
  const [session] = useSession();
  const [isLike, setIsLike] = useState(false);
  const [likes, setLikes] = useState([]);
  useEffect(async () => {
    const result = await axios.get(`/api/posts/likes?postid=${postid}`);
    console.log(result.data, 'likes');
    setLikes(result.data);
  }, [isLike]);

  useEffect(() => {
    const findLike = likes?.find((like) => like.userid === session.user.id);
    console.log(findLike, 'findLike');
    if (findLike) setIsLike(true);
  }, [likes]);

  const addLike = async () => {
    const newLikesArr = [...likes, { userid: session.user.id, username: session.user.name }];
    const payload = {
      likes: newLikesArr
    };

    const response = await fetch(`/api/posts/likes?postid=${postid}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      setIsLike(true);
    } else {
      console.log('Sth went wrong!');
    }
  };
  const removeLike = async () => {
    const newLikesArr = likes.filter((like) => like.userid !== session.user.id);
    const payload = {
      likes: newLikesArr
    };

    const response = await fetch(`/api/posts/likes?postid=${postid}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      setIsLike(false);
    } else {
      console.log('Sth went wrong!');
    }
  };







  return (
    <motion.div
      className="blogcard"
      layout
      animate={{ opacity: 1, scale: 1 }}
      initial={{ opacity: 0, scale: 0 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}>
      <section className="blogcard__image">
        <img src={image} alt="" />
      </section>
      <section className="blogcard__content">
        <div className="blogcard__title">{title}</div>
        <div className="blogcard__excerpt">
          {excerpt.length < 150 ? excerpt : excerpt.substr(0, 150) + '...'}
        </div>
        <article className="blogcard__author">
          <div className="blogcard__author-image">
            <img src={userimage} alt="" />
          </div>
          <p>{username}</p>
        </article>
        <article className="blogcard__bottom">
          <div className="blogcard__social">
            <button className="blogcard__social-btn" onClick={isLike ? removeLike : addLike}>
            {isLike ? (
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
    </motion.div>
  );
};

export default BlogCard;
