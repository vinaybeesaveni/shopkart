import { Link } from "react-router-dom";
import "./index.css";
const Header = () => {
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
        <li>
          <Link to="/login" className="link">
            Login
          </Link>
        </li>
        <li className="list-link">
          <Link to="/register" className="link">
            Register
          </Link>
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
