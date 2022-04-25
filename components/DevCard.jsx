import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/client';
import Link from 'next/link';
//import axios from 'axios';
import FlagIconSwitcher from './IconSwitcher/FlagIconSwitcher';
import SkillsIconSwitcher from './IconSwitcher/SkillsIconSwitcher';
import SocialIconSwitcher from './IconSwitcher/SocialIconSwitcher';
import { motion } from 'framer-motion';

// eslint-disable-next-line prettier/prettier
const DevCard = ({ id, name, image, position, skills, langs, socials, followers, currentUserFollowed }) => {
  const [session] = useSession();
  const [isFollow, setIsFollow] = useState(false);
  //const [follows, setFollows] = useState([]);

  useEffect(() => {
    if (session) {
      const findFollow = followers?.find((followersId) => followersId === session.user.id);
      if (findFollow) setIsFollow(true);
    }
  }, [session, followers]);

  // useEffect(() => {
  //   const foll = axios.get(`/api/follows?userid=${session.user.id}`);
  //   if (foll) {
  //     setFollows(foll.data);
  //   }
  //   setFollows([]);
  // }, [session]);

  const checkSessionFollow = () => {
    if (!session) {
      alert('Please login to follow user');
    } else {
      if (isFollow) removeFollow();
      if (!isFollow) addFollow();
    }
  };

  const addFollow = async () => {
    const payload = {
      followed: [...currentUserFollowed, id],
      followers: [...followers, session.user.id]
    };

    console.log(payload, 'paylaod');

    const response = await fetch(`/api/follows?currentUser=${session.user.id}&selectedUser=${id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      setIsFollow(true);
    } else {
      console.log('Sth went wrong!');
    }
  };

  const removeFollow = async () => {
    const newFollowed = currentUserFollowed.filter((follow) => follow !== id);
    const newFollowers = followers.filter((follow) => follow !== session.user.id);
    const payload = {
      followed: newFollowed,
      followers: newFollowers
    };

    console.log(payload, 'paylaod');

    const response = await fetch(`/api/follows?currentUser=${session.user.id}&selectedUser=${id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      setIsFollow(false);
    } else {
      console.log('Sth went wrong!');
    }
  };

  return (
    <motion.div
      layout
      animate={{ opacity: 1, scale: 1 }}
      initial={{ opacity: 0, scale: 0 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="devcard">
      <article className="devcard__top">
        <div className="devcard__image">
          <img src={image} alt="" />
        </div>
        <div className="devcard__details">
          <div className="devcard__details--langs">
            {langs.map((lang, i) => (
              <FlagIconSwitcher key={i} country={lang} className="icon-small" />
            ))}
          </div>
          <div className="devcard__details--name">{name}</div>
          <div className="devcard__details--position">{position}</div>
        </div>
      </article>
      <div className="devcard__smalltext">Skills</div>
      <article className="devcard__skills">
        {skills.map((skill, i) => (
          <SkillsIconSwitcher key={i} name={skill} className="icon-medium secondary-blue" />
        ))}
      </article>
      <article className="devcard__buttons">
        <Link href={`/profile/${id}`} passHref>
          <button className="devcard__button devcard__button-profile">Profile</button>
        </Link>
        <button
          className={`devcard__button ${
            isFollow ? 'devcard__button-unfollow' : 'devcard__button-follow'
          } `}
          onClick={checkSessionFollow}>
          {isFollow ? 'Unfollow' : 'Follow'}
        </button>
      </article>
      <article className="devcard__social">
        {socials
          .filter((social) => social.link.length > 0)
          .map((social, i) => (
            <Link key={i} href={social.link} passHref>
              <a>
                <SocialIconSwitcher
                  name={social.name}
                  className="icon-small secondary-blue hover-primary-blue"
                />
              </a>
            </Link>
          ))}
      </article>
    </motion.div>
  );
};

export default DevCard;
