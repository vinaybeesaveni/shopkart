import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import RenderProduct from "../RenderProduct";
import "./index.css";
import Header from "../Header";

export interface IData {
  id: number;
  title: string;
  thumbnail: string;
  description: string;
  brand: string;
  rating: number;
  price: number;
}

function Home() {
  const [data, setData] = useState<IData[]>([]);

  const renderData = (data: IData[]) => {
    setData(data);
  };
  const jwtToken = Cookies.get("jwt-token");

  useEffect(() => {
    const getData = () => {
      axios({
        method: "get",
        url: "https://dummyjson.com/products",
      }).then((response) => {
        const data = response.data.products.map((each: IData) => {
          return {
            id: each.id,
            title: each.title,
            thumbnail: each.thumbnail,
            description: each.description,
            brand: each.brand,
            rating: each.rating,
            price: each.price,
          };
        });
        renderData(data);
      });
    };
    getData();
  }, []);

  if (jwtToken === undefined) {
    return <Navigate to="/register" />;
  }

  return (
    <>
      <Header />
      <div className="App">
        <div className="test-bg">
          <h1 className="heading">Welcome To ShopKart</h1>
          <p className="tag">Get Your orders delivered in 48 hours</p>
          <button className="shop-now-btn">Shop Now</button>
        </div>
        <ul className="list">
          {data.map((each: IData) => (
            <RenderProduct each={each} key={each.id} />
          ))}
        </ul>
      </div>
    </>
  );
}

export default Home;
