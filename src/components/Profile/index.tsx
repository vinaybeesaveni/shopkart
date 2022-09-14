import Footer from "../Footer";
import Header from "../Header";
import "./index.css";

const Profile = () => {
  return (
    <>
      <Header />
      <div className="profile-container">
        <div className="details-card">
          <h1 className="profile-details-heading">Profile Details</h1>
          <div className="profile-detials-container">
            <div className="name-container">
              <h4 className="name-heading">Name</h4>
              <p className="name">VINAY BEESAVENI</p>
            </div>
            <div className="name-container">
              <h4 className="name-heading">Phone Number</h4>
              <p className="name">9876543210</p>
            </div>
            <div className="name-container">
              <h4 className="name-heading">Email</h4>
              <p className="name">vinaybeesaveni@gmail.com</p>
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
      </div>
      <Footer />
    </>
  );
};
export default Profile;
