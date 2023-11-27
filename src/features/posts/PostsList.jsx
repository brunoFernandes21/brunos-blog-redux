import { useSelector } from "react-redux";
import { allPosts } from "./postsSlice";
import { Link } from "react-router-dom"

export const PostsList = () => {
  const posts = useSelector(allPosts);

  const renderedPosts = posts.map((post) => (
    <article key={post.id} className="single__post">
      <h3 className="font-bold">{post.title}</h3>
      <p>{post.content.substring(0, 100)}</p>
      <Link to={`/posts/${post.id}`} className="font-bold underline">View Post</Link>
    </article>
  ));

  return (
    <section className="post__section">
      <h2 className="font-bold text-xl text-white">Posts</h2>
      {renderedPosts}
    </section>
  );
};
