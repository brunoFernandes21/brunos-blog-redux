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
export const fetchPosts = createAsyncThunk("posts/fetchPoss", async () => {
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

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    reactionAddedAndRemoved(state, action) {
      const { postId, reaction } = action.payload;
      const postExist = state.posts.find((post) => post.id === postId);
      if (postExist) {
        if (postExist.reactions[reaction] > 0) {
          postExist.reactions[reaction]--;
        } else {
          postExist.reactions[reaction]++;
        }
      }
    },

    postAdded: {
      reducer(state, action) {
        state.posts.push(action.payload);
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString(),
            title,
            content, 
            user: userId,
            reactions: {
              thumbsUp: 0,
              thumbsDown: 0,
              heart: 0,
              party: 0,
              cool: 0,
            },
          },
        };
      },
    },
    postUpdated(state, action) {
      const { id, title, content } = action.payload;
      const postExists = state.posts.find((post) => post.id === id);
      if (postExists) {
        postExists.title = title;
        postExists.body = content;
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
        //Add any fetch posts to the posts array
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
        state.posts.push(action.payload)
      });
  },
});

export const { postAdded, postUpdated, reactionAddedAndRemoved } =
  postsSlice.actions;
export const getAllPosts = (state) => state.posts.posts;
export const getPostStatus = (state) => state.posts.status;
export const getPostError = (state) => state.posts.error;
export default postsSlice.reducer;
