import { useSelector } from "react-redux";
import { useMatch } from "react-router-dom";
import { Link } from "react-router-dom";
import { allPosts } from "./postsSlice";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

export const SinglePostPage = () => {
  //get the id from matched url from router (useMatch)
  const match = useMatch("/posts/:postId");
  const { postId } = match.params;

  //find the post in state with the same id as the parameter
  const post = useSelector(allPosts).find((post) => post.id === postId);

  if (!post) {
    return (
      <section className="flex justify-center items-center flex-col gap-4">
        <h2 className="text-white font-bold text-4xl">Post not found</h2>
        <Link to="/" className="text-blue-800 bg-white p-2 rounded font-bold">
          Go back to home
        </Link>
      </section>
    );
  }

  return (
    <section className="max-w-[1120px] mx-auto">
      <article className="single__post mb-8 text-slate-900">
        <h2 className="font-bold text-lg">{post.title}</h2>
        <p className="mt-2">{post.content}</p>
        <p className="mt-2">
          Created: <TimeAgo timestamp={post.date} />
        </p>
        <p className="mt-2">
          Author: <PostAuthor userId={post.user} />
        </p>
        <ReactionButtons post={post} />
        <button className="font-bold border border-slate-300 p-2 mt-2 rounded hover:bg-blue-700 hover:text-white transition-all ease-in-out duration-500">
          <Link to={`/editPost/${post.id}`}>Edit Post</Link>
        </button>
      </article>
      <Link
        to="/"
        className="text-white border border-white p-2 rounded font-bold"
      >
        Go back to home
      </Link>
    </section>
  );
};
