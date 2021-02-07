import React from "react";
import Login from "./Login";
import SignUp from "./SignUp";

const routes = [
  { name: "SignUp", path: "/SignUp", exact: true, main: () => <SignUp /> },
  { name: "Login", path: "/", exact: true, main: () => <Login /> },
];

export default routes;
