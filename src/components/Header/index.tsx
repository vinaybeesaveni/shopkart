import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import Cookies from "js-cookie";
import { CgProfile } from "react-icons/cg";
import { ImExit } from "react-icons/im";
import { AiOutlineSearch } from "react-icons/ai";
import "./index.css";
import { cartContext, ProfileContext } from "../../App";

const Header = () => {
  const navigate = useNavigate();
  const { searchInput, setSearchInput } = useContext(cartContext);

  const onLogout = () => {
    Cookies.remove("jwt-token");
    navigate("/login");
  };
  const { userData } = useContext(ProfileContext);

  const { state } = useContext(cartContext);

  return (
    <nav className="navbar">
      <Link to="/" style={{ textDecoration: "none" }}>
        <h1 className="logo">
          Ahex<span className="kart">Kart</span>
        </h1>
      </Link>

      <div className="search-container">
        <input
          type="search"
          placeholder="Search for products..."
          className="search-input"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <AiOutlineSearch onClick={() => navigate("/search-results")} />
      </div>

      <ul className="nav-list">
        <li>
          <Link to="/cart" className="link">
            Cart{" "}
            {state.cartList.length !== 0 && (
              <span className="cart-count">{state.cartList.length}</span>
            )}
          </Link>
        </li>
        <li className="profile-item">
          <button className="profile-menu-btn">
            {userData.fullName}
            <CgProfile className="profile-icon" />
          </button>
          <div className="profile-dropdown">
            <Link to="/profile" className="profile-link">
              <CgProfile className="profile-icon-dropdown" />
              Profile
            </Link>
            <button className="logout-btn" onClick={onLogout}>
              <ImExit className="logout-icon" />
              Logout
            </button>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
