import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/client';
import SkillsTags from 'components/SkillsTags';
import TitleBox from 'components/TitleBox';
import ProjectCard from 'components/ProjectCard';
import Layout from 'components/Layout';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import SearchBox from 'components/SearchBox';

const ProjectPage = () => {
  const [session] = useSession();
  const [activeButton, setActiveButton] = useState('All projects');
  const [searchValue, setSearchValue] = useState('');
  const [selectSkill, setSelectSkill] = useState(['']);
  const [projects, setProjects] = useState([]);

  useEffect(async () => {
    const getProjects = await axios.get('/api/projects');
    setProjects(getProjects.data);
  }, []);

  return (
    <Layout>
      <div className="projects">
        <section className="projects__title">
          <TitleBox
            title="Projects from our developers"
            button="Add new project"
            href="/projects/add"
          />
        </section>
        <section className="searchbox__container">
          <SearchBox
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            placeholder="Find project by name"
          />
        </section>
        <p>Find project by tags</p>
        <section className="projects__tags">
          <SkillsTags selectSkill={selectSkill} setSelectSkill={setSelectSkill} />
        </section>
        <section className="filters">
          <motion.button
            animate={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.1 }}
            className={
              activeButton === 'All projects' ? 'filters__button active' : 'filters__button'
            }
            onClick={() => setActiveButton('All projects')}>
            All projects
          </motion.button>
          <motion.button
            animate={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.2 }}
            className={
              activeButton === 'Your projects' ? 'filters__button active' : 'filters__button'
            }
            onClick={() => setActiveButton('Your projects')}>
            Your projects
          </motion.button>
          <motion.button
            animate={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.3 }}
            className={activeButton === 'Favorite' ? 'filters__button active' : 'filters__button'}
            onClick={() => setActiveButton('Favorite')}>
            Favorite
          </motion.button>
        </section>

        <motion.section layout className="projects__cards">
          {activeButton === 'All projects' && (
            <AnimatePresence>
              {projects
                .filter((project) =>
                  project.title.toLowerCase().includes(searchValue.toLowerCase())
                )
                .filter((project) => {
                  if (selectSkill[0] !== '')
                    return project.technology.indexOf(selectSkill[0]) !== -1;
                  else return project;
                })
                .map((project) => (
                  <ProjectCard
                    key={project.projectid}
                    projectid={project.projectid}
                    title={project.title}
                    userid={project.userid}
                    username={project.username}
                    userimage={project.userimage}
                    logo={project.logo}
                    link={project.link}
                    description={project.description}
                    technology={project.technology}
                    likes={project.likes}
                  />
                ))}
            </AnimatePresence>
          )}

          {/* //Your projects */}

          {activeButton === 'Your projects' && (
            <AnimatePresence>
              {projects
                .filter((project) => project.userid === session.user.id)
                .filter((project) =>
                  project.title.toLowerCase().includes(searchValue.toLowerCase())
                )
                .map((project) => (
                  <ProjectCard
                    key={project.projectid}
                    projectid={project.projectid}
                    title={project.title}
                    userid={project.userid}
                    username={project.username}
                    userimage={project.userimage}
                    logo={project.logo}
                    link={project.link}
                    description={project.description}
                    technology={project.technology}
                    likes={project.likes}
                  />
                ))}
            </AnimatePresence>
          )}
          {/* Favorite */}
          {activeButton === 'Favorite' && (
            <AnimatePresence>
              {projects
                .filter((project) =>
                  project.title.toLowerCase().includes(searchValue.toLowerCase())
                )
                .map((project) => (
                  <ProjectCard
                    key={project.projectid}
                    projectid={project.projectid}
                    title={project.title}
                    userid={project.userid}
                    username={project.username}
                    userimage={project.userimage}
                    logo={project.logo}
                    link={project.link}
                    description={project.description}
                    technology={project.technology}
                    likes={project.likes}
                  />
                ))}
            </AnimatePresence>
          )}
        </motion.section>
      </div>
    </Layout>
  );
};

export default ProjectPage;
