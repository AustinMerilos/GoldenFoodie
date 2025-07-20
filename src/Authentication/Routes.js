import React from "react";
import Login from "./Login";
import SignUp from "./SignUp";

const routes = [
  {
    name: "Login",
    path: "/login",
    exact: true,
    main: () => <Login />,
    public: true,
  },
  {
    name: "SignUp",
    path: "/",
    exact: true,
    main: () => <SignUp />,
    public: true,
  },
];

export default routes;
