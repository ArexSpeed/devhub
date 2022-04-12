import { useState, useEffect } from 'react';
import SkillsTags from 'components/SkillsTags';
import TitleBox from 'components/TitleBox';
import DevCard from 'components/DevCard';
import follows from 'data/usersFollow.json';
import axios from 'axios';
import Layout from 'components/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import SearchBox from 'components/SearchBox';

const CommunityPage = () => {
  const [users, setUsers] = useState([]);
  const [activeButton, setActiveButton] = useState('All Developers');
  const [developerPosition, setDeveloperPosition] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [selectSkill, setSelectSkill] = useState(['']);
  const [userFollows, setUserFollows] = useState({});
  const userid = 1; //temporary user id

  useEffect(() => {
    const findFollow = follows.find((follow) => follow.userid === userid);
    setUserFollows(findFollow);
  }, []);
  useEffect(async () => {
    const data = await axios.get('/api/users');
    setUsers(data.data);
  }, []);

  return (
    <Layout>
      <div className="community">
        <section className="community__title">
          <TitleBox title="Developers Community" />
        </section>
        <section className="searchbox__container">
          <SearchBox
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            placeholder="Find developer by name"
          />
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
        <section className="filters">
          <motion.button
            animate={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.1 }}
            className={
              activeButton === 'All Developers' ? 'filters__button active' : 'filters__button'
            }
            onClick={() => setActiveButton('All Developers')}>
            All Developers
          </motion.button>
          <motion.button
            animate={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.2 }}
            className={activeButton === 'Followed' ? 'filters__button active' : 'filters__button'}
            onClick={() => setActiveButton('Followed')}>
            Followed
          </motion.button>
          <motion.button
            animate={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.3 }}
            className={activeButton === 'Followers' ? 'filters__button active' : 'filters__button'}
            onClick={() => setActiveButton('Followers')}>
            Followers
          </motion.button>
        </section>
        <motion.div className="community__profiles" layout>
          {activeButton === 'All Developers' && (
            <AnimatePresence>
              {users
                .filter((user) => user.name.toLowerCase().includes(searchValue.toLowerCase()))
                .filter((user) => user.position.includes(developerPosition))
                .filter((user) => {
                  if (selectSkill[0] !== '') return user.skills.indexOf(selectSkill[0]) !== -1;
                  else return user;
                })
                .map((user) => (
                  <DevCard
                    key={user._id}
                    id={user._id}
                    name={user.name}
                    image={user.imageUrl}
                    position={user.position}
                    skills={user.skills}
                    langs={user.languages}
                    socials={user.socials}
                  />
                ))}
            </AnimatePresence>
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
        </motion.div>
      </div>
    </Layout>
  );
};

export default CommunityPage;
