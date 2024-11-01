import React, { useState } from "react";
import Form from "../../components/form";
import styles from "./index.module.css";
import { useNavigate } from "react-router-dom";
import { register } from "../../apis/auth";

export default function Register() {
  const navigate = useNavigate();
  const goToLogin = () => navigate("/login");
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  
  const [error, setError] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const formFields = [
    {
      name: "name",
      type: "text",
      placeholder: "Name",
      value: formData.name,
      onChange: (e) => handleInputChange("name", e.target.value),
    },
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
    {
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      value: formData.confirmPassword,
      onChange: (e) => handleInputChange("confirmPassword", e.target.value),
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
      case "name":
        return value ? "" : "Name is required";
      case "email":
        return value
          ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
            ? ""
            : "Invalid email format"
          : "Email is required";
        
      case "password":
        return value ? "" : "Password is required";
      case "confirmPassword":
        return value === formData.password ? "" : "Passwords do not match";
      default:
        return "";
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const newError = {
      name: validateField("name", formData.name),
      email: validateField("email", formData.email),
      password: validateField("password", formData.password),
      confirmPassword: validateField("confirmPassword", formData.confirmPassword),
    };

    if (Object.values(newError).some((error) => error !== "")) {
      setError(newError);
      return;
    }

    try {
      const res = await register({ ...formData });
      if (res.status === 201) {
        alert("Registration successful");
        navigate("/login");
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <img src="../src/assets/Group.png" alt="logo" className={styles.foregroundImage}/>
        <img src="../src/assets/Back.png" alt="background" className={styles.backgroundImage} />
        <br/>
        <br/>
        <br/>
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
        />
        <div className={styles.footer}>
          <p>Have an account?</p>
          <button
            type="button"
            onClick={goToLogin}
            className={styles.loginButton}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
