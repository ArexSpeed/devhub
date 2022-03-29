import React from 'react'
import { useState } from 'react';
import { SearchIcon } from 'components/Icons/FontIcons';
import SkillsTags from 'components/SkillsTags';
import posts from 'data/posts'
import TitleSite from 'components/TitleSite';
import BlogCard from 'components/BlogCard';

export default function BlogPage() {
    const [searchValue, setSearchValue] = useState('');
    const [selectSkill, setSelectSkill] = useState([]);
  return (
    <div>
        <section className='blog__title'>
            <TitleSite title="Blog"/>
        </section>
        <section className='blog__container'>
            <div className="blog__searchbox">
                <div className="blog__searchbox-icon">
                    <SearchIcon className="icon-medium secondary-blue" />
                <input
                    type="text"
                    className="community__searchbox-input"
                    placeholder="Search Developer by name"
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
                    <button>Latests</button>
                    <button>Design</button>
                    <button>Frontend</button>
                    <button>Backend</button>
                </div>
                <div className="blog__cards">
                    
                    
                    {
                        posts.map((post) => (
                            <BlogCard                  
                    key = {post.postid}
                    {...post}                    
                    />
                        ))}

                </div>
            </div>
        </section>
    </div>
  )
}
