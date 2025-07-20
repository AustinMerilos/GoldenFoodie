import React from "react";
import Login from "./Login";
import SignUp from "./SignUp";

const routes = [
  { name: "Login", path: "/login", exact: true, main: () => <Login /> },
  { name: "SignUp", path: "/", exact: true, main: () => <SignUp /> },
];

export default routes;
