import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewPost } from "./postsSlice";
import { getAllUsers } from "../users/usersSlice";

export const AddPostForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    userId: "",
  });
  const [addRequestStatus, setAddRequestStatus] = useState("idle")

  const dispatch = useDispatch();
  const users = useSelector(getAllUsers);

  const handleChange = (event) => {
    const { value, name } = event.target;
    setFormData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const formIsValid = [formData.title, formData.content, formData.userId].every(Boolean) && addRequestStatus === "idle";

  const handleSubmit = (event) => {
    event.preventDefault();
    const title = formData.title;
    const content = formData.content;
    const userId = formData.userId;
    if(formIsValid) {
      try {
        setAddRequestStatus("pending")
        dispatch(addNewPost({ title, body: content, userId })).unwrap();
        setFormData({ title: "", content: "", userId: "" });
      } catch (error) {
        console.error("Failed to save post", error);
      } finally {
        setAddRequestStatus("idle")
      }
      
    }
  };


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
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="What's on your mind?"
          />
        </div>
        <div>
          <label htmlFor="postAuthor">Author</label>
          <select name="userId" id="postAuthor" value={formData.userId} onChange={handleChange}>
            <option value=""></option>
            {userOptions}
          </select>
        </div>
        <div>
          <label htmlFor="content">Content</label>
          <textarea
          id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
          ></textarea>
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
