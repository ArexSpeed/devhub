import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const UserTags = ({ posts, selectAuthor, setSelectAuthor }) => {
  const [authors, setAuthors] = useState([]);
  const toggleAuthor = (author) => {
    selectAuthor === author ? setSelectAuthor('') : setSelectAuthor(author);
    console.log(author, selectAuthor);
  };

  useEffect(() => {
    const unique = posts.filter(
      (post, i) => posts.findIndex((obj) => obj.username === post.username) === i
    );
    setAuthors(unique);
  }, [posts]);

  return (
    <div className="skillstags">
      {authors.map((author, i) => (
        <motion.button
          animate={{ opacity: 1, scale: 1 }}
          initial={{ opacity: 0, scale: 0 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut', delay: i / 50 }}
          key={i}
          className={`skillstags__button ${selectAuthor === author.username ? 'active' : ''}`}
          onClick={() => toggleAuthor(author.username)}>
          <div className="skillstags__image">
            <img src={author.userimage} alt="" />
          </div>
          <span>{author.username.split(' ').slice(0, -1)}</span>
        </motion.button>
      ))}
    </div>
  );
};

export default UserTags;
