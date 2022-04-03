import PostCard from 'components/PostCard';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import posts from 'data/posts.json';

export default function Post() {
  const [post, setPost] = useState();
  const router = useRouter();
  useEffect(() => {
    const findPost = posts.find((post) => post.postid === router.query.postid);
    setPost(findPost);
  }, []);

  return (
    <div className="blog">
      <PostCard title={post?.title} excerpt={post?.excerpt} username={post?.username} />
    </div>
  );
}
