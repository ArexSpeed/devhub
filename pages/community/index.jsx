import { useState } from 'react';
import { SearchIcon } from 'components/Icons/FontIcons';
import SkillsTags from 'components/SkillsTags';
import TitleSite from 'components/TitleSite';
import DevCard from 'components/DevCard';
import users from 'data/users.json';

const ComminityPage = () => {
  const [activeButton, setActiveButton] = useState('All Developers');
  const [developerPosition, setDeveloperPosition] = useState('');
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="community">
      <section className="community__title">
        <TitleSite title="Developers Community" />
      </section>
      <section className="community__searchcontainer">
        <div className="community__searchbox">
          <div className="community__searchbox-icon">
            <SearchIcon className="icon-medium secondary-blue" />
          </div>
          <input
            type="text"
            className="community__searchbox-input"
            placeholder="Search Developer by name"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <select
          className="community__selector"
          onChange={(e) => setDeveloperPosition(e.target.value)}>
          <option value="">All Developers</option>
          <option value="Frontend Developer">Frontend Developers</option>
          <option value="Backend Developer">Backend Developers</option>
          <option value="Fullstack Developer">Fullstack Developers</option>
        </select>
      </section>
      <p>Find developer by skills</p>
      <section className="community__tags">
        <SkillsTags />
      </section>
      <section className="community__buttons">
        <button
          className={
            activeButton === 'All Developers' ? 'community__button active' : 'community__button'
          }
          onClick={() => setActiveButton('All Developers')}>
          All Developers
        </button>
        <button
          className={activeButton === 'Followed' ? 'community__button active' : 'community__button'}
          onClick={() => setActiveButton('Followed')}>
          Followed
        </button>
        <button
          className={
            activeButton === 'Followers' ? 'community__button active' : 'community__button'
          }
          onClick={() => setActiveButton('Followers')}>
          Followers
        </button>
      </section>
      <section className="community__profiles">
        {users
          .filter((user) => user.position.includes(developerPosition))
          .filter((user) => user.name.includes(searchValue))
          .map((user) => (
            <DevCard
              key={user.userid}
              id={user.userid}
              name={user.name}
              position={user.position}
              skills={user.skills}
              langs={user.languages}
              socials={user.social}
            />
          ))}
      </section>
    </div>
  );
};

export default ComminityPage;
