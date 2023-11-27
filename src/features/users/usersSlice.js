import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {id: "1", name: "Joseph Brown"},
    {id: "2", name: "Bruno Fernandes"},
    {id: "3", name: "Lucas Sander"},
    {id: "4", name: "Danny Hart"}
]

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {}
})

export const allUsers = state => state.users
export default usersSlice.reducer
