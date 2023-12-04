import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAllUsers } from "../features/users/usersSlice";

export const Navbar = () => {
  const users = useSelector(selectAllUsers);
  const randomUser = users[Math.floor(Math.random() * users.length)];

  // className="sticky top-0 z-10" to make nav fixed at top
  return (
    <nav>
      <section className="text-white bg-transparent h-20 flex justify-between items-center px-6 md:px-20 lg:px-60 border-b-2">
        <div>
          <h1 className="bg-slate-900 font-bold md:text-lg lg:text-xl text-white py-2 px-3 rounded-full shadow-md shadow-white transition-all duration-500 ease-in-out hover:scale-110">
            <Link to="/">BRUNOS_BLOG</Link>
          </h1>
        </div>
        <div className="flex justify-center items-center gap-8">
          <Link
            to="/posts"
            className="font-bold text-lg hover:text-slate-300 transition-all ease-in-out"
          >
            Posts
          </Link>
          <Link
            to="/users"
            className="font-bold text-lg hover:text-slate-300 transition-all ease-in-out"
          >
            Users
          </Link>
          {/* {randomUser && <p>{randomUser.name}</p>} */}
        </div>
      </section>
    </nav>
  );
};
