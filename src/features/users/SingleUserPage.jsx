import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserById } from "./usersSlice";
import { getAllPosts } from "../posts/postsSlice";
import PostsData from "../posts/PostsData";

const SingleUserPage = () => {
  const { userId } = useParams();

  const user = useSelector((state) => getUserById(state, Number(userId)));
  const posts = useSelector(getAllPosts).filter((post) => post.userId === Number(userId))

  const renderedPosts = posts.map((post) => {
    return <PostsData key={post.id} post={post} />
  })

  return (
    <section className="max-w-[1120px] mx-auto flex flex-col gap-5">
      <h2 className="text-white font-bold">Posts by {user.name}</h2>
      {renderedPosts}
    </section>
  );
};

export default SingleUserPage;
