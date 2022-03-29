import { useState, useEffect } from 'react';
import { SearchIcon } from 'components/Icons/FontIcons';
import SkillsTags from 'components/SkillsTags';
import TitleBox from 'components/TitleBox';
import DevCard from 'components/DevCard';
import users from 'data/users.json';
import follows from 'data/usersFollow.json';

const ComminityPage = () => {
  const [activeButton, setActiveButton] = useState('All Developers');
  const [developerPosition, setDeveloperPosition] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [selectSkill, setSelectSkill] = useState([]);
  const [userFollows, setUserFollows] = useState({});
  const userid = 1; //temporary user id

  useEffect(() => {
    const findFollow = follows.find((follow) => follow.userid === userid);
    setUserFollows(findFollow);
  }, []);

  return (
    <div className="community">
      <section className="community__title">
        <TitleBox title="Developers Community" />
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
        <SkillsTags selectSkill={selectSkill} setSelectSkill={setSelectSkill} />
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
        {activeButton === 'All Developers' && (
          <>
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
          </>
        )}
        {activeButton === 'Followed' && (
          <>
            {users
              .filter((user) => userFollows.followed.indexOf(user.userid) !== -1)
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
          </>
        )}
        {activeButton === 'Followers' && (
          <>
            {users
              .filter((user) => userFollows.followers.indexOf(user.userid) !== -1)
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
          </>
        )}
      </section>
    </div>
  );
};

export default ComminityPage;
