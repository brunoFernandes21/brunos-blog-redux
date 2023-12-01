import { useDispatch, useSelector } from "react-redux";
import { postUpdated } from "./postsSlice";
import { useEffect, useState } from "react";
import { useMatch } from "react-router-dom";
import {
  getAllPosts,
  getPostStatus,
  getPostError,
  fetchPosts,
} from "./postsSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const EditPostForm = () => {
  const match = useMatch("/edit-post/:postId");
  const { postId } = match.params;

  const dispatch = useDispatch();
  let navigate = useNavigate();

  //find the post in state with the same id as the parameter
  const post = useSelector(getAllPosts).find(
    (post) => post.id === Number(postId)
  );
  const postStatus = useSelector(getPostStatus);
  const error = useSelector(getPostError);
  //get posts from redux store to display on screen
  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  const [formData, setFormData] = useState({
    title: post.title,
    content: post.body,
  });

  const handleChange = (event) => {
    const { value, name } = event.target;
    setFormData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const updatePost = (event) => {
    event.preventDefault();
    const title = formData.title;
    const content = formData.content;
    if (title && content) {
      dispatch(postUpdated({ id: postId, title, content }));
      navigate(`/posts/${post.id}`);
    }
  };

  const formIsValid = Boolean(formData.title) && Boolean(formData.content);

  if (postStatus === "loading") {
    return <p>Loading</p>;
  } else if (postStatus === "succeeded") {
    return (
      <section className="p-4 rounded mx-auto lg:w-[50%] bg-white text-slate-900">
        <h3 className="text-xl font-bold">Add a New Post</h3>
        <form onSubmit={updatePost}>
          <div>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="post title..."
            />
          </div>
          <div>
            <label htmlFor="content">Content</label>
            <textarea
              name="content"
              value={formData.content}
              placeholder="post content..."
              onChange={handleChange}
            ></textarea>
          </div>
          <button
            disabled={!formIsValid}
            className={`py-3 px-5 font-bold rounded-md ${
              formIsValid ? "text-white bg-blue-600" : "bg-gray-300"
            }`}
          >
            Update Post
          </button>
        </form>
      </section>
    );
  } else if (postStatus === "failed") {
    return (
      <section className="flex justify-center items-center flex-col gap-4">
        <h2 className="text-white font-bold text-4xl">Post not found</h2>
        <Link to="/" className="text-blue-800 bg-white p-2 rounded font-bold">
          Go back to home
        </Link>
      </section>
    );
  }
};
