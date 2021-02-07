import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import routes from "./Authentication/Routes";
import Header from "./Authentication/Header";
import "./App.css";

import protectedRoutes from "./Authentication/ProtectedRoutes";

import firebase from "firebase/app";
import firebaseConfig from "./firebaseConfig";
import ProtectedRouteHoc from "./Authentication/ProtectedRouteHOC";

firebase.initializeApp(firebaseConfig);

export const AuthContext = React.createContext(null);

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  function readSession() {
    const user = window.sessionStorage.getItem(
      `firebase:authUser:${firebaseConfig.apiKey}:[DEFAULT]`
    );
    if (user) setLoggedIn(true);
  }
  useEffect(() => {
    readSession();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setLoggedIn }}>
      <div className="body">
        <Router>
          <Header isLoggedIn={isLoggedIn}></Header>
          <Switch>
            {protectedRoutes.map((route) => (
              <ProtectedRouteHoc
                key={route.path}
                isLoggedIn={isLoggedIn}
                path={route.path}
                component={route.main}
                exact={route.exact}
                public={route.public}
              />
            ))}
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                exact={route.exact}
                component={route.main}
              />
            ))}
          </Switch>
        </Router>
      </div>
    </AuthContext.Provider>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
