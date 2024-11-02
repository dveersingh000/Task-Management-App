import React, { useState } from "react";
// import Form from "../../components/form/form";
import styles from "./index.module.css";
import { useNavigate } from "react-router-dom";
import { register } from "../../apis/auth";
import { MdOutlinePerson2, MdEmail, MdLock } from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LogoImage from "../../src/assets/Group.png";
import BackgroundImage from "../../src/assets/Back.png";


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

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const formFields = [
    {
      name: "name",
      type: "text",
      placeholder: "Name",
      icon: <MdOutlinePerson2 className={styles.icon}/>,
      value: formData.name,
      onChange: (e) => handleInputChange("name", e.target.value),
    },
    {
      name: "email",
      type: "email",
      placeholder: "Email",
      icon: <MdEmail className={styles.icon} />,
      value: formData.email,
      onChange: (e) => handleInputChange("email", e.target.value),
    },
    {
      name: "password",
      type: showPassword ? "text" : "password",
      placeholder: "Password",
      icon: <MdLock className={styles.icon} />,
      value: formData.password,
      onChange: (e) => handleInputChange("password", e.target.value),
      toggleIcon: showPassword ? (
        <AiOutlineEyeInvisible className={styles.eyeIcon} onClick={togglePasswordVisibility} />
      ) : (
        <AiOutlineEye className={styles.eyeIcon} onClick={togglePasswordVisibility} />
      ),
    },
    {
      name: "confirmPassword",
      type: showConfirmPassword ? "text" : "password",
      placeholder: "Confirm Password",
      icon: <MdLock className={styles.icon} />,
      value: formData.confirmPassword,
      onChange: (e) => handleInputChange("confirmPassword", e.target.value),
      toggleIcon: showConfirmPassword ? (
        <AiOutlineEyeInvisible className={styles.eyeIcon} onClick={toggleConfirmPasswordVisibility} />
      ) : (
        <AiOutlineEye className={styles.eyeIcon} onClick={toggleConfirmPasswordVisibility} />
      ),
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
        if (!value) return "Password is required";
        return value.length < 8 ? "Password must be at least 8 characters long" : "";
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

    // console.log("Sending registration data:", formData);

    try {
      const res = await register({ ...formData });
      if (res.status === 201) {
        toast.success("Registration successful!");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        toast.error("Something went wrong.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <img src={LogoImage} alt="logo" className={styles.LogoImage} />
        <img src={BackgroundImage} alt="background" className={styles.circle} />
        
        
        <p>
          Welcome aboard my friend <br />
          <span>just a couple of clicks and we start</span>
        </p>
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.header}>Register</div>
        
        <form onSubmit={onSubmit} className={styles.form}>
          {formFields.map((field, index) => (
            <div key={index} className={styles.inputContainer}>
              {field.icon} 
              <input
                type={field.type}
                placeholder={field.placeholder}
                value={field.value}
                onChange={field.onChange}
                className={styles.inputField}
              />
              {field.toggleIcon && (
                <div className={styles.toggleIconContainer}>
                  {field.toggleIcon}
                </div>
              )}
              {error[field.name] && (
                <span className={styles.error}>{error[field.name]}</span>
              )}
            </div>
          ))}
          <button type="submit" className={styles.submitButton}>Register</button>
        </form>
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
      <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition: Bounce
/>
    </div>
  );
}
