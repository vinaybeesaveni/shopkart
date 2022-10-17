import Header from "../Header";
import Footer from "../Footer";
import Cookies from "js-cookie";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import "./index.css";
import { IData } from "../Home";
import { cartContext } from "../../App";
import { IProductData } from "../Product";
import { ThreeDots } from "react-loader-spinner";
import RenderProduct from "../RenderProduct";

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  loading: "LOADING",
};

const priceList = [
  {
    min: 499,
    max: 999,
    displayText: "Rs.499 to Rs.999",
  },
  {
    min: 1000,
    max: 1999,
    displayText: "Rs.1000 to Rs.1999",
  },
  {
    min: 2000,
    max: 5999,
    displayText: "Rs.2000 to Rs.5999",
  },
  {
    min: 6000,
    max: 9999,
    displayText: "Rs.6000 to Rs.9999",
  },
  {
    min: 10000,
    max: Infinity,
    displayText: "> Rs.10000",
  },
];
const categoryOptions = [
  {
    name: "Clothing",
    categoryId: "1",
  },
  {
    name: "Electronics",
    categoryId: "2",
  },
  {
    name: "Appliances",
    categoryId: "3",
  },
  {
    name: "Grocery",
    categoryId: "4",
  },
  {
    name: "Toys",
    categoryId: "5",
  },
];

const ratingsList = [
  {
    ratingId: "4",
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png",
  },
  {
    ratingId: "3",
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png",
  },
  {
    ratingId: "2",
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png",
  },
  {
    ratingId: "1",
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png",
  },
];

const SearchResults = () => {
  const { searchInput } = useContext(cartContext);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  const [data, setData] = useState<IData[]>([]);
  const jwtToken = Cookies.get("jwt-token");
  const [paginationValue, setPaginationValue] = useState(12);
  const [category, setCategory] = useState(1);
  const [rating, setRating] = useState(1);
  const [price, setPrice] = useState({ min: 0, max: Infinity });

  const url = `https://apis.ccbp.in/products?sort_by=PRICE_HIGH&category=${category}&title_search=${searchInput}&rating=${rating}`;

  const renderData = (data: IData[]) => setData(data);

  useEffect(() => {
    setApiStatus(apiStatusConstants.loading);
    const getData = () => {
      axios({
        method: "get",
        url: url,
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
          renderData(
            data.filter((each: IProductData) => {
              const a = each.title
                .toLowerCase()
                .includes(searchInput.toLowerCase());
              const b = each.price > price.min && each.price < price.max;
              return a && b;
            })
          );
          setApiStatus(apiStatusConstants.success);
        } else {
          setApiStatus(apiStatusConstants.failure);
        }
      });
    };
    getData();
  }, [url, price]);

  const renderLoadingView = () => (
    <div className="loader-container-search-results">
      <ThreeDots
        height="80"
        width="60"
        radius="5"
        color="black"
        ariaLabel="three-dots-loading"
      />
    </div>
  );

  const renderSuccessView = () => (
    <div>
      {data.length === 0 ? (
        <div className="no-search-results-container">
          <h2 className="no-results-heading">
            No Results Found for '{searchInput}'
          </h2>
          <p>Try Changing Filters or Search Text</p>
          {/* <h2>You May Like</h2> */}
        </div>
      ) : (
        <div>
          <ul className="product-list">
            {data.slice(0, paginationValue).map((each: IData) => (
              <RenderProduct key={each.id} each={each} />
            ))}
          </ul>
          {data.length > paginationValue && (
            <div className="viewmore-container">
              <button
                className="view-more-btn"
                onClick={() => setPaginationValue(paginationValue + 12)}
              >
                View More
              </button>
            </div>
          )}
          <h2>You may also like ...</h2>
        </div>
      )}
    </div>
  );

  const renderFailureView = () => <h1>Failure</h1>;

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

  // const changeCategory = (id: string) => setCategory(id);

  return (
    <>
      <Header />
      <div className="search-results-container">
        <div className="filters-container">
          <h2>Filters</h2>
          {/* <ul className="category-list">
            <li>
              <input type="checkbox" id="clothing" />
              <label htmlFor="clothing">Clothing</label>
            </li>
            <li>
              <input type="checkbox" id="electronics" />
              <label htmlFor="electronics">Electronics</label>
            </li>
            <li>
              <input type="checkbox" id="appliances" />
              <label htmlFor="appliances">Appliances</label>
            </li>
            <li>
              <input type="checkbox" id="grocery" />
              <label htmlFor="grocery">Grocery</label>
            </li>
            <li>
              <input type="checkbox" id="toys" />
              <label htmlFor="toys">Toys</label>
            </li>
          </ul> */}
          <h3 className="categories-heading">Categories</h3>
          <ul className="category-list">
            {categoryOptions.map((each: any) => (
              <li onClick={() => setCategory(each.categoryId)}>{each.name}</li>
            ))}
          </ul>
          <h3 className="categories-heading">Rating</h3>
          <ul className="ratings-list">
            {ratingsList.map((each: any) => (
              <li onClick={() => setRating(each.ratingId)}>
                &gt; {each.ratingId}
              </li>
            ))}
          </ul>
          <h3 className="categories-heading">Price Range</h3>
          <ul className="price-list">
            {priceList.map((each: any) => (
              <li onClick={() => setPrice({ min: each.min, max: each.max })}>
                {each.displayText}
              </li>
            ))}
          </ul>
          {/* <button>Apply</button> */}
        </div>
        <div className="products-container">{renderPage()}</div>
      </div>
      <Footer />
    </>
  );
};

export default SearchResults;
