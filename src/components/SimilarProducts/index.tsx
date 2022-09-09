import { AiFillStar } from "react-icons/ai";
import { BsFillSuitHeartFill, BsCartDashFill } from "react-icons/bs";
import { MdOutlineFlashOn } from "react-icons/md";
import { IProductData } from "../Product";
import "./index.css";

interface Props {
  each: IProductData;
}
const SimilarProducts = ({ each }: Props) => {
  console.log("HI");
  return (
    <li className="similar-product-card">
      <img
        src={each.image_url}
        alt={each.title}
        className="similar-product-img"
      />
      <div className="similar-products-details-container">
        <h2 className="similar-product-title">
          {each.title.length > 15 ? each.title.slice(0, 20) : each.title}
          {each.title.length > 15 && <span> ...</span>}
        </h2>
        <p className="similar-product-brand">{each.brand}</p>
        <p className="similar-product-description">
          {each.description.slice(0, 60)}
          <span> ...</span>
        </p>
        <div className="similar-product-price-rating-container">
          <p className="similar-product-price">Rs. {each.price}/-</p>
          <p className="similar-product-rating">
            <AiFillStar className="similar-product-rating-icon" /> {each.rating}
          </p>
        </div>
        <div className="similar-product-icons-container">
          <div className="cart-container">
            <BsCartDashFill className="similar-product-icon" />
          </div>
          <div className="wishlist-container">
            <BsFillSuitHeartFill className="similar-product-icon" />
          </div>
          <div className="buy-now-container">
            <MdOutlineFlashOn className="similar-product-icon" />
          </div>
        </div>
      </div>
    </li>
  );
};

export default SimilarProducts;
