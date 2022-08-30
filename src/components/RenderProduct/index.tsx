import { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { IData } from "../Home";
import "./index.css";

interface Props {
  each: IData;
}

const RenderProduct = ({ each }: Props) => {
  const [isShowMore, setShowMore] = useState(false);
  return (
    <li key={each.id} className="card">
      <p className="title">{each.title}</p>
      <p className="brand">{each.brand}</p>
      <img src={each.thumbnail} alt={each.title} className="image" />
      <p className="description">
        {isShowMore ? each.description : each.description.substring(0, 40)}
        {!isShowMore && (
          <span
            onClick={() => setShowMore((prevState) => !prevState)}
            className="more"
          >
            ...
          </span>
        )}
      </p>
      <div className="price-section">
        <p className="rating">
          <AiFillStar className="star" /> {each.rating}
        </p>
        <p className="price">
          <span className="rupees">Rs. </span>
          {each.price} /-
        </p>
      </div>
    </li>
  );
};

export default RenderProduct;
