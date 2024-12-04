import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import MainNav from "./MainNav";
import "./style.css";

const Home = lazy(() => import("../../pages/HomePage"));
const About = lazy(() => import("../../pages/AboutPage"));
const Contact = lazy(() => import("../../pages/ContactPage"));
const NotFound = lazy(() => import("../../pages/NotFoundPage"));

function Header() {
  return (
    <>
      <MainNav />
      <div className="mainContainer">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
    </>
  );
}

export default Header;

