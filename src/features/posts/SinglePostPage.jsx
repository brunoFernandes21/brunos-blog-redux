import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import TimeAgo from "./TimeAgo";

import {
  getPostById
} from "./postsSlice";
import PostAuthor from "./PostAuthor";
import ReactionButtons from "./ReactionButtons";

export const SinglePostPage = () => {
  //get the id from matched url from router (useParams)
  const { postId } = useParams();

  // use the selector to get post by id from store
  const post = useSelector((state) => getPostById(state, Number(postId)))

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
        <p className="mt-2">{post.body}</p>
        <p className="mt-2">
          <TimeAgo timestamp={post.date} />
        </p>
        <p className="mt-2">
          Author: <PostAuthor userId={post.userId} />
        </p>
        <ReactionButtons post={post} />
        <button className="font-bold border border-slate-300 p-2 mt-2 rounded hover:bg-blue-700 hover:text-white transition-all ease-in-out duration-500">
          <Link to={`/posts/edit-post/${post.id}`}>Edit Post</Link>
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
