import { useDispatch, useSelector } from "react-redux";
import { postUpdated } from "./postsSlice";
import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  getPostById,

} from "./postsSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const EditPostForm = () => {
  const { postId } = useParams();

  const dispatch = useDispatch();
  let navigate = useNavigate();

  //get the right post from store based on the postId
  const post = useSelector((state) => getPostById(state, Number(postId)));

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
    if (formIsValid) {
      dispatch(postUpdated({ id: postId, title, content }));
      navigate(`/posts/${post.id}`);
    }
  };

  const formIsValid = [formData.title, formData.content].every(Boolean);
   
  if(!post) {
    return (
      <section className="flex justify-center items-center flex-col gap-4">
        <h2 className="text-white font-bold text-4xl">Post not found</h2>
        <Link to="/" className="text-blue-800 bg-white p-2 rounded font-bold">
          Go back to home
        </Link>
      </section>
    );
  }

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
            placeholder="Update post title"
          />
        </div>
        <div>
          <label htmlFor="content">Content</label>
          <textarea
            name="content"
            value={formData.content}
            placeholder=""
            onChange={handleChange}
          ></textarea>
        </div>
        <button
          disabled={!formIsValid}
          className={`font-bold border border-slate-300 p-2 rounded  transition-all ease-in-out duration-500 ${
            formIsValid ? "text-white bg-blue-600" : "bg-gray-300"
          }`}
        >
          Update Post
        </button>
      </form>
    </section>
  );
};
