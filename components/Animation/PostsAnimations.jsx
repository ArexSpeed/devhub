import React from 'react';
import posts from 'data/posts.json';
import BlogCard from 'components/BlogCard';

const PostsAnimations = () => {
  return (
    <div className="animations">
      {posts.map((post) => (
        <div key={post.postid} className="card horizontal">
          <BlogCard
            postid={post.postid}
            userimage={post.userimage}
            username={post.username}
            image={post.image}
            title={post.title}
            excerpt={post.excerpt}
            likes={post.likes}
            comments={post.comments}
          />
        </div>
      ))}
    </div>
  );
};

export default PostsAnimations;
