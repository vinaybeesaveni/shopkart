import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import Cookies from "js-cookie";
import "./index.css";
import { cartContext } from "../../App";

const Header = () => {
  const navigate = useNavigate();
  const onLogout = () => {
    Cookies.remove("jwt-token");
    navigate("/login");
  };

  const { state } = useContext(cartContext);

  return (
    <nav className="navbar">
      <Link to="/" style={{ textDecoration: "none" }}>
        <h1 className="logo">
          Ahex<span className="kart">Kart</span>
        </h1>
      </Link>

      <ul className="nav-list">
        <li>
          <Link to="/profile" className="link">
            Profile
          </Link>
        </li>
        <li>
          <Link to="/cart" className="link">
            Cart{" "}
            {state.cartList.length !== 0 && (
              <span className="cart-count">{state.cartList.length}</span>
            )}
          </Link>
        </li>
        <li onClick={onLogout}>
          <button className="logout-btn">Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
