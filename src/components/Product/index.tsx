import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState, useContext, ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { BiStore } from "react-icons/bi";
import {
  BsFillStarFill,
  BsShieldFillCheck,
  BsFillSuitHeartFill,
  BsCartDashFill,
} from "react-icons/bs";
import { MdOutlineFlashOn } from "react-icons/md";
import { HiOutlineLocationMarker } from "react-icons/hi";
import Header from "../Header";
import "./index.css";
import SimilarProducts from "../SimilarProducts";
import { cartContext } from "../../App";
import Footer from "../Footer";

export interface IProductData {
  id: number;
  title: string;
  style: String;
  description: string;
  price: number;
  rating: number;
  totalReviews: number;
  image_url: string;
  availability: string;
  brand: string;
}

export interface IProductData2 {
  id: number;
  title: string;
  style: String;
  description: string;
  price: string;
  rating: number;
  totalReviews: number;
  imageUrl: string;
  availability: string;
  similarProducts: Array<IProductData>;
  brand: string;
  quantity: number;
}

const initialValues = {
  id: "",
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
  const { state, setState } = useContext(cartContext);
  // console.log(state);
  const { id } = useParams();
  const [data, setData] = useState(initialValues);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  const [showMore, setShowMore] = useState(false);
  const [quantity, setQunatity] = useState(1);

  const changeQuantity = (event: ChangeEvent<HTMLSelectElement>) => {
    setQunatity(+event.target.value);
  };

  const date = new Date();
  date.setDate(date.getDate() + 2);
  // console.log(date);
  const day = date.toLocaleString("default", { weekday: "long" });
  const dayDate = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });

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
        id: product.id,
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
      setData(data);
      setApiStatus(apiStatusConstants.success);
    });
  }, [id]);

  const changeShowMore = () => {
    setShowMore((prevState) => !prevState);
  };

  const addToCart = () => {
    const found = state.cartList.find(
      (each: IProductData2) => each.id === +data.id
    );
    if (!found) {
      setState({ cartList: [...state.cartList, { ...data, quantity }] });
    }
  };
  // console.log(state);

  const quantityArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const renderSuccessView = () => {
    return (
      <>
        <div className="product-card">
          <div className="product-images-container">
            <img src={data.imageUrl} className="product-image" alt="carousel" />
            <div className="image-carousel-container">
              <img
                src={data.imageUrl}
                className="image-carousel"
                alt="carousel"
              />
              <img
                src={data.imageUrl}
                className="image-carousel"
                alt="carousel"
              />
              <img
                src={data.imageUrl}
                className="image-carousel"
                alt="carousel"
              />
              <img
                src={data.imageUrl}
                className="image-carousel"
                alt="carousel"
              />
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
            <p className="availability">
              Availability:
              <span className="availability-span">{data.availability}</span>
            </p>
            <p className="product-brand">
              Brand:
              <span className="brand-span">{data.brand}</span>
            </p>
            <p className="product-description">
              {showMore ? data.description : data.description.slice(0, 150)}
              {showMore ? (
                <span onClick={changeShowMore} className="view-less-btn">
                  {" "}
                  view less
                </span>
              ) : (
                <span onClick={changeShowMore} className="view-less-btn">
                  {" "}
                  ...more
                </span>
              )}
            </p>
            <button className="add-to-cart-btn" onClick={addToCart}>
              <BsCartDashFill /> Add to Cart
            </button>
            <button className="buy-now-btn">
              <MdOutlineFlashOn /> Buy Now
            </button>
          </div>
        </div>
        <div className="details-container">
          <p className="product-price-heading">Rs. {data.price}/-</p>
          <div className="premium-container">
            <span className="premium">Premium</span>
            <BsShieldFillCheck className="premium-icon" />
          </div>
          <p className="delivery-by">
            Delivery by
            <span className="delivery-date">
              {day}, {dayDate + " " + month}{" "}
            </span>
          </p>
          <p className="delivery-address">
            <HiOutlineLocationMarker className="delivery-location-icon" />
            <span className="delivery-location-span">
              Deliver to Vinay - Mandal, District, 555555
            </span>
          </p>
          <p className="delivery-availability">{data.availability}</p>
          <p className="product-style">
            {data.style.slice(0, 100)}
            <span> ...</span>
          </p>
          <div>
            <label htmlFor="quantity" className="quantity-label">
              Quantity :
            </label>
            <select
              id="quantity"
              className="quantity"
              onChange={changeQuantity}
              value={quantity}
            >
              {quantityArray.map((item) => (
                <option value={item}>{item}</option>
              ))}
            </select>
          </div>
          <button className="wishlist-btn">
            Add to Wishlist <BsFillSuitHeartFill className="heart-icon" />
          </button>
          <ul className="product-delivery-list">
            <li className="emi-item">
              EMI starting from Rs. {Math.ceil(+data.price / 6)}/month
            </li>
            <li className="emi-item">Cash on delivery</li>
            <li className="emi-item"> Secured transaction</li>
          </ul>
        </div>
        <div className="similar-products-container">
          <h1 className="similar-products-heading">Similar Products</h1>
          <ul className="similar-product-list">
            {data.similarProducts.map((each: IProductData) => (
              <SimilarProducts each={each} key={each.id} />
            ))}
          </ul>
        </div>
      </>
    );
  };

  const renderLoadingView = () => (
    <div className="product-loader-container">
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
      <Footer />
    </>
  );
};

export default Product;
