import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from "./register.module.css"
import google from "../../../public/Google.svg"
import loginImg from "../../../public/logoLogin.svg"
import hero from "../../../public/register.jpg"
import Input from "../../components/Input/input.jsx"
import Switch from '@mui/joy/Switch';

function Regiser() {
  function handleToRegister(event){
    const navigate = useNavigate()
    navigate("/register")
    }
    function Login(event){
      alert("salom")
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
          <Input id="name" place="Enter username ..." label="Name"/>
          <Input id="email" place="Enter your email" label="Login"/>
          <Input id="password" place="Enter password" label="Password" ></Input>
          <Input id="repassword" place="Email repassword" label="password"/>
          <button className={styles.btnLogin} onClick={Login}>Sign in</button>
          
          {/* <button className={styles.btnGoogle} onClick={Google}> <img src={google} alt="" />Or sign in with Google</button> */}

        </form>
      </div>
    </div>
  )
}

export default Regiser