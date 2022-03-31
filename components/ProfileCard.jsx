import Link from 'next/link';
import FlagIconSwitcher from './IconSwitcher/FlagIconSwitcher';
import SocialIconSwitcher from './IconSwitcher/SocialIconSwitcher';

const ProfileCard = ({ name, position, langs, socials, about }) => {
  return (
    <section className="profileCard">
      <article className="profileCard__details">
        <div className="profileCard__media">
          <div className="profileCard__image"></div>
          <div className="profileCard__socials">
            {socials
              ?.filter((social) => social.link.length > 0)
              ?.map((social, i) => (
                <Link key={i} href={social.link} passHref>
                  <a>
                    <SocialIconSwitcher
                      name={social.name}
                      className="icon-small primary-blue hover-secondary-blue"
                    />
                  </a>
                </Link>
              ))}
          </div>
        </div>
        <div className="profileCard__info">
          <div className="profileCard__name">{name}</div>
          <div className="profileCard__position">{position}</div>
          <div className="profileCard__langs">
            {langs?.map((lang, i) => (
              <FlagIconSwitcher key={i} country={lang} className="icon-small" />
            ))}
          </div>
        </div>
      </article>
      <article className="profileCard__about">
        <p className="profileCard__about-title">About me</p>
        <div className="profileCard__about-description">{about}</div>
      </article>
    </section>
  );
};

export default ProfileCard;
