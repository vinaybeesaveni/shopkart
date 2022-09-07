import { FormEvent, useState, ChangeEvent } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { AiFillPhone } from "react-icons/ai";
import { RiLockPasswordFill } from "react-icons/ri";

import "./index.css";
import Cookies from "js-cookie";
import { Link, Navigate, useNavigate } from "react-router-dom";
import ShopKartWelcomeCard from "../ShopKartWelcomeCard";

const initialValues = {
  fullName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

const validation: { [key: string]: boolean } = {
  fullName: false,
  email: false,
  phone: false,
  password: false,
  confirmPassword: false,
};

const Register2 = () => {
  const [formValues, setFormValues] = useState(initialValues);
  const [fullNameError, setFullNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [passwordError, setPasswordErrror] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const navigate = useNavigate();

  const validateFullName = () => {
    const value = formValues.fullName.trim();
    validation.fullName = false;
    let error = "";
    if (value === "") {
      error = "Required";
    } else if (value.length < 3) {
      error = "Name should be of min 3 characters";
    } else if (
      /\d/.test(value) ||
      /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value)
    ) {
      error = "Name should not contain numbers or special characters";
    } else {
      error = "";
      validation.fullName = true;
    }

    setFullNameError(error);
  };

  const validatePhoneNumber = () => {
    const value = formValues.phone;
    validation.phone = false;
    let error = "";
    if (value === "") {
      error = "Required";
    } else if (value.length !== 10) {
      error = "Min 10 characters";
    } else {
      error = "";
      validation.phone = true;
    }

    setPhoneNumberError(error);
  };

  const validateEmail = () => {
    const value = formValues.email;
    let error = "";
    validation.email = false;
    const re =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (value === "") {
      error = "Required";
    } else if (!re.test(value.toLocaleLowerCase())) {
      error = "Not a valid format";
    } else {
      error = "";
      validation.email = true;
    }
    setEmailError(error);
  };

  const validatePassword = () => {
    const value = formValues.password;
    validation.password = false;
    let error = "";
    const re =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (value === "") {
      error = "Required";
    } else if (!re.test(value)) {
      error =
        "Password should contain atleast one lowercase, uppercase, number, special character with minimum length 8";
    } else {
      error = "";
      validation.password = true;
    }

    setPasswordErrror(error);
  };

  const validateConfirmPassword = () => {
    let value = formValues.confirmPassword;
    let password = formValues.password;
    let error = "";
    if (value === "") {
      error = "Required";
    } else if (value !== password) {
      error = "Passwords do not match";
    } else {
      error = "";
      validation.confirmPassword = true;
    }

    setConfirmPasswordError(error);
  };

  const submitForm = (event: FormEvent) => {
    event.preventDefault();
    validateFullName();
    validatePhoneNumber();
    validateEmail();
    validatePassword();
    validateConfirmPassword();
    const keys = Object.keys(validation);
    let value = keys.every((key) => validation[key]);
    if (value) {
      navigate("/login");
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const jwtToken = Cookies.get("jwt-token");
  if (!jwtToken) {
    return <Navigate to="/" />;
  }

  return (
    <div className="register-container">
      <ShopKartWelcomeCard />
      <form className="form" onSubmit={submitForm}>
        <h2 className="register-heading">Register</h2>
        <div>
          <div className="input-container">
            <BsFillPersonFill className="icon" />
            <input
              placeholder="Full Name"
              type="text"
              name="fullName"
              className="input"
              onChange={handleChange}
              value={formValues.fullName}
              onBlur={validateFullName}
            />
          </div>
          <p className="error-msg">{fullNameError}</p>
          <div className="input-container">
            <MdEmail className="icon" />
            <input
              placeholder="Email"
              type="email"
              name="email"
              className="input"
              onChange={handleChange}
              value={formValues.email}
              onBlur={validateEmail}
            />
          </div>
          <p className="error-msg">{emailError}</p>
          <div className="input-container">
            <AiFillPhone className="icon" />
            <input
              placeholder="Phone Number"
              type="text"
              name="phone"
              className="input"
              onChange={(event) =>
                !isNaN(Number(event.target.value)) && handleChange(event)
              }
              value={formValues.phone}
              onBlur={validatePhoneNumber}
              maxLength={10}
            />
          </div>
          <p className="error-msg">{phoneNumberError}</p>
          <div className="input-container">
            <RiLockPasswordFill className="icon" />
            <input
              placeholder="Password"
              type="password"
              name="password"
              className="input"
              onChange={handleChange}
              value={formValues.password}
              onBlur={validatePassword}
              maxLength={20}
            />
          </div>
          <p className="error-msg">{passwordError}</p>
          <div className="input-container">
            <RiLockPasswordFill className="icon" />
            <input
              placeholder="Confirm Password"
              type="password"
              name="confirmPassword"
              className="input"
              onChange={handleChange}
              value={formValues.confirmPassword}
              onBlur={validateConfirmPassword}
              maxLength={20}
            />
          </div>
          <p className="error-msg">{confirmPasswordError}</p>
        </div>
        <button type="submit" className="sign-up-btn">
          Sign Up
        </button>
        <p className="login-link">
          Already have an acount ? <Link to="/login">Login here</Link>
        </p>
      </form>
      {/* <div className="cards">
        <div className="card1"></div>
        <div className="card2"></div>
        <div className="card3"></div>
        <div className="card4"></div>
        <div className="card5"></div>
        <div className="card6"></div>
        <div className="card7"></div>
        <div className="card8"></div>
      </div> */}
    </div>
  );
};

export default Register2;
