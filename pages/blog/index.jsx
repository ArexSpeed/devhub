import React from 'react';
import { useState } from 'react';
import { SearchIcon } from 'components/Icons/FontIcons';
import SkillsTags from 'components/SkillsTags';
import posts from 'data/posts';
import TitleBox from 'components/TitleBox';
import BlogCard from 'components/BlogCard';

export default function BlogPage() {
  const [searchValue, setSearchValue] = useState('');
  const [selectSkill, setSelectSkill] = useState([]);
  return (
    <div>
      <section className="blog__title">
        <TitleBox title="Blog" />
        <a href="blog/add">
          <div className="blog__add-button">
            <button className="form__button" type="button">
              Add new article
            </button>
          </div>
        </a>
      </section>
      <section className="blog__container">
        <div className="community__searchbox">
          <div className="community__searchbox-icon">
            <SearchIcon className="icon-medium secondary-blue" />
            <input
              type="text"
              className="community__searchbox-input"
              placeholder="Search Post by name"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        </div>
        <p>Find article by tags</p>
        <section className="community__tags">
          <SkillsTags selectSkill={selectSkill} setSelectSkill={setSelectSkill} />
        </section>
        <div className="blog__content">
          <div className="blog__filters">
            <button className="blog__button">Latests</button>
            <button className="blog__button">Design</button>
            <button className="blog__button">Frontend</button>
            <button className="blog__button">Backend</button>
          </div>
          <div className="blog__cards">
            {posts.map((post) => (
              <BlogCard key={post.postid} {...post} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
