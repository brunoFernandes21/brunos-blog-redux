import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import { getPostById } from "./postsSlice";
import { updatePost } from "./postsSlice";
import { getAllUsers } from "../users/usersSlice";

export const EditPostForm = () => {
  const { postId } = useParams();

  const dispatch = useDispatch();
  let navigate = useNavigate();

  //get the right post from store based on the postId
  const post = useSelector((state) => getPostById(state, Number(postId)));
  //get all users to display on the update form
  const users = useSelector(getAllUsers);

  const [formData, setFormData] = useState({
    title: post.title,
    content: post.body,
    userId: post.userId,
  });
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const handleChange = (event) => {
    const { value, name } = event.target;
    setFormData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const canSave = () => {
    const title = formData.title;
    const content = formData.content;
    const userId = Number(formData.userId);
    let isValid = false;
    if (
      title !== post.title ||
      content !== post.body ||
      userId !== post.userId
    ) {
      return (isValid = true);
    }
    return isValid;
  };

  const formIsValid =
    [formData.title, formData.content, formData.userId].every(Boolean) &&
    addRequestStatus === "idle";

  const userOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  const handleSubmit = (event) => {
    event.preventDefault();
    const title = formData.title;
    const content = formData.content;
    const userId = Number(formData.userId);
    if (formIsValid && canSave()) {
      try {
        setAddRequestStatus("pending");
        dispatch(
          updatePost({
            id: post.id,
            title,
            body: content,
            userId,
            reactions: post.reactions,
          })
        ).unwrap();
        navigate(`/posts/${post.id}`);
      } catch (error) {
        console.error("Unable to update post", error);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

  if (!post) {
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
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Update post title"
          />
        </div>
        <div>
          <label htmlFor="postAuthor">Author</label>
          <select
            name="userId"
            id="postAuthor"
            value={formData.userId}
            onChange={handleChange}
          >
            <option value=""></option>
            {userOptions}
          </select>
        </div>
        <div>
          <label htmlFor="content">Content</label>
          <textarea
            name="content"
            id="content"
            value={formData.content}
            placeholder=""
            onChange={handleChange}
          ></textarea>
        </div>
        <button
          disabled={!canSave()}
          className={`font-bold border border-slate-300 p-2 rounded  transition-all ease-in-out duration-500 ${
            formIsValid ? "text-white bg-blue-600" : "bg-gray-300"
          }`}
        >
          Update Post
        </button>
        <button className="font-bold ml-2 bg-blue-600 text-white p-2 rounded  transition-all ease-in-out duration-500">
          <Link
            to={`/posts/${post.id}`}
          >
            Go back
          </Link>
        </button>
      </form>
    </section>
  );
};
