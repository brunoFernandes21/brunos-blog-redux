import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postAdded } from "./postsSlice";
import { allUsers } from "../users/usersSlice";

export const AddPostForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    userId: "",
  });

  const dispatch = useDispatch();
  const users = useSelector(allUsers);

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
    const userId = formData.userId;
    if (title && content) {
      dispatch(postAdded(title, content, userId));
      setFormData({ title: "", content: "", userId: "" });
    }
  };

  const formIsValid = Boolean(formData.title) && Boolean(formData.content);

  const userOptions = users.map((user) => (
    <option key={user.id} value={user.id}>{user.name}</option>
  ));
  return (
    <section className="form__section bg-white text-slate-900">
      <h3 className="text-xl font-bold">Add a New Post</h3>
      <form onSubmit={handleSubmit} className="">
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
        <div className="w-[230px]">
          <label htmlFor="postAuthor">Author</label>
          <select name="userId" id="postAuthor" value={formData.userId} onChange={handleChange}>
            <option value="">--Choose an author--</option>
            {userOptions}
          </select>
        </div>
        <button
          disabled={!formIsValid}
          className={`${
            formIsValid ? "text-white bg-blue-600" : "bg-gray-300"
          }`}
        >
          Add Post
        </button>
      </form>
    </section>
  );
};
