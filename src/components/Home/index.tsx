import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import Cookies from "js-cookie";
import axios from "axios";
import RenderProduct from "../RenderProduct";
import "./index.css";
import Header from "../Header";
import Footer from "../Footer";

export interface IData {
  id: number;
  title: string;
  thumbnail: string;
  description: string;
  brand: string;
  rating: number;
  price: number;
}

export interface IProductData {
  id: number;
  title: string;
  image_url: string;
  description: string;
  brand: string;
  rating: number;
  price: number;
}

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  loading: "LOADING",
};

function Home() {
  const [data, setData] = useState<IData[]>([]);
  const [paginationValue, setPagination] = useState(15);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);

  const renderData = (data: IData[]) => {
    setData(data);
  };
  const jwtToken = Cookies.get("jwt-token");

  useEffect(() => {
    setApiStatus(apiStatusConstants.loading);
    const getData = () => {
      axios({
        method: "get",
        // url: "https://dummyjson.com/products",
        url: "https://apis.ccbp.in/products?sort_by=PRICE_HIGH&category=&title_search=&rating=1",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }).then((response) => {
        // console.log(response);
        const data = response.data.products.map((each: IProductData) => {
          return {
            id: each.id,
            title: each.title,
            thumbnail: each.image_url,
            description: "Lorem ipsuma hsjasna sjhsnzmN zjhzjJZnj",
            brand: each.brand,
            rating: each.rating,
            price: each.price,
          };
        });
        console.log(response);
        if (response.status === 200) {
          renderData(data);
          setApiStatus(apiStatusConstants.success);
        } else {
          setApiStatus(apiStatusConstants.failure);
        }
      });
    };
    getData();
  }, [jwtToken]);

  const changePagination = () => {
    if (paginationValue + 15 > data.length) {
      setPagination(data.length);
    } else {
      setPagination((prevState) => prevState + 15);
    }
  };

  if (jwtToken === undefined) {
    return <Navigate to="/login" />;
  }

  const renderSuccessView = () => (
    <div className="home-container">
      <ul className="list">
        {data.slice(0, paginationValue).map((each: IData) => (
          <RenderProduct each={each} key={each.id} />
        ))}
      </ul>
      {paginationValue !== data.length && (
        <button className="view-more-btn" onClick={changePagination}>
          View More
        </button>
      )}
    </div>
  );

  const renderLoadingView = () => (
    <div className="loader-container">
      <ThreeDots
        height="80"
        width="60"
        radius="5"
        color="black"
        ariaLabel="three-dots-loading"
      />
    </div>
  );
  const renderFailureView = () => <p>Failure View</p>;

  const renderPage = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderSuccessView();
      case apiStatusConstants.loading:
        return renderLoadingView();
      case apiStatusConstants.failure:
        return renderFailureView();
      default:
        return null;
    }
  };

  return (
    <>
      <Header />
      <div className="App">
        <div className="test-bg">
          <h1 className="heading">Welcome To ShopKart</h1>
          <p className="tag">Get Your orders delivered in 48 hours</p>
          <button className="shop-now-btn">Shop Now</button>
        </div>
        {renderPage()}
      </div>
      <Footer />
    </>
  );
}

export default Home;
