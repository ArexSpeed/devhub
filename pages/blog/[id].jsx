import { getPosts, getPost } from 'services/posts/getPosts';
import PostCard from 'components/PostCard';

export async function getStaticPaths() {
  const posts = await getPosts();
  const paths = posts.map((post) => ({
    params: { id: post._id.toString() }
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const post = await getPost(params.id);
  console.log(post, 'getpost');
  return { props: { postProp: JSON.stringify(post) } };
}

export default function Post({ postProp }) {
  const post = JSON.parse(postProp);
  return (
    <div className="blog">
      <PostCard
        image={post?.image}
        title={post?.title}
        excerpt={post?.excerpt}
        content={post?.content}
        username={post?.username}
        userimage={post?.userimage}
      />
    </div>
  );
}
