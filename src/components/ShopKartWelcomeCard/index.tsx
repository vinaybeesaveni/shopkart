import { GoDeviceMobile } from "react-icons/go";
import { GiClothes, GiNecklaceDisplay } from "react-icons/gi";
import { FaStethoscope } from "react-icons/fa";
import { MdLocalGroceryStore } from "react-icons/md";
import "./index.css";

const ShopKartWelcomeCard = () => {
  return (
    <div className="login-logo-container">
      <p className="logo">
        Ahex<span className="kart1">Kart</span>
      </p>
      <p className="login-tag">Shop What You Need ...</p>
      <ul className="login-list">
        <li className="groceries-list">
          <MdLocalGroceryStore className="groceries-icon" />
          <p className="groceries">Groceries</p>
        </li>
        <li className="groceries-list">
          <GiClothes className="groceries-icon" />
          <p className="groceries">Men's Wear</p>
        </li>
        <li className="groceries-list">
          <GoDeviceMobile className="groceries-icon" />
          <p className="groceries">Gadgets</p>
        </li>
        <li className="groceries-list">
          <GiNecklaceDisplay className="groceries-icon" />
          <p className="groceries">Jewellery</p>
        </li>
        <li className="groceries-list">
          <FaStethoscope className="groceries-icon" />
          <p className="groceries">Health Care</p>
        </li>
      </ul>
      <p className="login-tag">And Many More ...</p>
    </div>
  );
};

export default ShopKartWelcomeCard;
