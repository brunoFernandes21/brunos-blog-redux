import { PostsList } from "../features/posts/PostsList";
import { AddPostForm } from "../features/posts/AddPostForm";

export const Home = () => {
  return (
    <section>
      <AddPostForm />
      <PostsList />
    </section>
  );
};
