import { useSelector } from "react-redux";
import { getUserById } from "../users/usersSlice";

const PostAuthor = ({ userId }) => {
  const author = useSelector((state) => getUserById(state, userId))
  return (
    <span>
      {author ? author.name : "Unknown author"}
    </span>
  );
};

export default PostAuthor;
