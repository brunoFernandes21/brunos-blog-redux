import { useSelector } from "react-redux";
import { allPosts } from "./postsSlice";
import { Link } from "react-router-dom";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

export const PostsList = () => {
  const posts = useSelector(allPosts);
  // Sort posts in reverse chronological order by datetime string
  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));

  const renderedPosts = orderedPosts.map((post) => (
    <article key={post.id} className="single__post text-slate-900">
      <h3 className="font-bold text-lg">{post.title}</h3>
      <p className="mt-2">{post.content.substring(0, 100)}</p>
      <p className="mt-2">
        By: <PostAuthor userId={post.user} />
      </p>
      <p className="mt-2">
        Created: {post.date ? <TimeAgo timestamp={post.date} /> : "Unknow Date"}
      </p>
      <ReactionButtons post={post} />
      <button className="font-bold border border-slate-300 p-2 mt-2 rounded hover:bg-blue-700 hover:text-white transition-all ease-in-out duration-500">
        <Link to={`/posts/${post.id}`}>View Post</Link>
      </button>
    </article>
  ));

  return (
    <section className="post__section">
      <h2 className="font-bold text-xl text-white">Posts</h2>
      {renderedPosts}
    </section>
  );
};
