import ParticlesBg from "particles-bg";

import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { SinglePostPage } from "./features/posts/SinglePostPage";
import NotFound from "./pages/NotFound";
import { Navbar } from "./pages/Navbar";
import { EditPostForm } from "./features/posts/EditPostForm";
import { useState } from "react";
import UsersList from "./features/users/UsersList";
import { PostsList } from "./features/posts/PostsList";
import SingleUserPage from "./features/users/SingleUserPage";

function App() {
  const [showForm, setShowForm] = useState()
  return (
    <main>
      <ParticlesBg color="#f4f4f4" num={200} type="cobweb" bg={true} />
      <Navbar setShowForm={setShowForm}/>
      <section className="app">
        <Routes>
          <Route path="/" element={ <Home setShowForm={setShowForm} showForm={showForm}/>} />
          <Route path="posts" element={<PostsList/>}/>
          <Route path="posts/:postId" element={ <SinglePostPage />} />
          <Route path="posts/edit-post/:postId" element={ <EditPostForm/>} />
          <Route path="users" element={<UsersList/>}/>
          <Route path="users/:userId" element={<SingleUserPage/>}/>
          <Route path="*" element={ <NotFound />} />
        </Routes>
      </section>
    </main>
  );
}

export default App;
