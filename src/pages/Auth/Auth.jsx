import React, { useContext, useState } from "react";
import logoImage from "../../assets/images/amazonLogo.jpg";
import classes from "./auth.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth } from "../../Utility/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";
import ClipLoader from "react-spinners/ClipLoader";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [{ user }, dispatch] = useContext(DataContext);
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState({ singIn: false, singUP: false });
  const navSateData = useLocation();
  console.log(navSateData);
  const handleSignUpAndSignIn = async (e) => {
    e.preventDefault();
    console.log(e.target.name);
    if (e.target.name === "signin") {
      setLoading({ ...isLoading, singIn: true });
      // firebase auth sing in
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log("login ", userCredential);
        // dispatch user to data context
        dispatch({
          type: Type.SET_USER,
          user: userCredential.user,
        });
        setLoading({ ...isLoading, singIn: false });
        navigate(navSateData?.state?.redirect || "/");
      } catch (err) {
        setError(err.message);
        setLoading({ ...isLoading, singIn: false });
      }
    } else {
      setLoading({ ...isLoading, singUP: true });
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log("Registered user:", userCredential);
        dispatch({
          type: Type.SET_USER,
          user: userCredential.user,
        });
        setLoading({ ...isLoading, singUP: false });
        navigate(navSateData?.state?.redirect || "/");
      } catch (error) {
        setError(error.message);
        setLoading({ ...isLoading, singUP: false });
      }
    }
  };

  return (
    <section className={classes.auth_form}>
      <Link to="/">
        <img src={logoImage} alt="" />
      </Link>
      <div className={classes.login_form}>
        <h2>Sign Up</h2>
        {navSateData?.state?.msg && (
          <small
            style={{
              padding: "spx",
              texteAling: "center",
              color: "red",
              fontWeight: "bold",
            }}
          >
            {navSateData?.state?.msg}
          </small>
        )}
        <form onSubmit={handleSignUpAndSignIn}>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              name="signin-email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            onClick={handleSignUpAndSignIn}
            name="signin"
            className={classes.login_signinButton}
          >
            {isLoading.singIn ? <ClipLoader size={"20px"} /> : "sign in"}
          </button>
          <p>
            By signing in you agree to amazon's conditions of use & sale. please
            see our privacy notice, our cookies notice and our interset-based
            ads notice.
          </p>
          <button
            type="submit"
            onClick={handleSignUpAndSignIn}
            name="signup"
            className={classes.login_registerButton}
          >
            {isLoading.singUP ? (
              <ClipLoader size={"20px"} />
            ) : (
              "create your amazon account"
            )}
          </button>
        </form>
      </div>
    </section>
  );
}

export default Auth;
