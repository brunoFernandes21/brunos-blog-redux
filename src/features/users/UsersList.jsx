import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectAllUsers } from "./usersSlice";

const UsersList = () => {
  const users = useSelector(selectAllUsers);

  const renderedUsers = users.map((user) => {
    return (
      <Link key={user.id} to={`/users/${user.id}`}>
        <li className="flex justify-center font-bold bg-white rounded-md p-2 shadow-sm shadow-white transition-all duration-500 ease-in-out hover:scale-110">
          {user.name}
        </li>
      </Link>
    );
  });

  return (
    <section className="max-w-[1120px] mx-auto">
      <h2 className="text-white text-xl font-bold mb-8">Users List</h2>
      <ul className="flex flex-col gap-2">{renderedUsers}</ul>
    </section>
  );
};

export default UsersList;
