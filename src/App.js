import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./shared/header/Header";
import Footer from "./shared/footer/Footer";
import PostsList from "./features/posts/PostsList";
import PostDetails from "./features/posts/PostDetails";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<PostsList />} />
        <Route path="/post/:postId" element={<PostDetails />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
