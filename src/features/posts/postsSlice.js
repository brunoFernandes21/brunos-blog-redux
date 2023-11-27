import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [
  { id: "1", title: "First Post!", content: "Assuming we do have the right post object in the store, useSelector will return that, and we can use it to render the title and content of the post in the page." },
  { id: "2", title: "Second Post", content: "Currently, our post entries are being shown in the main feed page, but if the text is too long, we only show an excerpt of the content. It would be helpful to have the ability to view a single post entry on its own page." },
];

const postsSlice = createSlice ({
    name: "posts",
    initialState,
    reducers: {
      postAdded: {
        reducer(state, action) {
          state.push(action.payload)
        },
        prepare(title, content, userId) {
          return {
            payload: {
              id: nanoid(),
              date: new Date().toISOString(),
              title,
              content,
              user:   userId
            }
          }
        }

      },
      postUpdated(state, action) {
        const { id, title, content } = action.payload
        const postExists = state.find(post => post.id === id)
        if(postExists){
          postExists.title = title
          postExists.content = content
        } 
      }
    }
})

export const { postAdded, postUpdated } = postsSlice.actions
export const allPosts = state => state.posts
export default postsSlice.reducer
