import "./Styles/App.css";

import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

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
import MyProfile from "./Pages/MyProfile/MyProfile";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  let isLoggedIn = token;
  console.log("App Called");
  console.log(token);

  const onSuccessLogin = (tok) => {
    setToken(localStorage.getItem("token"));
    isLoggedIn = tok;
  };
  const onSuccessLogout = (tok) => {
    setToken(localStorage.getItem("token"));
    isLoggedIn = tok;
  };

  return (
    <>
      <Header isLoggedIn={isLoggedIn} onSuccessLogout={onSuccessLogout} />
      <Routes>
        {/* Non Authenticated Routes */}
        <Route exact path="/" element={<Home></Home>}></Route>
        <Route exact path="/dashboard/features" element={<Features />}></Route>
        <Route exact path="/dashboard/about" element={<About />}></Route>

        {/* Authenticated Routes  */}
        <Route
          exact
          path="/user"
          element={token ? <Users /> : <Navigate to="/user/login"></Navigate>}
        ></Route>
        <Route
          exact
          path="/dashboard/project"
          element={
            token ? <Projects /> : <Navigate to="/user/login"></Navigate>
          }
        ></Route>
        <Route
          exact
          path="/dashboard/myprofile"
          element={
            token ? <MyProfile /> : <Navigate to="/user/login"></Navigate>
          }
        ></Route>

        {/* Login Route */}
        <Route
          exact
          path="/user/login"
          element={<Login onSuccessLogin={onSuccessLogin} />}
        ></Route>

        {/* Register Route */}
        <Route exact path="/user/register" element={<Register />}></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
