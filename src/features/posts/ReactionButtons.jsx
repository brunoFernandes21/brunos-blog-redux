import { reactionAddedAndRemoved } from "./postsSlice";
import { useDispatch } from "react-redux";

const reactionEmoji = {
  thumbsUp: "👍🏽",
  thumbsDown: "👎🏽",
  heart: "❤️",
  party: "🎉",
  cool: "😎"
};

const ReactionButtons = ({ post }) => {
  const dispatch = useDispatch();
  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <div key={name} className="inline-block mx-1">
        <button
        className="mt-2 border border-slate-300 rounded py-1 px-3"
        type="button"
        onClick={() =>
          dispatch(reactionAddedAndRemoved({ postId: post.id, reaction: name }))
        }
      >
        {emoji} {post.reactions[name]}
      </button>
      </div>
    );
  });

  return <div>{reactionButtons}</div>;
};

export default ReactionButtons;
