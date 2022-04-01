import { useState, useEffect } from 'react';
import { SearchIcon } from 'components/Icons/FontIcons';
import SkillsTags from 'components/SkillsTags';
import TitleBox from 'components/TitleBox';
import DevCard from 'components/DevCard';
import projects from 'data/projects.json';
import follows from 'data/usersFollow.json';
import ProjectCard from 'components/ProjectCard'

const ProjectPage = () => {
	const [activeButton, setActiveButton] = useState('All projects');
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
		<div className="projects">
			<section className="projects__title">
				<TitleBox title="Projects from our developers" />
				<div>
					<button className='projects__title-btn'>Add new project</button>
				</div>
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
					className={activeButton === 'Your projects' ? 'community__button active' : 'community__button'}
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
							.filter((project) => project.title.toLowerCase().includes(searchValue.toLowerCase()))
							.map((project) => (
								<ProjectCard
									projectid={project.projectid}
									title={project.title}
									userid={project.userid}
									username={project.username}
									userimage={project.userimage}
									logo={project.logo}
									description={project.description}
									technology={project.technology}
									likes={project.likes}
								/>
							))}
					</>
				)}

				{/* //Your projects */}

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
				{/* Favorite */}
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

export default ProjectPage;
