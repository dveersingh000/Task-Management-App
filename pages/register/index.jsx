import React from 'react'
import Form from '../../components/form'
import { useState } from 'react'

export default function Register() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [error, setError] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  })

  const formFields = [
    {
      name: "name",
      type: "text",
      placeholder: "Enter your name",
      onchange: (e) => setFormData({ ...formData, name: e.target.value }),
    },
    {
      name: "email",
      type: "email",
      placeholder: "Enter your email",
      onchange: (e) => setFormData({ ...formData, email: e.target.value }),
    },
    {
      name: "password",
      type: "password",
      placeholder: "Enter your password",
      onchange: (e) => setFormData({ ...formData, password: e.target.value }),
    },
    {
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm your password",
      onchange: (e) => setFormData({ ...formData, confirmPassword: e.target.value }),
    },
  ]
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    console.log(errorMessage.name.isValid);
    Object.keys(errorMessage).forEach((key) => {
      if (!errorMessage[key].isValid) {
        errorMessage[key].onError();
      }
    })
  }
  console.log(error);
  const errorMessage = {
    name: {
      message: "Name is required",
      isValid: formData?.name?.length > 0,
      onError: () => {
        setError((error) => ({ ...error, name: true }))
      }
    },
    email: {
      message: "Email is required",
      isValid: formData.email.length > 0,
      onError: () => {
        setError((error) => ({ ...error, email: true }))
      }
    },
    password: {
      message: "Password is required",
      isValid: formData.password.length > 0,
      onError: () => {
        setError((error) => ({ ...error, password: true }))
      }
    },
    confirmPassword: {
      message: "Passwords do not match",
      isValid: formData.confirmPassword === formData.password,
      onError: () => {
        setError((error) => ({ ...error, confirmPassword: true }))
      }
    }
  }

  return (
    <><div>Register</div><Form error={error} formFields={formFields} onSubmit={onSubmit} errorMessage={errorMessage} /></>
  )
}
