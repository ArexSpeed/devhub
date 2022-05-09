import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/client';
import Link from 'next/link';
import SkillsIconSwitcher from './IconSwitcher/SkillsIconSwitcher';
import { WebsiteIcon } from './Icons/SocialIcons';
import { HeartIcon, HeartOutlineIcon } from './Icons/FontIcons';
import { motion } from 'framer-motion';
import axios from 'axios';

// eslint-disable-next-line prettier/prettier
const ProjectCard = ({ projectid, title, username, userimage, logo, link, description, technology }) => {
  const [session] = useSession();
  const [isLike, setIsLike] = useState(false);
  const [likes, setLikes] = useState([]);

  useEffect(async () => {
    const result = await axios.get(`/api/projects/likes?projectid=${projectid}`);
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

  const checkSession = () => {
    if (!session) {
      alert('Please login to add like');
    } else {
      if (isLike) removeLike();
      if (!isLike) addLike();
    }
  };

  const addLike = async () => {
    const newLikesArr = [...likes, { userid: session.user.id, username: session.user.name }];
    const payload = {
      likes: newLikesArr
    };

    const response = await fetch(`/api/projects/likes?projectid=${projectid}`, {
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

    const response = await fetch(`/api/projects/likes?projectid=${projectid}`, {
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
      className="projectcard"
      layout
      animate={{ opacity: 1, scale: 1 }}
      initial={{ opacity: 0, scale: 0 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}>
      <div className="projectcard__heading">
        <div className="projectcard__image">
          <img src={logo} alt="" />
        </div>
        <div className="projectcard__title">{title}</div>
      </div>
      <p>{description.substr(0, 200)}</p>
      <article className="projectcard__skills">
        {technology.map((skill, i) => (
          <SkillsIconSwitcher key={i} name={skill} className="icon-medium secondary-blue" />
        ))}
      </article>

      <div className="projectcard__userimage">
        <div className="projectcard__userimage-image">
          <img src={userimage} alt="" />
        </div>
        <p>{username}</p>
      </div>

      <div className="projectcard__likes">
        <button className="projectcard__likes-btn" onClick={checkSession}>
          {isLike ? (
            <HeartOutlineIcon className="icon-medium primary-blue" />
          ) : (
            <HeartIcon className="icon-medium primary-blue" />
          )}
          <div className="projectcard__likes-count">{likes.length}</div>
        </button>

        <Link href={link} passHref>
          <a className="projectcard__link" target="_blank">
            <WebsiteIcon className="icon-medium primary-blue" />
            <span>Go to project</span>
          </a>
        </Link>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
