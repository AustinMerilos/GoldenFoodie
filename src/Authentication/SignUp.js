import React, { useState, useContext } from "react";
import { AuthContext } from "../index";
import firebase from "firebase/app";
import "./Auth.css";
import { withRouter } from "react-router-dom";

const SignUp = ({ history }) => {
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
          .createUserWithEmailAndPassword(email, password)
          .then((res) => {
            console.log(res);
            history.push("/search");
            if (res.user) Auth.setLoggedIn(true);
          })
          .catch((e) => {
            setErrors(e.message);
          });
      });
  };

  const handleGoogleLogin = () => {
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
      <form className="logIn-form " onSubmit={(e) => handleForm(e)}>
        <h1 className="sign">SignUp</h1>
        <p className="sign-up">Please Enter a email and password</p>
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
          Submit
        </button>{" "}
        <button
          className="submit"
          onClick={() => handleGoogleLogin()}
          type="button"
        >
          <img
            className="google"
            src={process.env.PUBLIC_URL + "/googleLogo.png"}
            alt="google logo"
          />
          SignUp With Google
        </button>
        <span>{error}</span>
      </form>
    </div>
  );
};

export default withRouter(SignUp);
