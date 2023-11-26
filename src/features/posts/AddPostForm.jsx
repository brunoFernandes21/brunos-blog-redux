import { useState } from "react";
import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { postAdded } from "./postsSlice";

export const AddPostForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { value, name } = event.target;
    setFormData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const title = formData.title;
    const content = formData.content;
    if (title && content) {
      dispatch(
        postAdded({
          id: nanoid(),
          title,
          content,
        })
      );
      setFormData({ title: "", content: "" });
    }
  };

  const formIsValid = Boolean(formData.title) && Boolean(formData.content);
  return (
    <section className="form__section mx-auto lg:w-[50%]">
      <h3 className="text-xl font-bold">Add a New Post</h3>
      <form onSubmit={handleSubmit}>
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
          className={`${
            formIsValid ? "text-blue-600 bg-white" : "bg-gray-300"
          }`}
        >
          Add Post
        </button>
      </form>
    </section>
  );
};
