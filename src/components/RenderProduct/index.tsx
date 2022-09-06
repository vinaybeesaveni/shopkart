import { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { IData } from "../Home";
import "./index.css";

interface Props {
  each: IData;
}

const RenderProduct = ({ each }: Props) => {
  const [isShowMore, setShowMore] = useState(false);

  const triggerHover = (id: string, imageId: string) => {
    let list = document.getElementById(id);
    let image = document.getElementById(imageId);
    image?.classList.add("onHover");
    list?.classList.add("hover");
  };
  const removeTrigger = (id: string, imageId: string) => {
    let list = document.getElementById(id);
    let image = document.getElementById(imageId);
    list?.classList.remove("hover");
    image?.classList.remove("onHover");
  };

  return (
    <li
      className="card"
      id={`${each.id}`}
      onMouseEnter={() => triggerHover(String(each.id), `img${each.id}`)}
      onMouseLeave={() => removeTrigger(String(each.id), `img${each.id}`)}
    >
      <p className="title">{each.title}</p>
      <p className="brand">{each.brand}</p>
      <img
        src={each.thumbnail}
        alt={each.title}
        className="image"
        id={`img${each.id}`}
      />
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
