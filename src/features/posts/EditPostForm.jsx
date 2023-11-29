import { useDispatch, useSelector } from "react-redux";
import { postUpdated } from "./postsSlice";
import { useState } from "react";
import { useMatch } from "react-router-dom";
import { allPosts } from "./postsSlice";
import { useNavigate } from "react-router-dom";

export const EditPostForm = () => {
  const match = useMatch("/editPost/:postId");
  const { postId } = match.params;

  const dispatch = useDispatch();
  let navigate = useNavigate()

  //find the post in state with the same id as the parameter
  const post = useSelector(allPosts).find((post) => post.id === postId);

  const [formData, setFormData] = useState({
    title: post.title,
    content: post.content,
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
    const title = formData.title
    const content = formData.content
    if(title && content) {
        dispatch(postUpdated({id: postId, title, content}))
        navigate(`/posts/${post.id}`)
    }
  };

  const formIsValid = Boolean(formData.title) && Boolean(formData.content)

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
          Add Post
        </button>
      </form>
    </section>
  );
};
