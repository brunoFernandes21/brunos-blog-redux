import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { id: "1", title: "First Post!", content: "Hello!" },
  { id: "2", title: "Second Post", content: "More text" },
];

const postsSlice = createSlice ({
    name: "posts",
    initialState,
    reducers: {
      postAdded(state, action) {
        state.unshift(action.payload)
      }
    }
})

export const { postAdded } = postsSlice.actions
export const allPosts = state => state.posts
export default postsSlice.reducer
