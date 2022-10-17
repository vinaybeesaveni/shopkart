import { AiFillPhone } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useState, ChangeEvent, FormEvent, useContext } from "react";
import { RiLockPasswordFill } from "react-icons/ri";
import "./index.css";
import { Link, useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
// import { GiConsoleController } from "react-icons/gi";
import { signInWithGoogle } from "../../Firebase";
import { ProfileContext } from "../../App";
const initialValues = {
  loginPhoneNumber: "",
  loginPassword: "",
};
const Login = () => {
  // return (
  //   <div className="login-container">
  //     <div className="wrapper">
  //       <p>Shop</p>
  //       <div className="words">
  //         <span className="span">Kart1</span>
  //         <span className="span">Kart2</span>
  //         <span className="span">Kart3</span>
  //         <span className="span">Kart4</span>
  //         <span className="span">Kart1</span>
  //       </div>
  //     </div>
  //   </div>
  // );
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState(initialValues);
  const { setUserData } = useContext(ProfileContext);
  const dataUrl = "https://apis.ccbp.in/login";

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const postDetails = () => {
    const data = { username: "rahul", password: "rahul@2021" };
    axios({
      method: "POST",
      url: dataUrl,
      data: JSON.stringify(data),
    })
      .then((response) => {
        const jwtToken = response.data.jwt_token;
        Cookies.set("jwt-token", jwtToken, { expires: 30 });
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onFormSubmit = (event: FormEvent | any) => {
    event?.preventDefault();
    postDetails();
  };

  const loginThroughGoogle = () => {
    postDetails();
  };

  const onLoginWithGoogle = () => {
    const promise = signInWithGoogle();
    promise
      .then((result) => {
        console.log(result);
        const { user } = result;
        loginThroughGoogle();
        setUserData({
          fullName: user.displayName,
          email: user.email,
          phone: user.phoneNumber,
        });
      })
      .catch((error) => console.log(error));
  };

  const jwt = Cookies.get("jwt-token");
  if (jwt !== undefined) {
    return <Navigate to="/" />;
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={onFormSubmit}>
        <h2 className="login-heading">Login</h2>
        <div className="login-input-container">
          <AiFillPhone className="login-icon" />
          <input
            type="text"
            name="loginPhoneNumber"
            placeholder="Phone Number"
            className="login-phone-number"
            onChange={(event) =>
              !isNaN(Number(event.target.value)) && handleChange(event)
            }
            maxLength={10}
            value={formValues.loginPhoneNumber}
          />
        </div>
        <div className="login-input-container">
          <RiLockPasswordFill className="login-icon" />
          <input
            type="password"
            name="loginPassword"
            placeholder="Password"
            className="login-phone-number"
            onChange={handleChange}
            value={formValues.loginPassword}
            maxLength={20}
          />
        </div>
        <button className="login-btn" type="submit">
          Login
        </button>
      </form>
      <p className="register-tag">
        Don't have an account ? <Link to="/register">Register here</Link>
      </p>
      <button onClick={onLoginWithGoogle} className="sign-in-with-google">
        <FcGoogle className="google-icon" />
        Sign In With Google
      </button>
    </div>
  );
};

export default Login;
