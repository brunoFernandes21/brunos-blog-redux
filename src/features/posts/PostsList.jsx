import { useSelector } from "react-redux";
import { allPosts } from "./postsSlice";

export const PostsList = () => {
  const posts = useSelector(allPosts);

  const renderedPosts = posts.map((post) => (
    <article key={post.id} className="single__post">
      <h3 className="font-bold">{post.title}</h3>
      <p>{post.content.substring(0, 100)}</p>
    </article>
  ));

  return (
    <section className="post__section">
      <h2 className="font-bold text-xl text-white">Posts</h2>
      {renderedPosts}
    </section>
  );
};
