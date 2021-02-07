import React from "react";
import Search from "../components/Search";

const protectedRoutes = [
  {
    name: "search",
    exact: true,
    path: "/search",
    main: (props) => <Search {...props} />,
    public: false,
  },
];

export default protectedRoutes;
