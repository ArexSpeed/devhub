import { useState, useEffect } from 'react';
import { SearchIcon } from 'components/Icons/FontIcons';
import axios from 'axios';
import SkillsTags from 'components/SkillsTags';
import TitleBox from 'components/TitleBox';
import BlogCard from 'components/BlogCard';
import Layout from 'components/Layout';

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [selectSkill, setSelectSkill] = useState([]);
  const [postCategory, setPostCategory] = useState('');

  useEffect(async () => {
    const getPosts = await axios.get('/api/posts');
    setPosts(getPosts.data);
  }, []);
  return (
    <Layout>
      <div className="blog">
        <section className="blog__title">
          <TitleBox title="Blog" button="Add new article" href="/blog/add" />
        </section>
        <section className="projects__searchcontainer">
          <div className="projects__searchbox">
            <div className="projects__searchbox-icon">
              <SearchIcon className="icon-medium secondary-blue" />
            </div>
            <input
              type="text"
              className="projects__searchbox-input"
              placeholder="Search article by title"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        </section>
        <p>Find article by tags</p>
        <section className="community__tags">
          <SkillsTags selectSkill={selectSkill} setSelectSkill={setSelectSkill} />
        </section>
        <section className="blog__filters">
          <button
            className={`blog__filters-button ${postCategory === '' && 'active'}`}
            onClick={() => setPostCategory('')}>
            Latests
          </button>
          <button
            className={`blog__filters-button ${postCategory === 'Design' && 'active'}`}
            onClick={() => setPostCategory('Design')}>
            Design
          </button>
          <button
            className={`blog__filters-button ${postCategory === 'Frontend' && 'active'}`}
            onClick={() => setPostCategory('Frontend')}>
            Frontend
          </button>
          <button
            className={`blog__filters-button ${postCategory === 'Backend' && 'active'}`}
            onClick={() => setPostCategory('Backend')}>
            Backend
          </button>
        </section>
        <div className="blog__cards">
          {posts
            .filter(
              (post) =>
                post.title.toLowerCase().includes(searchValue.toLowerCase()) ||
                post.username.toLowerCase().includes(searchValue.toLowerCase())
            )
            .filter((post) => post.category.includes(postCategory))
            .map((post) => (
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

export default BlogPage;
