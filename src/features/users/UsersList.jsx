import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAllUsers } from "./usersSlice"


const UsersList = () => {

  return (
    <div className="max-w-[1120px] mx-auto">
      <h1 className="text-white text-xl font-bold mb-8">Users List</h1>
    </div>
  )
}

export default UsersList