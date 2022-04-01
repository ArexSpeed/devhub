import { useState } from 'react';
import Link from 'next/link';
import SkillsIconSwitcher from './IconSwitcher/SkillsIconSwitcher';
import { WebsiteIcon } from './Icons/SocialIcons';
import { HeartIcon, HeartOutlineIcon } from './Icons/FontIcons';

// eslint-disable-next-line prettier/prettier
const ProjectCard = ({ projectid, title, userid, username, userimage, logo, link, description, technology, likes }) => {
  const [like, setLike] = useState(false);
  return (
    <div className="projectcard">
      <div className="projectcard__heading">
        <div className="projectcard__image">
          <img src={logo} alt="" />
        </div>
        <div className="projectcard__title">{title}</div>
      </div>
      <p>{description}</p>
      <article className="projectcard__skills">
        {technology.map((skill, i) => (
          <SkillsIconSwitcher key={i} name={skill} className="icon-medium primary-blue" />
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
    </div>
  );
};

export default ProjectCard;
