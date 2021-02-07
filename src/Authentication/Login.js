import React, { useState, useContext } from "react";
import { AuthContext } from "../index";

import { withRouter } from "react-router-dom";
import firebase from "firebase";
require("firebase/auth");

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setErrors] = useState("");

  const Auth = useContext(AuthContext);
  const handleForm = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then((res) => {
            if (res.user) Auth.setLoggedIn(true);
            history.push("/search");
          })
          .catch((e) => {
            setErrors(e.message);
          });
      });
  };

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        firebase
          .auth()
          .signInWithPopup(provider)
          .then((result) => {
            console.log(result);
            history.push("/search");
            Auth.setLoggedIn(true);
          })
          .catch((e) => setErrors(e.message));
      });
  };
  return (
    <div>
      <form className="logIn-form" onSubmit={(e) => handleForm(e)}>
        <h1 className="login-sign">Welcome! </h1>
        <p className="login-text">Please Login</p>
        <input
          className="search-bar"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          type="email"
          placeholder="email"
        />
        <input
          className="search-bar"
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          value={password}
          type="password"
          placeholder="password"
        />
        <hr />

        <button className="submit" type="submit">
          Login
        </button>
        <button
          onClick={() => signInWithGoogle()}
          className="submit"
          type="button"
        >
          <img
            className="google"
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt="google-logo"
          />
          Login With Google
        </button>
        <span>{error}</span>
      </form>
    </div>
  );
};

export default withRouter(Login);
