import { useContext } from "react";
import { Link } from "react-router-dom";
import { cartContext } from "../../App";
import { IProductData2 } from "../Product";
import CartItem from "../CartItem";
import Header from "../Header";
import "./index.css";

const Cart = () => {
  const { state } = useContext(cartContext);
  const { cartList } = state;
  let totalValue = 0;
  cartList.forEach((each: IProductData2) => {
    totalValue += +each.price * each.quantity;
  });
  const discount = Math.ceil(totalValue / 20);

  return (
    <>
      <Header />
      <div className="cart-component-container">
        <h1 className="mycart-heading">My cart</h1>
        {cartList.length === 0 ? (
          <div className="cart-empty-container">
            <h1 className="empty-card-heading">Cart is Empty</h1>
            <Link to="/">
              <button className="order-now-btn">Shop Now</button>
            </Link>
          </div>
        ) : (
          <div className="cart-price-details-container">
            <ul className="cart-list">
              {cartList.map((each: IProductData2) => (
                <CartItem each={each} key={each.id} />
              ))}
            </ul>
            <div className="order-now-container">
              <h2 className="price-details-heading">Price Details</h2>
              <div className="order-now-actual-price">
                <p className="order-now-price-heading">Price</p>
                <p className="order-now-price">&#8377; {totalValue}</p>
              </div>
              <span className="items">Items - {cartList.length}</span>
              <div className="order-now-actual-price">
                <p className="order-now-price-heading">Discount</p>
                <p className="order-now-discount">- &#8377; {discount}</p>
              </div>
              <div className="order-now-actual-price">
                <p className="order-now-delivery-heading">Delivery Charges</p>
                <p className="order-now-discount">FREE Delivery</p>
              </div>
              <div className="total-price-container">
                <p className="total-price">Total Price</p>
                <p className="total-price"> &#8377; {totalValue - discount}</p>
              </div>
              <p className="discount-tag">
                You will save &#8377; {discount} on this order
              </p>
              <div className="order-now-btn-container">
                <button className="order-now-btn">Order Now</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default Cart;
