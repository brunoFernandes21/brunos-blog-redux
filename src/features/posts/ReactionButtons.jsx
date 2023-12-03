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
      <article key={name}>
        <button
        className="mt-2 border border-slate-300 rounded py-1 px-2 md:py-1 md:px-3"
        type="button"
        onClick={() =>
          dispatch(reactionAddedAndRemoved({ postId: post.id, reaction: name }))
        }
      >
        <p className="text-sm md:text-base">{emoji} {post.reactions[name]}</p>
      </button>
      </article>
    );
  });

  return <section className="flex justify-start items-center gap-2 md:gap-6">{reactionButtons}</section>;
};

export default ReactionButtons;
