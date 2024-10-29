import React from "react";
import Form from "../../components/form";
import { useState } from "react";
import styles from "./index.module.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const goToLogin = () => navigate("/");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    email: false,
    password: false,
  });

  const formFields = [
    
    {
      name: "email",
      type: "email",
      placeholder: "Email",
      onchange: (e) => setFormData({ ...formData, email: e.target.value }),
    },
    {
      name: "password",
      type: "password",
      placeholder: "Password",
      onchange: (e) => setFormData({ ...formData, password: e.target.value }),
    },
  ];
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    console.log(errorMessage.name.isValid);
    Object.keys(errorMessage).forEach((key) => {
      if (!errorMessage[key].isValid) {
        errorMessage[key].onError();
      }
    });
  };
  console.log(error);
  const errorMessage = {
    email: {
      message: "Email is required",
      isValid: formData.email.length > 0,
      onError: () => {
        setError((error) => ({ ...error, email: true }));
      },
    },
    password: {
      message: "Password is required",
      isValid: formData.password.length > 0,
      onError: () => {
        setError((error) => ({ ...error, password: true }));
      },
    },
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.leftContainer}>
          <img src="../src/assets/Group.png" alt="logo" />
          <p>
            Welcome aboard my friend <br />
            <span>just a couple of clicks and we start</span>
          </p>
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.header}>Login</div>
          <Form
            error={error}
            formFields={formFields}
            onSubmit={onSubmit}
            errorMessage={errorMessage}
          />
          <div className={styles.footer}>
            <p>Have no account yet?</p>
            <button 
              type="button" 
              onClick={goToLogin} 
              className={styles.loginButton}
            >Register</button>
             
          </div>
        </div>
      </div>
    </>
  );
}
