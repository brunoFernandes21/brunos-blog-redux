import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import TimeAgo from "./TimeAgo";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

import { selectPostsById, deletePost } from "./postsSlice";
import PostAuthor from "./PostAuthor";
import ReactionButtons from "./ReactionButtons";
import { useState } from "react";

export const SinglePostPage = () => {
  //get the id from matched url from router (useParams)
  const { postId } = useParams();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [addRequestStatus, setAddRequestStatus] = useState("idle")

  // use the selector to get post by id from store
  const post = useSelector((state) => selectPostsById(state, Number(postId)));

  const onDeletePost = () => {
    let text = "Are you sure you want to delete this post?"
    if(confirm(text) == true){
      try {
        setAddRequestStatus("pending")
        dispatch(deletePost({id: post.id})).unwrap()
      navigate("/")
      } catch (error) {
        console.error("Unable to delete post", error)
      } finally {
        setAddRequestStatus("idle")
      }
      
    }
  }

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
      <article className="mb-10 p-5 rounded-md shadow-md shadow-white bg-white   text-slate-900">
        <h2 className="font-bold text-lg">{post.title.charAt(0).toUpperCase() + post.title.slice(1)}</h2>
        <p className="italic">
          by <PostAuthor userId={post.userId} /> .{" "}
          <TimeAgo timestamp={post.date} />
        </p>
        <p className="mt-2">{post.body}</p>
        <ReactionButtons post={post} />
        <div className="flex items-center gap-6">
        <button className="mt-2 p-2 text-slate-500 hover:bg-blue-600 bg-blue-200 rounded-full hover:text-white transition-all ease-in-out duration-500">
          <Link to={`/posts/edit-post/${post.id}`}>
            <FaEdit className="text-2xl" />
          </Link>
        </button>
        <button onClick={onDeletePost} className="mt-2 p-2 text-slate-500 bg-red-200 hover:bg-red-600 rounded-full hover:text-white transition-all ease-in-out duration-500">
          <FaTrashAlt className="text-2xl"/>
        </button>
        </div>
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
