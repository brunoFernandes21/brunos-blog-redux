import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

//state object
const initialState = {
  posts: [],
  status: "idle", //idle or loading or succeeded or failed
  error: null,
};

//fetch posts using AsyncThunk
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  try {
    const response = await axios.get(POSTS_URL);
    return response.data;
  } catch (error) {
    return error.message;
  }
});

//add new post to the api
export const addNewPost = createAsyncThunk("post/addNewPost", async (body) => {
  try {
    const response = await axios.post(POSTS_URL, body);
    return response.data;
  } catch (error) {
    return error.message;
  }
});

//update single post
export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (body) => {
    const { id } = body
    try {
      const response = await axios.patch(`${POSTS_URL}/${id}`, body);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    reactionAddedAndRemoved(state, action) {
      const { postId, reaction } = action.payload;
      const existingPost = state.posts.find((post) => post.id === postId);
      if (existingPost) {
        if (existingPost.reactions[reaction] > 0) {
          existingPost.reactions[reaction]--;
        } else {
          existingPost.reactions[reaction]++;
        }
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Adding date and reactions to the fetch posts
        let min = 1;
        const loadedPosts = action.payload.map((post) => {
          post.date = sub(new Date(), { minutes: min++ }).toISOString();
          post.reactions = {
            thumbsUp: 0,
            thumbsDown: 0,
            heart: 0,
            party: 0,
            cool: 0,
          };
          return post;
        });
        //set posts to new array of fetched posts
        state.posts = [...loadedPosts];
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        action.payload.userId = Number(action.payload.userId);
        action.payload.date = new Date().toISOString();
        action.payload.reactions = {
          thumbsUp: 0,
          thumbsDown: 0,
          heart: 0,
          party: 0,
          cool: 0,
        };
        state.posts.push(action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const { id, userId, title, body, reactions } = action.payload;
        const existingPost = state.posts.find((post) => post.id === id);
        if (existingPost) {
          existingPost.id = id
          existingPost.userId = userId
          existingPost.title = title
          existingPost.body = body
          existingPost.reactions = reactions
          existingPost.date = new Date().toISOString();
        }
      });
  },
});

export const { postAdded, postUpdated, reactionAddedAndRemoved } =
  postsSlice.actions;
export const getAllPosts = (state) => state.posts.posts;
export const getPostStatus = (state) => state.posts.status;
export const getPostError = (state) => state.posts.error;
export const getPostById = (state, postId) =>
  state.posts.posts.find((post) => post.id === postId);
export default postsSlice.reducer;
