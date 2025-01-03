import React from "react";
import "./Register.css";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import axios from "axios";
import { registerschema } from "../../../schemas/registerSchema";
const Register = () => {
  const navigate = useNavigate();

  const notify = (text, type) =>
    toast(text, {
      type: type,
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });;

  const submitForm = async (values, action) => {
    const { data } = await axios.get("http://localhost:3000/users");

    const existUser = data.find(
      (user) => user.email === values.email || user.username === values.username
    );

    if (existUser) {
      notify("User already exists", "error");
      return;
    }
    await axios.post("http://localhost:3000/users", values);
    notify("User registered successfully", "success");
    setTimeout(() => {
      action.resetForm();
      navigate("/login");
    }, 2000);
    
  };

  const { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues: {
      name: "",
      surname: "",
      username: "",
      email: "",
      password: "",
      confirmpassword: "",
      isLogin: false,
      wishlist: [],
      basket: [],
    },
    onSubmit: submitForm,
    validationSchema: registerschema,
  });

  return (
    <div className="register-container">
      <form className="register-form" action="" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <div>
          <div className="label-container">
            <label htmlFor="name">Name</label>
            {errors.name ? <span className="error">{errors.name}</span> : null}
          </div>
          <input
            type="text"
            id="name"
            value={values.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <div className="label-container">
            <label htmlFor="surname">Surname</label>
            {errors.surname ? (
              <span className="error">{errors.surname}</span>
            ) : null}
          </div>
          <input
            type="text"
            id="surname"
            value={values.surname}
            onChange={handleChange}
          />
        </div>
        <div>
          <div className="label-container">
            <label htmlFor="username">Username</label>
            {errors.username ? (
              <span className="error">{errors.username}</span>
            ) : null}
          </div>
          <input
            type="text"
            id="username"
            value={values.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <div className="label-container">
            <label htmlFor="email">Email</label>
            {errors.email ? (
              <span className="error">{errors.email}</span>
            ) : null}
          </div>
          <input
            type="email"
            id="email"
            value={values.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <div className="label-container">
            <label htmlFor="password">Password</label>
            {errors.password ? (
              <span className="error">{errors.password}</span>
            ) : null}
          </div>
          <input
            type="password"
            id="password"
            value={values.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <div className="label-container">
            <label htmlFor="confirmpassword">ConfirmPassword</label>
            {errors.confirmpassword ? (
              <span className="error">{errors.confirmpassword}</span>
            ) : null}
          </div>
          <input
            type="password"
            id="confirmpassword"
            value={values.confirmpassword}
            onChange={handleChange}
          />
        </div>
        <div>
        Already have an account?
          <Link to="/login"> Sign In</Link>
        </div>
        <button className="register-btn" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Register;
