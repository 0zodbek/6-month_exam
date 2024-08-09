import React from "react";
import styles from "./login.module.css";
import hero from "../../../public/hero.png";
import loginImg from "../../../public/logoLogin.svg";
import Switch from "@mui/joy/Switch";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import google from "../../../public/Google.svg";
function Login(props) {
  const navigate = useNavigate();
  const emailRef = useRef("");
  const passwordRef = useRef("");
  function handleToRegister(event) {
    navigate("/register");
  }
  function validate(email, password) {
    console.log(email.current.value);
    if (!email.current.value) {
      alert("Email is required");
      return false;
    }
    if (!password.current.value) {
      alert("Password is required");
      return false;
    }
    if (password.current.value.length < 3) {
      alert("Password must be at least 3 characters long");
      return false;
    }
    return true;
  }
  function handleSubmit(event) {
    event.preventDefault();
    const isValid = validate(emailRef, passwordRef);
    if (!isValid) {
      return;
    }
    const userr = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    console.log(userr);
    fetch("https://api.escuelajs.co/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(userr),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);

        if (data.access_token) {
          localStorage.setItem("userr", JSON.stringify(data));
          localStorage.setItem("token", data.access_token);
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.partImage}>
        <img src={hero} alt="" />
      </div>
      <div className={styles.partInputs}>
        <div className={styles.head}>
          <img src={loginImg} alt="bu yerda rasm bor" />
          <h3>UI Unicorn</h3>
        </div>
        <form className={styles.form}>
          <h2>Nice to see you again</h2>
          <div>
            <label className={styles.label} htmlFor="email">
              Login
            </label>
            <input
              ref={emailRef}
              type="email"
              className={styles.input}
              id="email"
              placeholder="Enter email"
            />
          </div>
          <div>
            <label className={styles.label} htmlFor="password">
              Password
            </label>
            <input
              ref={passwordRef}
              type="password"
              className={styles.input}
              id="password"
              placeholder="Enter password"
            />
          </div>
          <div className={styles.frame}>
            <Switch size="lg" /> <p>Remember me</p>
            <span className={styles.navigate}>Forgot password?</span>
          </div>
          <button className={styles.btnLogin} onClick={handleSubmit}>
            Sign in
          </button>
          <hr />
          <button className={styles.btnGoogle}>
            {" "}
            <img src={google} alt="" />
            Or sign in with Google
          </button>
          <div className={styles.links}>
            <p>Dont have an account?</p>
            <span className={styles.register} onClick={handleToRegister}>
              Sign up now
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
