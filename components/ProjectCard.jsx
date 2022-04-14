import { useState } from 'react';
import Link from 'next/link';
import SkillsIconSwitcher from './IconSwitcher/SkillsIconSwitcher';
import { WebsiteIcon } from './Icons/SocialIcons';
import { HeartIcon, HeartOutlineIcon } from './Icons/FontIcons';
import { motion } from 'framer-motion';

// eslint-disable-next-line prettier/prettier
const ProjectCard = ({ title, username, userimage, logo, link, description, technology, likes }) => {
  const [like, setLike] = useState(false);
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
        <button className="projectcard__likes-btn" onClick={() => setLike(!like)}>
          {like ? (
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
