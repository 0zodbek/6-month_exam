import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./register.module.css";
import google from "../../../public/Google.svg";
import loginImg from "../../../public/logoLogin.svg";
import hero from "../../../public/register.jpg";
import Input from "../../components/Input/input.jsx";
import Switch from "@mui/joy/Switch";
import { useRef } from "react";

function Regiser() {
  const navigate = useNavigate('')
  const nameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const avatarRef = useRef("");

  function validate(username, email, password, avatar) {
    if (username.current.value.length < 3) {
      alert("username is not valid !");
      username.current.style.outlineColor = "red";
      username.current.focus();
      return false;
    }
    if (email.current.value.length < 3) {
      alert("email is not valid !");
      email.current.focus();
      email.current.style.outlineColor = "red";
      return false;
    }
    if (password.current.value.length < 3) {
      alert("password is not valid !");
      password.current.focus();
      password.current.style.outlineColor = "red";
      return false;
    }
    if (avatar.current.value.length < 3  || !avatar.current.value.startsWith("https://")) {
      alert("avatar is not valid ! It must start with 'https://'");
      avatar.current.focus();
      avatar.current.style.outlineColor = "red";
      return false;
    }
    return true;
  }
  function handleSubmit(event) {
    event.preventDefault();
    const isvalid = validate(nameRef, emailRef, passwordRef, avatarRef);
    if (!isvalid) {
      return;
    }

    const user = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      avatar: avatarRef.current.value,
    };
    localStorage.setItem('user',JSON.stringify(user))
    fetch("https://api.escuelajs.co/api/v1/users/", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.role) {
          alert("Siz muvaffaqiyatli royhatdan o'tdingiz");
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  
  function handleSalom(event) {
    event.preventDefault();
    navigate("/")
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.partImage}>
        <img src={hero} alt="" />
      </div>
      <div className={styles.partInputs}>
        <div className={styles.head}>
          <img src={loginImg} alt="bu yerda rasm bor" />
          <h3>Register</h3>
        </div>
        <form className={styles.form}>
          <h2>Nice to see you again</h2>
          <div>
            <label className={styles.label} htmlFor="name">
              Name
            </label>
            <input
              ref={nameRef}
              type="text"
              className={styles.input}
              id="name"
              placeholder="Enter name"
            />
          </div>
          <div>
            <label className={styles.label} htmlFor="email">
              Email
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
          <div>
            <label className={styles.label} htmlFor="avatar">
              Avatar
            </label>
            <input
              ref={avatarRef}
              type="URL"
              className={styles.input}
              id="avatar"
              placeholder="Enter avatar url address"
            />
          </div>
          <button className={styles.btnLogin} onClick={handleSubmit}>
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Regiser;
