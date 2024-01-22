import React from 'react';
import './App.css';
import {Routes,Route,} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Product from "./pages/Product";
import Chart from "./pages/Chart";

function App() {
  return (
    <div>
      <Navbar />
      <main className="mx-[10px] md:mx-[20px]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/product" element={<Product />} />
          <Route path="/chart" element={<Chart />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
