import { useSelector } from "react-redux";
import { allUsers } from "../users/usersSlice";

const PostAuthor = ({ userId }) => {
  const author = useSelector(allUsers).find((user) => user.id === userId);
  return (
    <span>
      {author ? author.name : "Unknown author"}
    </span>
  );
};

export default PostAuthor;
