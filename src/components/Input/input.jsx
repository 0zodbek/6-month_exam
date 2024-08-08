import React from 'react'
import styles from "./input.module.css"
function Input(props) {
  return (
    <div >
    <label className={styles.label} htmlFor={props.id}>{props.label}</label>
    <input  type={props.type} className={styles.input} id={props.id} placeholder={props.place}/>
    </div>
  )
}

export default Input