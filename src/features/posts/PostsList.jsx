import { useSelector } from "react-redux";
import { allPosts } from "./postsSlice";
import { Link } from "react-router-dom"
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";

export const PostsList = () => {
  const posts = useSelector(allPosts);
  const renderedPosts = posts.map((post) => (
    <article key={post.id} className="single__post">
      <h3 className="font-bold">{post.title}</h3>
      <p>{post.content.substring(0, 100)}</p>
      <span>Created: {post.date ? <TimeAgo timestamp={post.date}/> : "Unknown Date"}</span>
      <p>Author: <PostAuthor userId={post.user}/></p>
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
