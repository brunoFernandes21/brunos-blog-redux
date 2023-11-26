import { useState } from "react";

export const AddPostForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
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

  const formIsValid = Boolean(formData.title) && Boolean(formData.content)
  return (
    <section className="form__section mx-auto lg:w-[50%]">
        <h3 className="text-xl font-bold">Add a New Post</h3>
      <form>
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
        <button disabled={!formIsValid} className={`${formIsValid ? "text-blue-600 bg-white" : "bg-gray-300"}`}>Add Post</button>
      </form>
    </section>
  );
};
