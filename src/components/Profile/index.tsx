import { useContext, useState, FormEvent, ChangeEvent } from "react";
import Popup from "reactjs-popup";
import Cookies from "js-cookie";
import { cartContext, ProfileContext } from "../../App";
import Footer from "../Footer";
import Header from "../Header";
import "./index.css";
import { Navigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { IAddress, initialValues } from "../../App";
import axios from "axios";

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  loading: "LOADING",
  failure: "FAILURE",
};

interface IPinData {
  Country: string;
  District: string;
  Name: string;
  State: string;
}
// const initialValues = {
//   Country:'',
//   District:'',
//   Name:'',
//   State: ''
// }

const Profile = () => {
  const [addressValues, setAddressValues] = useState<IAddress>(initialValues);
  const [pincode, setPinCode] = useState<string>("");
  const [isPinValid, setValidPin] = useState(true);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  const [data, setData] = useState<IPinData[] | []>([]);
  const pinCodeUrl = `https://api.postalpincode.in/pincode/${pincode}`;
  const {
    profileArray,
    setProfileArray,
    addressNamesArray,
    setAddressNamesArray,
  } = useContext(cartContext);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setProfileArray([...profileArray, addressValues]);
    setAddressNamesArray([...addressNamesArray, addressValues.addressName]);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setAddressValues({ ...addressValues, [name]: value });
  };

  const handlePinChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPinCode(event.target.value);
    setValidPin(event.target.value.length < 6 ? true : false);
  };

  const deleteAddress = (name: string) => {
    setProfileArray(
      profileArray.filter((each: IAddress) => each.addressName !== name)
    );
    setAddressNamesArray(
      addressNamesArray.filter((each: string) => each !== name)
    );
  };

  const searchCity = () => {
    console.log(pincode);
    setApiStatus(apiStatusConstants.loading);
    axios({
      method: "GET",
      url: pinCodeUrl,
    })
      .then((response) => {
        console.log(response.data[0].PostOffice);
        const formattedData = response.data[0].PostOffice.map(
          (each: IPinData) => ({
            Country: each.Country,
            State: each.State,
            Name: each.Name,
            District: each.District,
          })
        );
        setData(formattedData);
        setApiStatus(apiStatusConstants.success);
      })
      .catch((error) => {
        console.log(error);
        setApiStatus(apiStatusConstants.failure);
      });
  };

  const renderSuccessView = () => (
    <select className="pincode-select-list">
      {data.map((each: IPinData) => (
        <option key={each.Name} value={each.Name}>
          {each.Name}
        </option>
      ))}
    </select>
  );

  const renderLoadingView = () => (
    <div className="pin-loader-container">
      <ThreeDots
        height="80"
        width="60"
        radius="5"
        color="black"
        ariaLabel="three-dots-loading"
      />
    </div>
  );
  const renderFailurView = () => <p>Failed</p>;

  const renderCityList = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderSuccessView();
      case apiStatusConstants.loading:
        return renderLoadingView();
      case apiStatusConstants.failure:
        return renderFailurView();
      default:
        return null;
    }
  };

  const { userData } = useContext(ProfileContext);
  const jwtToken = Cookies.get("jwt-token");
  if (!jwtToken) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Header />
      <div className="profile-container">
        <div className="details-card">
          <h1 className="profile-details-heading">Profile Details</h1>
          <div className="profile-detials-container">
            <div className="name-container">
              <h4 className="name-heading">Name</h4>
              <p className="name">{userData.fullName}</p>
            </div>
            <div className="name-container">
              <h4 className="name-heading">Phone Number</h4>
              <p className="name">
                {userData.phone ? userData.phone : "Not Set"}
              </p>
            </div>
            <div className="name-container">
              <h4 className="name-heading">Email</h4>
              <p className="name">{userData.email}</p>
            </div>
            <div className="name-container">
              <h4 className="name-heading">Date of Birth</h4>
              <input type="date" className="date-input" />
            </div>
          </div>
          <h4 className="name-heading">Gender</h4>
          <div className="gender-btns-container">
            <input type="radio" name="gender" className="gender-input" />
            <label className="gender-label">Male</label>
            <input type="radio" name="gender" className="gender-input" />
            <label className="gender-label">Female</label>
            <input type="radio" name="gender" className="gender-input" />
            <label className="gender-label">Others</label>
          </div>
          <h4 className="name-heading">Premium Membership</h4>
          <p className="name">Active</p>
        </div>
        <div className="your-address-container">
          <h1 className="profile-details-heading">Your Addresses</h1>
          {profileArray.length !== 0 ? (
            <ul className="address-list">
              {profileArray.map((each: IAddress) => (
                <li id={each.addressName} className="address-item">
                  <h3 className="address-name">{each.addressName}</h3>
                  <p className="house-no">{each.houseNo}</p>
                  <p className="house-no">{each.addressOne}</p>
                  <p className="house-no">{each.addressTwo}</p>
                  <p className="house-no">{each.landmark}</p>
                  <p className="house-no">{each.city}</p>
                  <p className="house-no">{each.pincode}</p>
                  <button onClick={() => deleteAddress(each.addressName)}>
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No Addresses</p>
          )}

          <div>
            <input
              type="text"
              placeholder="Enter Pincode"
              className="pincode-input"
              maxLength={6}
              value={pincode}
              onChange={(event) =>
                !isNaN(Number(event.target.value)) && handlePinChange(event)
              }
              minLength={6}
            />
            <button
              className={!isPinValid ? "search-pincode-btn" : "disabled-btn"}
              disabled={isPinValid}
              onClick={searchCity}
            >
              Search
            </button>
          </div>
          {renderCityList()}
          <div>
            <Popup
              trigger={<button className="add-address-btn">Add Address</button>}
              modal
            >
              <form className="popup-container" onSubmit={handleSubmit}>
                <input
                  placeholder="Address Name"
                  name="addressName"
                  value={addressValues.addressName}
                  onChange={handleChange}
                  className="address-input"
                />
                <input
                  placeholder="House/Flat No"
                  name="houseNo"
                  value={addressValues.houseNo}
                  onChange={handleChange}
                  className="address-input"
                />
                <input
                  placeholder="Address Line 1"
                  name="addressOne"
                  value={addressValues.addressOne}
                  onChange={handleChange}
                  className="address-input"
                />
                <input
                  placeholder="Address Line 2"
                  name="addressTwo"
                  value={addressValues.addressTwo}
                  onChange={handleChange}
                  className="address-input"
                />
                <input
                  placeholder="Landmark"
                  name="landmark"
                  value={addressValues.landmark}
                  onChange={handleChange}
                  className="address-input"
                />
                <input
                  placeholder="City"
                  name="city"
                  value={addressValues.city}
                  onChange={handleChange}
                  className="address-input"
                />
                <input
                  placeholder="Pin Code"
                  name="pincode"
                  value={addressValues.pincode}
                  onChange={handleChange}
                  className="address-input"
                />
                <button type="submit" className="add-address-btn-popup">
                  Add Address
                </button>
              </form>
            </Popup>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Profile;
