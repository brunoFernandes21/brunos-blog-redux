import { PostsList } from "../features/posts/PostsList";
import { AddPostForm } from "../features/posts/AddPostForm";

export const Home = () => {
  return (
    <section className="home">
      <PostsList />
      <AddPostForm />
    </section>
  );
};
