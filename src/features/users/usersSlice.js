import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = []

const USERS_URL = "https://jsonplaceholder.typicode.com/users";

//fetch posts using AsyncThunk
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  try {
    const response = await axios.get(USERS_URL);
    return response.data;
  } catch (error) {
    return error.message;
  }
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        return action.payload;
      })
  },
});

export const getAllUsers = (state) => state.users;
export const getSingleUser = (state, userId) => state.users.find(user => user.id === userId)

export default usersSlice.reducer;
