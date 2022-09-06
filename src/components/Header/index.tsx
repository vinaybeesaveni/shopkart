import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./index.css";

const Header = () => {
  const navigate = useNavigate();
  const onLogout = () => {
    Cookies.remove("jwt-token");
    navigate("/register");
  };

  return (
    <nav className="navbar">
      <h1 className="logo">
        Shop<span className="kart">Kart</span>
      </h1>
      <ul className="nav-list">
        <li>
          <Link to="/" className="link">
            Home
          </Link>
        </li>
        <li>
          <Link to="/about" className="link">
            About
          </Link>
        </li>
        <li className="link" onClick={onLogout}>
          Logout
        </li>
        <li>
          <Link to="/contact" className="link">
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
