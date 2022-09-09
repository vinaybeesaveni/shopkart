import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { BiStore } from "react-icons/bi";
import { BsFillStarFill } from "react-icons/bs";
import Header from "../Header";
import "./index.css";
import SimilarProducts from "../SimilarProducts";

export interface IProductData {
  title: string;
  style: String;
  description: string;
  price: number;
  rating: number;
  totalReviews: number;
  imageUrl: string;
  availability: string;
  brand: string;
}

const initialValues = {
  title: "",
  style: "",
  description: "",
  price: "",
  rating: 0,
  totalReviews: 0,
  imageUrl: "",
  availability: "",
  brand: "",
  similarProducts: [],
};
const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  loading: "LOADING",
};

const Product = () => {
  const { id } = useParams();
  const [data, setData] = useState(initialValues);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);

  useEffect(() => {
    const jwtToken = Cookies.get("jwt-token");
    setApiStatus(apiStatusConstants.loading);
    axios({
      method: "get",
      url: `https://apis.ccbp.in/products/${id}`,
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }).then((response) => {
      const product = response.data;
      const data = {
        price: product.price,
        title: product.title,
        description: product.description,
        brand: product.brand,
        rating: product.rating,
        availability: product.availability,
        style: product.style,
        totalReviews: product.total_reviews,
        imageUrl: product.image_url,
        similarProducts: product.similar_products,
      };
      console.log(data.similarProducts);
      setData(data);
      setApiStatus(apiStatusConstants.success);
    });
  }, [id]);

  const renderSuccessView = () => {
    return (
      <>
        <div className="product-card">
          <div className="product-images-container">
            <img src={data.imageUrl} className="product-image" />
            <div className="image-carousel-container">
              <img src={data.imageUrl} className="image-carousel" />
              <img src={data.imageUrl} className="image-carousel" />
              <img src={data.imageUrl} className="image-carousel" />
              <img src={data.imageUrl} className="image-carousel" />
            </div>
          </div>
          <div className="product-details-container">
            <div className="store-tag">
              <BiStore className="store-icon" />
              <p className="store-text">Official Store</p>
            </div>
            <h1 className="product-title">{data.title}</h1>
            <div className="ratings-container">
              <BsFillStarFill className="rating-icon" />
              <p className="product-rating">{data.rating}</p>
              <p className="product-reviews">({data.totalReviews} reviews)</p>
            </div>
            <div className="price-container">
              <p className="actual-price">
                Rs. {Math.ceil((Number(data.price) * 5) / 4)}/-
              </p>
              <p className="discounted-price">
                Rs. <span className="price-span">{data.price}/-</span>
              </p>
              <div className="discount-container">
                <p className="discount">25% OFF</p>
              </div>
            </div>
            <p className="product-description">{data.description}</p>
            <button className="add-to-cart-btn">Add to Cart</button>
            <button className="buy-now-btn">Buy Now</button>
          </div>
        </div>
        {/* <h1>Similar Products</h1>
        <div>
          <ul>
            {data.similarProducts.map((each: IProductData) => (
              <SimilarProducts each={each} />
            ))}
          </ul>
        </div> */}
      </>
    );
  };

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

  const renderProduct = () => {
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
      <div className="product-container">{renderProduct()}</div>
    </>
  );
};

export default Product;
