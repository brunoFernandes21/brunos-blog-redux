import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="sticky top-0 z-10">
      <section className="text-white bg-transparent h-20 flex justify-between items-center px-6 md:px-20 lg:px-60 border-b-2">
        <div>
          <h1 className="bg-slate-900 font-bold md:text-lg lg:text-xl text-white py-2 px-3 rounded-full shadow-md shadow-white transition-all duration-500 ease-in-out hover:scale-110">
            SOCIAL_MEDIA_APP_FEED
          </h1>
        </div>
        <div>
          <Link to="/" className="font-bold text-xl hover:text-slate-300 transition-all ease-in-out">Posts</Link>
        </div>
      </section>
    </nav>
  );
};
