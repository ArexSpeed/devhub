import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/client';
import axios from 'axios';
import SkillsTags from 'components/SkillsTags';
import TitleBox from 'components/TitleBox';
import BlogCard from 'components/BlogCard';
import Layout from 'components/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import SearchBox from 'components/SearchBox';

const BlogPage = () => {
  const [session, loading] = useSession();
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
          <TitleBox title="Blog" button="Add new article" href="/blog/add" session={session} />
        </section>
        <section className="searchbox__container">
          <SearchBox
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            placeholder="Find article by title"
          />
        </section>
        <p>Find article by tags</p>
        <section className="community__tags">
          <SkillsTags selectSkill={selectSkill} setSelectSkill={setSelectSkill} />
        </section>
        <section className="blog__filters">
          <motion.button
            animate={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.1 }}
            className={`blog__filters-button ${postCategory === '' && 'active'}`}
            onClick={() => setPostCategory('')}>
            Latests
          </motion.button>
          <motion.button
            animate={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.2 }}
            className={`blog__filters-button ${postCategory === 'Design' && 'active'}`}
            onClick={() => setPostCategory('Design')}>
            Design
          </motion.button>
          <motion.button
            animate={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.3 }}
            className={`blog__filters-button ${postCategory === 'Frontend' && 'active'}`}
            onClick={() => setPostCategory('Frontend')}>
            Frontend
          </motion.button>
          <motion.button
            animate={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.4 }}
            className={`blog__filters-button ${postCategory === 'Backend' && 'active'}`}
            onClick={() => setPostCategory('Backend')}>
            Backend
          </motion.button>
        </section>
        {loading ? (
          <motion.div layout className="blog__cards">
            Loading posts...
          </motion.div>
        ) : (
          <motion.div layout className="blog__cards">
            <AnimatePresence>
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
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </Layout>
  );
};

export default BlogPage;
