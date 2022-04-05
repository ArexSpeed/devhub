import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/client';
import axios from 'axios';
import TitleBox from 'components/TitleBox';
import ProfileCard from 'components/ProfileCard';
import SkillsIconSwitcher from 'components/IconSwitcher/SkillsIconSwitcher';
import Layout from 'components/Layout';
import ProjectCard from 'components/ProjectCard';
import BlogCard from 'components/BlogCard';

const ProfilePage = () => {
  const [session] = useSession();
  const [user, setUser] = useState({});
  const [projects, setProjects] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(async () => {
    if (session) {
      const data = await axios.get(`/api/user?id=${session.user.id}`);
      setUser(data.data);
      const userProjects = await axios.get('/api/projects');
      setProjects(userProjects.data);
      const userPosts = await axios.get('/api/posts');
      setPosts(userPosts.data);
    }
  }, [session]);
  return (
    <Layout>
      <div className="profile">
        <TitleBox button="Edit profile" href="/profile/edit" />
        <ProfileCard
          name={user.name}
          imageUrl={user.imageUrl}
          position={user.position}
          langs={user.languages}
          socials={user.socials}
          about={user.about}
        />
        <p>Skills</p>
        <div className="skillstags">
          {user?.skills?.map((skill, i) => (
            <button key={i} className="skillstags__button">
              <div>
                <SkillsIconSwitcher name={skill} className="icon-large primary-blue" />
              </div>
              <span>{skill}</span>
            </button>
          ))}
        </div>
        <p>Projects</p>
        <div className="profile__projects">
          {projects
            ?.filter((project) => project.userid === session.user.id)
            ?.map((project) => (
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
        </div>
        <p>Posts</p>
        <div className="blog__cards">
          {posts
            ?.filter((post) => post.userid === session.user.id)
            ?.map((post) => (
              <BlogCard
                key={post._id}
                postid={post._id}
                userimage={post.userimage}
                username={post.username}
                image={post.image}
                title={post.title}
                excerpt={post.excerpt}
                likes={post.likes}
                comments={post.comments}
              />
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
