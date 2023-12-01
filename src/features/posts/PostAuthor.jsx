import { useSelector } from "react-redux";
import { getAllUsers} from "../users/usersSlice";

const PostAuthor = ({ userId }) => {
  const author = useSelector(getAllUsers).find((user) => user.id === userId);

  return (
    <span>
      {author ? author.name : "Unknown author"}
    </span>
  );
};

export default PostAuthor;
