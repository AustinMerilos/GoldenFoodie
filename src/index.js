import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import routes from "./Authentication/Routes";
import protectedRoutes from "./Authentication/ProtectedRoutes";
import Header from "./Authentication/Header";

import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

import "./App.css";

export const AuthContext = React.createContext(null);

const AppContent = ({ isLoggedIn }) => {
  const location = useLocation();

  const hideHeaderPaths = ["/search"];
  const showHeader =
    !hideHeaderPaths.includes(location.pathname.toLowerCase()) && isLoggedIn;

  return (
    <>
      {showHeader && <Header isLoggedIn={isLoggedIn} />}
      <Routes>
        {protectedRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              isLoggedIn || route.public ? (
                <route.main />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        ))}

        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={<route.main />} />
        ))}
      </Routes>
    </>
  );
};

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoggedIn(!!user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, setLoggedIn, user }}>
      <div className="body">
        <Router>
          <AppContent isLoggedIn={isLoggedIn} />
        </Router>
      </div>
    </AuthContext.Provider>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
