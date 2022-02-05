import "./Styles/App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

//Importing Components
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";

//Importing Pages
import Login from "./Pages/Login/Login";
import Home from "./Pages/Home/Home";
import Register from "./Pages/Register/Register";
import Features from "./Pages/Features/Features";
import Projects from "./Pages/Projects/Projects";
import Users from "./Pages/Users/Users";
import About from "./Pages/About/About";
import { useState } from "react";

function App() {
  const [token, setToken] = useState();
  if (!token) {
    return <Login></Login>
  }

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/users" element={<Users />}></Route>
        <Route exact path="/user/login" element={<Login />}></Route>
        <Route exact path="/user/register" element={<Register />}></Route>
        <Route exact path="/dashboard/project" element={<Projects />}></Route>
        <Route exact path="/dashboard/features" element={<Features />}></Route>
        <Route exact path="/dashboard/about" element={<About />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
