import { Route, Routes } from "react-router-dom";
import { useState, createContext } from "react";
import Profile from "./components/Profile";
import Cart from "./components/Cart";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Product, { IProductData2 } from "./components/Product";
// import { IProductData2 } from "./components/Product";

export const cartContext = createContext<any>(null);
export const ProfileContext = createContext<any>(null);

interface IInitialData {
  cartList: IProductData2[] | [];
}

const initialData = {
  cartList: [],
};

export interface IAddress {
  addressName: string;
  houseNo: string;
  addressOne: string;
  addressTwo: string;
  landmark: string;
  city: string;
  pincode: string;
}

export const initialValues = {
  addressName: "",
  houseNo: "",
  addressOne: "",
  addressTwo: "",
  landmark: "",
  city: "",
  pincode: "",
};

function App() {
  const [state, setState] = useState<IInitialData>(initialData);
  const [userData, setUserData] = useState<any>(null);
  const [profileArray, setProfileArray] = useState<IAddress[] | []>([]);
  const [addressNamesArray, setAddressNamesArray] = useState<string[] | []>([]);

  const incrementQuantity = (id: number) => {
    setState({
      cartList: state.cartList.map((each: IProductData2) => {
        if (each.id === id) {
          return { ...each, quantity: each.quantity + 1 };
        }
        return each;
      }),
    });
  };

  const decrementQuantity = (id: number, quantity: number) => {
    if (quantity === 1) {
      removeCartItem(id);
    } else {
      setState({
        cartList: state.cartList.map((each: IProductData2) => {
          if (each.id === id) {
            return { ...each, quantity: each.quantity - 1 };
          }
          return each;
        }),
      });
    }
  };

  const removeCartItem = (id: number) => {
    setState({
      ...state,
      cartList: state.cartList.filter((each: IProductData2) => {
        if (each.id !== id) {
          return true;
        }
        return false;
      }),
    });
  };

  // const incrementQunatity = (id:number)=>{
  //   setState({
  //     cartList: state.cartList.
  //   })
  // }

  return (
    <ProfileContext.Provider value={{ setUserData, userData }}>
      <cartContext.Provider
        value={{
          state,
          setState,
          incrementQuantity,
          decrementQuantity,
          removeCartItem,
          profileArray,
          setProfileArray,
          addressNamesArray,
          setAddressNamesArray,
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<Product />} />
        </Routes>
      </cartContext.Provider>
    </ProfileContext.Provider>
  );
}

export default App;
