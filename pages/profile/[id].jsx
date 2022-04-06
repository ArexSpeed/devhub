import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ProfileCard from 'components/ProfileCard';
import SkillsIconSwitcher from 'components/IconSwitcher/SkillsIconSwitcher';
import { getUser, getUsers } from 'services/users/getUser';
import Layout from 'components/Layout';
import BlogCard from 'components/BlogCard';
import ProjectCard from 'components/ProjectCard';
import axios from 'axios';

export async function getStaticPaths() {
  const users = await getUsers();
  const paths = users.map((user) => ({
    params: { id: user._id.toString() }
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const user = await getUser(params.id);
  return { revalidate: 30, props: { userProp: JSON.stringify(user) } };
}

const Profile = ({ userProp }) => {
  const router = useRouter();
  const user = JSON.parse(userProp);
  const [projects, setProjects] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(async () => {
    if (router) {
      const userProjects = await axios.get('/api/projects');
      setProjects(userProjects.data);
      const userPosts = await axios.get('/api/posts');
      setPosts(userPosts.data);
    }
  }, [router]);
  return (
    <Layout>
      {console.log(projects)}
      <div className="profile">
        <ProfileCard
          name={user?.name}
          imageUrl={user?.imageUrl}
          position={user?.position}
          langs={user?.languages}
          socials={user?.socials}
          about={user?.about}
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
            ?.filter((project) => project.userid === router.query.id)
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
            ?.filter((post) => post.userid === router.query.id)
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

export default Profile;
