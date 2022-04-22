import { getPosts, getPost } from 'services/posts/getPosts';
import PostCard from 'components/PostCard';
import Layout from 'components/Layout';

export async function getStaticPaths() {
  const posts = await getPosts();
  const paths = posts.map((post) => ({
    params: { id: post._id.toString() }
  }));

  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const post = await getPost(params.id);
  //console.log(post, 'getpost');
  return { revalidate: 30, props: { postProp: JSON.stringify(post) } };
}

export default function Post({ postProp }) {
  const post = JSON.parse(postProp);
  return (
    <Layout>
      <div className="blog">
        <PostCard
          postid={post?._id}
          image={post?.image}
          title={post?.title}
          excerpt={post?.excerpt}
          content={post?.content}
          username={post?.username}
          userimage={post?.userimage}
        />
      </div>
    </Layout>
  );
}
