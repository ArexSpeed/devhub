import { useState } from 'react';
import Link from 'next/link';
import FlagIconSwitcher from './IconSwitcher/FlagIconSwitcher';
import SkillsIconSwitcher from './IconSwitcher/SkillsIconSwitcher';
import SocialIconSwitcher from './IconSwitcher/SocialIconSwitcher';
import { WebsiteIcon } from './Icons/SocialIcons';
import { Heart } from './Icons/FontIcons';

function ProjectCard({
  projectid,
  title,
  userid,
  username,
  userimage,
  logo,
  description,
  technology,
  likes
}) {
  const [follow, setFollow] = useState(false);
  return (
    <div className="projectcard">
      <div className="projectcard__heading">
        <div className="projectcard__image"></div>
        <h2 className="projectcard__title">{title}</h2>
      </div>
      <p>{description}</p>
      <article className="projectcard__skills">
        {technology.map((skill, i) => (
          <SkillsIconSwitcher
            key={i}
            name={skill}
            className="icon-medium primary-blue margin-skills"
          />
        ))}
      </article>

      <div className="projectcard__userimage">
        <div className="projectcard__userimage-image">
          <img src={userimage} alt="" />
        </div>
        <p>{username}</p>
      </div>

      <div className="projectcard__likes">
        <Heart className="icon-medium projectcard__likes-heart" />
        <span className="projectcard__likes-votes">{likes.length}</span>

        <button className="projectcard__btn">
          <div className="projectcard__btn-wrapper">
            <WebsiteIcon className="primary-blue icon-medium icon-medium--center" />
          </div>
          <div>Go to project</div>
        </button>
      </div>
    </div>
  );
}

export default ProjectCard;
