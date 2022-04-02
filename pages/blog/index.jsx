import { useState } from 'react';
import { SearchIcon } from 'components/Icons/FontIcons';
import SkillsTags from 'components/SkillsTags';
import posts from 'data/posts.json';
import TitleBox from 'components/TitleBox';
import BlogCard from 'components/BlogCard';

const BlogPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const [selectSkill, setSelectSkill] = useState([]);
  return (
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
        <button className="blog__filters-button active">Latests</button>
        <button className="blog__filters-button">Design</button>
        <button className="blog__filters-button">Frontend</button>
        <button className="blog__filters-button">Backend</button>
      </section>
      <div className="blog__cards">
        {posts.map((post) => (
          <BlogCard
            key={post.postid}
            postid={post.postid}
            title={post.title}
            excerpt={post.excerpt}
            userimage={post.userimage}
            username={post.username}
            likes={post.likes}
            comments={post.comments}
          />
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
