import { useContext } from "react";
import { cartContext } from "../../App";

import { IProductData } from "../Home";

const Cart = () => {
  const { cartList } = useContext(cartContext);
  console.log(cartList);

  return (
    <ul>
      <li>Hi</li>
    </ul>
  );
};
export default Cart;
