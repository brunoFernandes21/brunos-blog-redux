import PostAuthor from "./PostAuthor";
import ReactionButtons from "./ReactionButtons";
import TimeAgo from "./TimeAgo";
import { Link } from "react-router-dom";

const PostsData = ({ post }) => {
  const { id, userId, body, title, date } = post;
  return (
    <article key={id} className="single__post text-slate-900">
      <h3 className="font-bold text-lg">
        {title.charAt(0).toUpperCase() + title.slice(1)}
      </h3>
      <p className="mt-2">{body.substring(0, 100)}</p>
      <p className="mt-2">
        By: <PostAuthor userId={userId} />
      </p>
      <p className="mt-2">
        Created: {date ? <TimeAgo timestamp={date} /> : "Unknow Date"}
      </p>
      <ReactionButtons post={post} />
      <button className="font-bold border border-slate-300 p-2 mt-2 rounded hover:bg-blue-700 hover:text-white transition-all ease-in-out duration-500">
        <Link to={`/posts/${id}`}>View Post</Link>
      </button>
    </article>
  );
};

export default PostsData;
