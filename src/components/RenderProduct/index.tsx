import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import { IData } from "../Home";
import "./index.css";

interface Props {
  each: IData;
}

const RenderProduct = ({ each }: Props) => {
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
    <Link to="/product" style={{ textDecoration: "none", color: "inherit" }}>
      <li
        className="card"
        id={`${each.id}`}
        onMouseEnter={() => triggerHover(String(each.id), `img${each.id}`)}
        onMouseLeave={() => removeTrigger(String(each.id), `img${each.id}`)}
      >
        <p className="title">
          {each.title.length < 15
            ? each.title
            : each.title.substring(0, 20) + " ..."}
        </p>
        <p className="brand">{each.brand}</p>
        <img
          src={each.thumbnail}
          alt={each.title}
          className="image"
          id={`img${each.id}`}
        />
        <p className="description">
          {each.description.substring(0, 40)}
          <span> ...</span>
        </p>
        <div className="price-section">
          <p className="rating">
            <AiFillStar className="star" /> {each.rating}
          </p>
          <p className="price">
            <span className="dollars">$ </span>
            {each.price}
          </p>
        </div>
      </li>
    </Link>
  );
};

export default RenderProduct;
