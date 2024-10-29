import React, { useState} from "react";
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
      onChange: (e) => setFormData({ ...formData, name: e.target.value }),
    },
    {
      name: "email",
      type: "email",
      placeholder: "Email",
      onChange: (e) => setFormData({ ...formData, email: e.target.value }),
    },
    {
      name: "password",
      type: "password",
      placeholder: "Password",
      onChange: (e) => setFormData({ ...formData, password: e.target.value }),
    },
    {
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      onChange: (e) =>
        setFormData({ ...formData, confirmPassword: e.target.value }),
    },
  ];

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

  const onSubmit = async (e) => {
    let isError = false;
    e.preventDefault();
    console.log(errorMessage.name.isValid);
    Object.keys(errorMessage).forEach((key) => {
      if (!errorMessage[key].isValid) {
        isError = true;
        errorMessage[key].onError();
      }
    });

    if (!isError) {
      const res = await register({...formData});
      if (res.status === 200) {
        alert("Registration successful");
        navigate("/login"); 
      }else{
        alert("Something went wrong");
      }
    }
  };
  console.log(error);

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
              >Login
            </button>
             
          </div>
        </div>
      </div>
    </>
  );
}
