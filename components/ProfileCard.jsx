import Link from 'next/link';
import FlagIconSwitcher from './IconSwitcher/FlagIconSwitcher';
import SocialIconSwitcher from './IconSwitcher/SocialIconSwitcher';

const ProfileCard = ({ name, position, langs, socials }) => {
  return (
    <section className="profileCard">
      <article className="profileCard__details">
        <div className="profileCard__media">
          <div className="profileCard__image"></div>
          <div className="profileCard__socials">
            {socials?.map((social, i) => (
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
        <div className="profileCard__about-description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. At cum magnam quam laudantium
          adipisci officiis numquam necessitatibus unde quas odio eaque alias, doloribus fuga animi
          quos tempora incidunt hic assumenda doloremque, tenetur nostrum consequuntur! Dicta maxime
          dolore dolorum hic ut atque deleniti ipsum eum officia quod, dignissimos tempore
          doloremque reiciendis non consequatur modi amet delectus soluta! Asperiores blanditiis ea
          explicabo repudiandae libero molestias perspiciatis! Sint deserunt quasi voluptas eum,
          atque commodi quidem, pariatur provident rem nobis magni molestiae distinctio rerum quo
          ratione quis! Deserunt necessitatibus dolor laudantium, temporibus odio quibusdam facere
          ipsum fuga voluptatem, non sit! Impedit iste delectus architecto.
        </div>
      </article>
    </section>
  );
};

export default ProfileCard;
