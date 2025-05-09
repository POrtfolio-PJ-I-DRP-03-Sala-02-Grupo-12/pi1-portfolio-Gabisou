//import { useState } from 'react'
//import './App.css'
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Editor from "./pages/Editor";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/editor" element={<Editor />} />
    </Routes>
  );
};

export default App;
