import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios";

const usersAdapter = createEntityAdapter()

const initialState = usersAdapter.getInitialState()

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
        return usersAdapter.setAll(state, action.payload);
      })
  },
});

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
} = usersAdapter.getSelectors(state => state.users)

// export const getAllUsers = (state) => state.users;
// export const getUserById = (state, userId) => state.users.find(user => user.id === userId)

export default usersSlice.reducer;
