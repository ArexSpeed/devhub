import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/client';
import SkillsTags from 'components/SkillsTags';
import TitleBox from 'components/TitleBox';
import DevCard from 'components/DevCard';
import axios from 'axios';
import Layout from 'components/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import SearchBox from 'components/SearchBox';

const CommunityPage = () => {
  // eslint-disable-next-line no-unused-vars
  const [session, loading] = useSession();
  const [currentUserData, setCurrentUserData] = useState({});
  const [users, setUsers] = useState([]);
  const [activeButton, setActiveButton] = useState('All Developers');
  const [developerPosition, setDeveloperPosition] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [selectSkill, setSelectSkill] = useState(['']);

  useEffect(async () => {
    const data = await axios.get('/api/users');
    setUsers(data.data);
  }, [activeButton]);

  useEffect(() => {
    const currentUser = users.find((user) => user._id === session?.user.id);
    if (currentUser) setCurrentUserData(currentUser);
  }, [users]);

  return (
    <Layout>
      <div className="community">
        {console.log(currentUserData)}
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
        {loading ? (
          <motion.div className="community__profiles" layout>
            Loading community...
          </motion.div>
        ) : (
          <motion.div className="community__profiles" layout>
            {activeButton === 'All Developers' && (
              <AnimatePresence>
                {users
                  .filter((user) => user._id !== session?.user.id)
                  .filter((user) => user.name?.toLowerCase().includes(searchValue.toLowerCase()))
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
                      followed={user.followed}
                      followers={user.followers}
                      currentUserFollowed={currentUserData.followed}
                    />
                  ))}
              </AnimatePresence>
            )}
            {activeButton === 'Followed' &&
              (session ? (
                <AnimatePresence>
                  {users
                    .filter((user) => currentUserData.followed?.indexOf(user._id) !== -1)
                    .filter((user) => user.position.includes(developerPosition))
                    .filter((user) => user.name.includes(searchValue))
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
                        followed={user.followed}
                        followers={user.followers}
                        currentUserFollowed={currentUserData.followed}
                      />
                    ))}
                </AnimatePresence>
              ) : (
                <p>Please login to see your followed users</p>
              ))}
            {activeButton === 'Followers' &&
              (session ? (
                <AnimatePresence>
                  {users
                    .filter((user) => currentUserData.followers?.indexOf(user._id) !== -1)
                    .filter((user) => user.position.includes(developerPosition))
                    .filter((user) => user.name.includes(searchValue))
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
                        followed={user.followed}
                        followers={user.followers}
                        currentUserFollowed={currentUserData.followed}
                      />
                    ))}
                </AnimatePresence>
              ) : (
                <p>Please login to see your followers users</p>
              ))}
          </motion.div>
        )}
      </div>
    </Layout>
  );
};

export default CommunityPage;
