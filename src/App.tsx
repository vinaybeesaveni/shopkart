import { Route, Routes } from "react-router-dom";
import { useState, createContext } from "react";
import About from "./components/About";
import Cart from "./components/Cart";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Product from "./components/Product";
import { IProductData2 } from "./components/Product";

export const cartContext = createContext({
  cartList: [],
  changeCartList: (data: IProductData2) => {},
});

function App() {
  const [cartList, setCartList] = useState<IProductData2[]>([]);
  const changeCartList = (data: IProductData2) => {
    setCartList([...cartList, data]);
  };

  return (
    <cartContext.Provider value={{ cartList: [], changeCartList }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<Product />} />
      </Routes>
    </cartContext.Provider>
  );
}

export default App;
