import { AiFillPhone } from "react-icons/ai";
import { useState, ChangeEvent } from "react";
import { RiLockPasswordFill } from "react-icons/ri";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
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

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const onFormSubmit = () => {
    Cookies.set("jwt-token", "asassas", { expires: 30 });
    navigate("/");
  };

  const jwtToken = Cookies.get("jwt-token");
  if (jwtToken !== undefined) {
    navigate("/");
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
    </div>
  );
};

export default Login;
