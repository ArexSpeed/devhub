import { useState } from 'react';
import Link from 'next/link';
import FlagIconSwitcher from './IconSwitcher/FlagIconSwitcher';
import SkillsIconSwitcher from './IconSwitcher/SkillsIconSwitcher';
import SocialIconSwitcher from './IconSwitcher/SocialIconSwitcher';

const DevCard = ({ id, name, position, skills, langs, socials }) => {
  const [follow, setFollow] = useState(false);
  return (
    <div className="devcard">
      <article className="devcard__top">
        <div className="devcard__image"></div>
        <div className="devcard__details">
          <div className="devcard__details--langs">
            {langs.map((lang, i) => (
              <FlagIconSwitcher key={i} country={lang} className="icon-small" />
            ))}
          </div>
          <div className="devcard__details--name">{name}</div>
          <div className="devcard__details--title">{position}</div>
        </div>
      </article>
      <div className="devcard__smalltext">Skills</div>
      <article className="devcard__skills">
        {skills.map((skill, i) => (
          <SkillsIconSwitcher key={i} name={skill} className="icon-medium primary-blue" />
        ))}
      </article>
      <article className="devcard__buttons">
        <Link href={`/profile/${id}`} passHref>
          <button className="devcard__button devcard__button-profile">Profile</button>
        </Link>
        <button
          className={`devcard__button ${
            follow ? 'devcard__button-unfollow' : 'devcard__button-follow'
          } `}
          onClick={() => setFollow(!follow)}>
          {follow ? 'Unfollow' : 'Follow'}
        </button>
      </article>
      <article className="devcard__social">
        {socials.map((social, i) => (
          <Link key={i} href={social.link} passHref>
            <a>
              <SocialIconSwitcher
                name={social.name}
                className="icon-small primary-blue hover-secondary-blue"
              />
            </a>
          </Link>
        ))}
      </article>
    </div>
  );
};

export default DevCard;
