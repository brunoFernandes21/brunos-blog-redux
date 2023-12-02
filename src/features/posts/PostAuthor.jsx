import { useSelector } from "react-redux";
import { getSingleUser } from "../users/usersSlice";

const PostAuthor = ({ userId }) => {
  const author = useSelector((state) => getSingleUser(state, userId))
  return (
    <span>
      {author ? author.name : "Unknown author"}
    </span>
  );
};

export default PostAuthor;
