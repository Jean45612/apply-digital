import React from "react";
import { Header } from "./components/layout/Header";
import { Navbar } from "./components/layout/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/views/Home";
import MyFaves from "./components/views/MyFaves";

const App = () => {
  return (
    <div>
      <Header />
      <Router>
        <main className="main">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/myFaves" element={<MyFaves />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
};

export default App;
