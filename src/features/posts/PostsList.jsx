import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import {
  selectPostIds,
  getPostStatus,
  getPostError,
  fetchPosts,
} from "./postsSlice";

import PostsData from "./PostsData";

export const PostsList = () => {
  const dispatch = useDispatch();

  const orderedPostsIds = useSelector(selectPostIds);
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
    content = orderedPostsIds.map((postId) => (
      <PostsData key={postId} postId={postId} />
    ));
  } else if (postStatus === "failed") {
    content = <p>{error}</p>;
  }

  return <section className="flex flex-col gap-5 max-w-[1120px] mx-auto">{content}</section>;
};
