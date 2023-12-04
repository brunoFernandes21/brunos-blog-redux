import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserById } from "./usersSlice";
import { selectAllPosts } from "../posts/postsSlice";

const UserPage = () => {
  const { userId } = useParams();

  const user = useSelector((state) => selectUserById(state, Number(userId)));
  const postsPerUser = useSelector(selectAllPosts).filter(
    (post) => post.userId === Number(userId)
  );

  const postTitles = postsPerUser.map((post) => {
    return (
      <Link key={post.id} to={`/posts/${post.id}`}>
        <li className="flex justify-start font-bold bg-white rounded-md p-2 shadow-sm shadow-white transition-all duration-500 ease-in-out hover:scale-110">
          {post.title.charAt(0).toUpperCase() + post.title.slice(1)}
        </li>
      </Link>
    );
  });

  return (
    <section className="max-w-[1120px] mx-auto flex flex-col gap-5">
      <h2 className="text-white font-bold">Posts by {user.name}</h2>
      <ul className="flex flex-col gap-2">{postTitles}</ul>
    </section>
  );
};

export default UserPage;
