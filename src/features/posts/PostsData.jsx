import PostAuthor from "./PostAuthor";
import ReactionButtons from "./ReactionButtons";
import TimeAgo from "./TimeAgo";
import { Link } from "react-router-dom";

import { selectPostsById } from "./postsSlice";
import { useSelector } from "react-redux";


const PostsData = ({ postId }) => {

  const post = useSelector((state) => selectPostsById(state, postId))
  const { id, userId, title, date, body } = post;
  return (
    <article className="p-5 rounded-md shadow-md shadow-white bg-white text-slate-900">
      <h3 className="font-bold text-lg">
        {title.charAt(0).toUpperCase() + title.slice(1)}
      </h3>
      <p className="italic text-sm md:text-base">
        by <PostAuthor userId={userId} /> .{" "}
        {date ? <TimeAgo timestamp={date} /> : "Unknow Date"}
      </p>
      <p className="mt-2">{body.substring(0, 150)}</p>
      <ReactionButtons post={post} />
      <button className="font-bold border border-slate-300 p-2 mt-2 rounded hover:bg-blue-700 hover:text-white transition-all ease-in-out duration-500">
        <Link to={`/posts/${id}`}>View Post</Link>
      </button>
    </article>
  );
};

export default PostsData;
