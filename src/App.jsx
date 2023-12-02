import ParticlesBg from "particles-bg";

import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { SinglePostPage } from "./features/posts/SinglePostPage";
import NotFound from "./pages/NotFound";
import { Navbar } from "./pages/Navbar";
import { EditPostForm } from "./features/posts/EditPostForm";

function App() {
  return (
    <main>
      <ParticlesBg color="#f4f4f4" num={200} type="cobweb" bg={true} />
      <Navbar />
      <section className="app">
        <Routes>
          <Route path="/" element={ <Home />} />
          <Route path="posts/:postId" element={ <SinglePostPage />} />
          <Route path="posts/edit-post/:postId" element={ <EditPostForm/>} />
          <Route path="*" element={ <NotFound />} />
        </Routes>
      </section>
    </main>
  );
}

export default App;
