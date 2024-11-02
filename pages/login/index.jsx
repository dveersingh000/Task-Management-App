import React, { useState } from "react";
// import Form from "../../components/form/form";
import styles from "./index.module.css";
import { useNavigate } from "react-router-dom";
import { login } from "../../apis/auth"; 
import { MdEmail, MdLock } from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LogoImage from "../../src/assets/Group.png";
import BackgroundImage from "../../src/assets/Back.png";



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

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const formFields = [
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
      toggleIcon: showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />,
      onToggle: togglePasswordVisibility,
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
        return value
          ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
            ? ""
            : "Invalid email format"
          : "Email is required";
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
        toast.success("Login successful");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        toast.error("Something went wrong during login");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please check your credentials and try again.");
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
        <div className={styles.header}>Login</div>
          <form onSubmit={onSubmit} className={styles.form}>
            {formFields.map((field, index) => (
              <div key={index} className={styles.inputContainer}>
                  {field.icon}
                {/* <div className={styles.iconContainer}>
                </div> */}
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  value={field.value}
                  onChange={field.onChange}
                  className={styles.inputField}
                />
                {field.name === "password" && (
                  <span onClick={field.onToggle} className={styles.eyeIcon}>
                    {field.toggleIcon}
                  </span>
                )}
                {error[field.name] && (
                  <span className={styles.error}>{error[field.name]}</span>
                )}
              </div>
            ))}
            <button type="submit" className={styles.submitButton}>Login</button>
          </form>
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
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        pauseOnFocusLoss
      />
    </div>
  );
}
