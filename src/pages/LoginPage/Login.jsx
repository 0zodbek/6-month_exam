import React from "react";
import styles from "./login.module.css";
import hero from "../../../public/hero.png";
import loginImg from "../../../public/logoLogin.svg";
import Input from "../../components/Input/input.jsx";
import Switch from "@mui/joy/Switch";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import google from "../../../public/Google.svg";
function Login(props) {
  const navigate = useNavigate("");
  const usernameRef = useRef("");
  const passwordRef = useRef("");
  function validate(username, password) {
    if (username.current.value < 3) {
      alert("username is not valid !");
      username.current.style.outlineColor = "red";
      username.current.focus();
      return false;
    }
    if (password.current.value < 3) {
      alert("password is not valid !");
      password.current.focus();
      password.current.style.outlineColor = "red";
      return false;
    }
    return true;
  }
  function handleSubmit(event) {
    event.preventDefault();
    const isvalid = validate(usernameRef, passwordRef);
    if (!isvalid) {
      return;
    }
    navigate("/");
    const user = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };
    console.log(user);
    fetch("https://auth-rg69.onrender.com/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        if (data.message == "User Not found.") {
          alert("Foydalanuvchi nomi hato kiritdingiz !");
          usernameRef.current.focus();
        }
        if (data.message == "Invalid Password!") {
          alert("parolni hato kiritdingiz !");
          passwordRef.current.focus();
        }
        if (data.accessToken) {
          localStorage.setItem("user", JSON.stringify(data));
          localStorage.setItem("token", data.accessToken);
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleToRegister(event) {
    navigate("/register");
  }
  function login(event) {
    alert("salom");
  }
  function Google() {}

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
          <Input
            type="text"
            ref={usernameRef}
            id="name"
            place="Email or phone number"
            label="Login"
          />
          <Input
            type="password"
            ref={passwordRef}
            id="password"
            place="Enter password"
            label="Password"
          ></Input>
          <div className={styles.frame}>
            <Switch size="lg" /> <p>Remember me</p>
            <span className={styles.navigate}>Forgot password?</span>
          </div>
          <button className={styles.btnLogin} onClick={handleSubmit}>
            Sign in
          </button>
          <hr />
          <button className={styles.btnGoogle} onClick={Google}>
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
