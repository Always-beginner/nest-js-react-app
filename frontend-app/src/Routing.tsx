import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProtectedRoutes from "./ProtectedRoutes";

const Routing = () => {
  return (
    <div>
      <BrowserRouter>
        <ToastContainer
          autoClose={3000}
          position={"top-center"}
          hideProgressBar={true}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Routing;
