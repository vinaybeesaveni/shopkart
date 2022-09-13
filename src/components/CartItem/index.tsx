import { useContext } from "react";
import { IProductData2 } from "../Product";
import {
  AiFillPlusCircle,
  AiFillMinusCircle,
  AiFillCloseCircle,
} from "react-icons/ai";
import "./index.css";
import { cartContext } from "../../App";

type Props = {
  each: IProductData2;
};

const CartItem = ({ each }: Props) => {
  const { incrementQuantity, decrementQuantity, removeCartItem } =
    useContext(cartContext);

  return (
    <li className="cart-item">
      <div className="cart-image-details-container">
        <img src={each.imageUrl} className="cart-image" alt={each.title} />
        <div className="cart-details-container">
          <p className="cart-item-title">{each.title}</p>
          <p className="cart-item-brand">by {each.brand}</p>
        </div>
      </div>
      <div className="cart-buttoms-container">
        <button
          className="minus-btn"
          onClick={() => {
            decrementQuantity(each.id, each.quantity);
          }}
        >
          <AiFillMinusCircle />
        </button>
        <p className="cart-quantity">{each.quantity}</p>
        <button
          className="minus-btn"
          onClick={() => {
            incrementQuantity(each.id);
          }}
          disabled={each.quantity === 10}
        >
          <AiFillPlusCircle />
        </button>
      </div>
      <p className="cart-price">
        <span className="cart-rupees">Rs.</span> {+each.price * each.quantity}/-
      </p>
      <button
        className="minus-btn close-btn"
        onClick={() => removeCartItem(each.id)}
      >
        <AiFillCloseCircle />
      </button>
    </li>
  );
};

export default CartItem;
