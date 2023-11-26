import ParticlesBg from "particles-bg";
import { PostsList } from "./features/posts/PostsList";
import { AddPostForm } from "./features/posts/AddPostForm";

function App() {
  return (
    <main className="app">
      <ParticlesBg color="#f4f4f4" num={200} type="cobweb" bg={true} />
      <div className="flex justify-center mb-20">
        <h1 className="bg-slate-900 font-bold text-2xl text-white py-2 px-3 rounded-full shadow-md shadow-white transition-all duration-500 ease-in-out hover:scale-110">
          SOCIAL MEDIA APP FEED
        </h1>
      </div>
      <AddPostForm />
      <PostsList />
    </main>
  );
}

export default App;
