import React from "react";
import Form from "../../components/form";
import { useState } from "react";
import styles from "./index.module.css";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const goToLogin = () => navigate("/");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const formFields = [
    {
      name: "name",
      type: "text",
      placeholder: "Name",
      onchange: (e) => setFormData({ ...formData, name: e.target.value }),
    },
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
    {
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      onchange: (e) =>
        setFormData({ ...formData, confirmPassword: e.target.value }),
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
    name: {
      message: "Name is required",
      isValid: formData?.name?.length > 0,
      onError: () => {
        setError((error) => ({ ...error, name: true }));
      },
    },
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
    confirmPassword: {
      message: "Passwords do not match",
      isValid: formData.confirmPassword === formData.password,
      onError: () => {
        setError((error) => ({ ...error, confirmPassword: true }));
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
          <div className={styles.header}>Register</div>
          <Form
            error={error}
            formFields={formFields}
            onSubmit={onSubmit}
            errorMessage={errorMessage}
          />
          <div className={styles.footer}>
            <p>Have an account?</p>
            <button 
              type="button" 
              onClick={goToLogin} 
              className={styles.loginButton}
            >Login</button>
             
          </div>
        </div>
      </div>
    </>
  );
}
