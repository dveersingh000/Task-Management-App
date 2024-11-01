import React, { useState } from "react";
import Form from "../../components/form";
import styles from "./index.module.css";
import { useNavigate } from "react-router-dom";
import { login } from "../../apis/auth"; 

export default function Login() {
  const navigate = useNavigate();
  const goToRegister = () => navigate("/register");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const formFields = [
    {
      name: "email",
      type: "email",
      placeholder: "Email",
      value: formData.email,
      onChange: (e) => handleInputChange("email", e.target.value),
    },
    {
      name: "password",
      type: "password",
      placeholder: "Password",
      value: formData.password,
      onChange: (e) => handleInputChange("password", e.target.value),
    },
  ];

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setError((prevError) => ({
      ...prevError,
      [field]: validateField(field, value),
    }));
  };

  const validateField = (field, value) => {
    switch (field) {
      case "email":
        return value ? "" : "Email is required";
      case "password":
        return value ? "" : "Password is required";
      default:
        return "";
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const newError = {
      email: validateField("email", formData.email),
      password: validateField("password", formData.password),
    };

    if (Object.values(newError).some((error) => error !== "")) {
      setError(newError);
      return;
    }

    try {
      const res = await login(formData.email, formData.password);
      if (res.token) {
        alert("Login successful");
        navigate("/");
      } else {
        alert("Something went wrong during login");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <img src="../src/assets/Group.png" alt="logo" className={styles.foregroundImage}/>
        <img src="../src/assets/Back.png" alt="background" className={styles.backgroundImage} />
        <br />
        <br />
        <br />
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
        />
        <div className={styles.footer}>
          <p>Have no account yet?</p>
          <button
            type="button"
            onClick={goToRegister}
            className={styles.loginButton}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
