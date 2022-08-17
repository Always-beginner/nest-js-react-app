import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = (props: any) => {
  const token = localStorage.getItem("token");
  if (token == undefined) {
    return <Navigate to="/login"></Navigate>;
  }
  return props.children;
};

export default ProtectedRoutes;
