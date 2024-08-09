import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/system/Box";
import { FocusTrap } from "@mui/base/FocusTrap";
import styles from "./style.module.css";

function Home() {
  const [open, setOpen] = useState(true);
  const [userPhoto, setUserPhoto] = useState(null);
  const [infoLC, setInfoLC] = useState([]);
  const nameRef = useRef(null);
  const lastNameRef = useRef(null);
  const hobbyRef = useRef(null);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserPhoto(user);
    }    
    const storedInfoLC = JSON.parse(localStorage.getItem("infoLC")) || [];
    setInfoLC(storedInfoLC);
  }, []);
  function validate(name, lastName, hobby) {
    if (name.current.value.length < 3) {
      alert("Name is not valid !");
      name.current.focus();
      name.current.style.outlineColor = "red";
      return false;
    }
    if (lastName.current.value.length < 3) {
      alert("Lastname is not valid !");
      lastName.current.focus();
      lastName.current.style.outlineColor = "red";
      return false;
    }
    if (hobby.current.value.length < 3) {
      alert("Hobby is not valid !");
      hobby.current.focus();
      hobby.current.style.outlineColor = "red";
      return false;
    }
    return true;
  }
  const handleSave = () => {
    let isValid = validate(nameRef, lastNameRef, hobbyRef);
    if (!isValid) {
      return;
    }
    const info = {
      name: nameRef.current.value,
      lastname: lastNameRef.current.value,
      hobby: hobbyRef.current.value,
    };
    const updatedInfoLC = [...infoLC, info];
    setInfoLC(updatedInfoLC);
    localStorage.setItem("infoLC", JSON.stringify(updatedInfoLC));
  };

  const handleDelete = (index) => {
    const updatedInfoLC = infoLC.filter((_, i) => i !== index);
    setInfoLC(updatedInfoLC);
    localStorage.setItem("infoLC", JSON.stringify(updatedInfoLC));
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.box}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {userPhoto && (
            <div className={styles.userPanel}>
              <div className={styles.wrap}>
                <img
                  className={styles.imgUser}
                  src={userPhoto.avatar}
                  alt="User avatar"
                />
                <h2>{userPhoto.name}</h2>
              </div>
              <p>{userPhoto.email}</p>
            </div>
          )}

          {open && (
            <FocusTrap
              open
            >
              <Box
                className={styles.box}
                tabIndex={-1}
                sx={{
                  mt: 1,
                  p: 1,
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <label>
                  First name:{" "}
                  <input ref={nameRef} className={styles.input} type="text" />
                </label>
                <label>
                  Last name:{" "}
                  <input
                    ref={lastNameRef}
                    className={styles.input}
                    type="text"
                  />
                </label>
                <label>
                  Your hobby:{" "}
                  <input ref={hobbyRef} className={styles.input} type="text" />
                </label>
                <button
                  type="button"
                  onClick={() => {
                    handleSave() && setOpen(false);
                  }}
                >
                  Save
                </button>
              </Box>
            </FocusTrap>
          )}
        </Box>
      </div>

      {infoLC.length > 0 && (
        <div className={styles.infoos}>
          {infoLC.map((info, index) => (
            <div
              key={index}
              className={styles.infoItem}
              onMouseEnter={(e) => {
                e.currentTarget.querySelector("button").style.display = "block";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.querySelector("button").style.display = "none";
              }}
            >
              <h3>{info.name}</h3>
              <h3>{info.lastname}</h3>
              <h3>{info.hobby}</h3>
              <button
                style={{ display: "none" }}
                onClick={() => handleDelete(index)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
