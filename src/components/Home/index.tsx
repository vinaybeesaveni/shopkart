import { useEffect, useState } from "react";
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

  useEffect(() => {
    // const getData = () => {
    //   axios
    //     .get("https://jsonplaceholder.typicode.com/todos")
    //     .then((response) => {
    //       console.log(response);
    //     });
    // };
    const getData = () => {
      axios({
        method: "get",
        // url: "https://jsonplaceholder.typicode.com/posts?_limit=5",
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
  return (
    <>
      <Header />
      <div className="App">
        <div className="test-bg"></div>
        <ul className="list">
          {data.map((each: IData) => (
            <RenderProduct each={each} />
          ))}
        </ul>
      </div>
    </>
  );
}

export default Home;
