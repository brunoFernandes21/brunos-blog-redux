import ParticlesBg from "particles-bg";

import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { SinglePostPage } from "./features/posts/SinglePostPage";
import NotFound from "./pages/NotFound";


function App() {
  return (
    <div className="app">
      <ParticlesBg color="#f4f4f4" num={200} type="cobweb" bg={true} />
      <div className="flex justify-center mb-20">
        <h1 className="bg-slate-900 font-bold text-2xl text-white py-2 px-3 rounded-full shadow-md shadow-white transition-all duration-500 ease-in-out hover:scale-110">
          SOCIAL MEDIA APP FEED
        </h1>
      </div>
      <Routes>
        <Route exact path="/" element={ <Home/>}/>
        <Route exact path="/posts/:postId" element={ <SinglePostPage/>}/>
        <Route exact path="*" element={ <NotFound/>}/>

      </Routes>
    </div>
  );
}

export default App;
