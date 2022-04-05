import { useState } from 'react';
import { SearchIcon } from 'components/Icons/FontIcons';
import SkillsTags from 'components/SkillsTags';
import TitleBox from 'components/TitleBox';
import projects from 'data/projects.json';
import ProjectCard from 'components/ProjectCard';
import Layout from 'components/Layout';

const ProjectPage = () => {
  const [activeButton, setActiveButton] = useState('All projects');
  const [searchValue, setSearchValue] = useState('');
  const [selectSkill, setSelectSkill] = useState(['']);
  const userid = 2; //temporary user id

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
        <section className="projects__searchcontainer">
          <div className="projects__searchbox">
            <div className="projects__searchbox-icon">
              <SearchIcon className="icon-medium secondary-blue" />
            </div>
            <input
              type="text"
              className="projects__searchbox-input"
              placeholder="Search project by name"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        </section>
        <p>Find project by tags</p>
        <section className="projects__tags">
          <SkillsTags selectSkill={selectSkill} setSelectSkill={setSelectSkill} />
        </section>
        <section className="community__buttons">
          <button
            className={
              activeButton === 'All projects' ? 'community__button active' : 'community__button'
            }
            onClick={() => setActiveButton('All projects')}>
            All projects
          </button>
          <button
            className={
              activeButton === 'Your projects' ? 'community__button active' : 'community__button'
            }
            onClick={() => setActiveButton('Your projects')}>
            Your projects
          </button>
          <button
            className={
              activeButton === 'Favorite' ? 'community__button active' : 'community__button'
            }
            onClick={() => setActiveButton('Favorite')}>
            Favorite
          </button>
        </section>

        <section className="projects__profiles">
          {activeButton === 'All projects' && (
            <>
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
            </>
          )}

          {/* //Your projects */}

          {activeButton === 'Your projects' && (
            <>
              {projects
                .filter((project) => project.userid === userid)
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
            </>
          )}
          {/* Favorite */}
          {activeButton === 'Favorite' && (
            <>
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
            </>
          )}
        </section>
      </div>
    </Layout>
  );
};

export default ProjectPage;
