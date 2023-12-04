import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

const postsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date)
})

//initial state object
const initialState = postsAdapter.getInitialState({
  status: "idle", //idle or loading or succeeded or failed
  error: null,
})

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

//update post
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

//delete post
export const deletePost = createAsyncThunk("posts/deletePost", async (body) => {
  const { id } = body
  try {
    const response = await axios.delete(`${POSTS_URL}/${id}`)
    //this needs to return the body so that I can grab the id and remove it from state
    if(response.status === 200) return body
    return `${response.status}: ${response.text}`
  } catch (error) {
    return error.message
  }
})

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    reactionAddedAndRemoved(state, action) {
      const { postId, reaction } = action.payload;
      const existingPost = state.entities[postId]
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
        // Add any fetched posts to the array
        // Use the `upsertMany` reducer as a mutating update utility
        postsAdapter.upsertMany(state, loadedPosts)
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
        postsAdapter.addOne(state, action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const { id, userId, title, body, reactions } = action.payload;
        if(!id) {
          console.log("Unable to delete post")
          console.log(action.payload)
          return
        }
        const existingPost = state.entities[id];
        if (existingPost) {
          existingPost.id = id
          existingPost.userId = userId
          existingPost.title = title
          existingPost.body = body
          existingPost.reactions = reactions
          existingPost.date = new Date().toISOString();
        }
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        if(!action.payload.id) {
          console.log("Unable to delete post")
          console.log(action.payload)
          return
        }
        const { id } = action.payload
        postsAdapter.removeOne(state, id)
      })
  },
});

export const { reactionAddedAndRemoved } =
  postsSlice.actions;
  // Export the customized selectors for this adapter using `getSelectors`
  export const {
    selectAll: selectAllPosts,
    selectById: selectPostsById,
    selectIds: selectPostIds,
    // Pass in a selector that returns the posts slice of state
  } = postsAdapter.getSelectors(state => state.posts)

export const getPostStatus = (state) => state.posts.status;
export const getPostError = (state) => state.posts.error;

export default postsSlice.reducer;
