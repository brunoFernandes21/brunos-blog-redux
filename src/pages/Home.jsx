import { PostsList } from "../features/posts/PostsList";
import { AddPostForm } from "../features/posts/AddPostForm";

export const Home = ({ showForm, setShowForm }) => {
  return (
    <section className="home">
      <PostsList />
      {showForm && <AddPostForm setShowForm={setShowForm} />}
    </section>
  );
};
