import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import {
  getAllPosts,
  getPostStatus,
  getPostError,
  fetchPosts,
} from "./postsSlice";
import PostsData from "./PostsData";

export const PostsList = () => {
  const dispatch = useDispatch();

  const posts = useSelector(getAllPosts);
  // console.log(posts);
  const postStatus = useSelector(getPostStatus);
  const error = useSelector(getPostError);

  //get posts from redux store to display on screen
  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  let content;
  if (postStatus === "loading") {
    content = <p>Loading...</p>;
  } else if (postStatus === "succeeded") {
    // Sort posts in reverse chronological order by datetime string
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));
    content = orderedPosts.map((post) => (
      <PostsData key={post.id} post={post} />
    ));
  } else if (postStatus === "failed") {
    content = <p>{error}</p>;
  }

  return <section className="flex flex-col gap-5">{content}</section>;
};
