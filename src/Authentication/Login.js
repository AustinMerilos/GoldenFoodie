import React, { useState, useContext } from "react";
import { AuthContext } from "../index";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import { auth } from "../firebase";
import {
  setPersistence,
  browserSessionPersistence,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setErrors] = useState("");

  const Auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleForm = (e) => {
    e.preventDefault();
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        return signInWithEmailAndPassword(auth, email, password);
      })
      .then((res) => {
        if (res.user) Auth.setLoggedIn(true);
        navigate("/search");
      })
      .catch((e) => {
        setErrors(e.message);
      });
  };

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    setPersistence(auth, browserSessionPersistence)
      .then(() => signInWithPopup(auth, provider))
      .then((result) => {
        console.log(result);
        Auth.setLoggedIn(true);
        navigate("/search");
      })
      .catch((e) => setErrors(e.message));
  };

  return (
    <div>
      <form className="logIn-form" onSubmit={handleForm}>
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
        <button onClick={signInWithGoogle} className="submit" type="button">
          <img
            className="google"
            src={process.env.PUBLIC_URL + "/googleLogo.png"}
            alt="google logo"
          />
          Login With Google
        </button>
        <span>{error}</span>
      </form>
    </div>
  );
};

export default Login;
