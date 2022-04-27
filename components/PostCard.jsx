import { useState, useEffect } from 'react';
import { CommentIcon, HeartIcon, HeartOutlineIcon } from './Icons/FontIcons';
import { useSession } from 'next-auth/client';
import axios from 'axios';
// eslint-disable-next-line prettier/prettier
export default function PostCard({ image, title, excerpt, content, userimage, username, postid }) {
  const [session] = useSession();
  const [isLike, setIsLike] = useState(false);
  const [likes, setLikes] = useState([]);
  useEffect(async () => {
    const result = await axios.get(`/api/posts/likes?postid=${postid}`);
    console.log(result.data, 'likes');
    setLikes(result.data);
  }, [isLike]);

  useEffect(() => {
    if (session) {
      const findLike = likes?.find((like) => like.userid === session.user.id);
      console.log(findLike, 'findLike');
      if (findLike) setIsLike(true);
    }
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
      console.log('Something went wrong!');
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
      console.log('Something went wrong!');
    }
  };

  return (
    <div className="postcard">
      <section className="postcard__top">
        <article className="postcard__image">
          <img src={image} alt="" />
        </article>
        <article className="postcard__description">
          <div className="postcard__info">
            <article className="blogcard__social">
              <button
                disabled={!session}
                className="blogcard__social-btn"
                onClick={isLike ? removeLike : addLike}>
                {isLike ? (
                  <HeartOutlineIcon className="icon-medium primary-blue" />
                ) : (
                  <HeartIcon className="icon-medium primary-blue" />
                )}
                <div className="blogcard__social-count">{likes.length}</div>
              </button>
              <button className="blogcard__social-btn">
                <CommentIcon className="icon-medium primary-blue" />
                <div className="blogcard__social-count">4</div>
              </button>
            </article>
            <article className="postcard__author">
              <p>{username}</p>
              <div className="blogcard__author-image">
                <img src={userimage} alt="" />
              </div>
            </article>
          </div>
          <div className="postcard__title">{title}</div>
          <p className="postcard__excerpt">{excerpt}</p>
        </article>
      </section>
      <section className="postcard__content">{content}</section>
    </div>
  );
}
