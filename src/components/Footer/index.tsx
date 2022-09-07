import "./index.css";
import {
  BsInstagram,
  BsFacebook,
  BsLinkedin,
  BsTwitter,
  BsWhatsapp,
  BsYoutube,
} from "react-icons/bs";
import { FiMapPin } from "react-icons/fi";
import { ImPhone } from "react-icons/im";
import { HiMail } from "react-icons/hi";
import { AiFillQuestionCircle } from "react-icons/ai";

const Footer = () => (
  <div className="footer-container">
    <div className="footer-left-section">
      <a className="footer-link" href="#">
        About us
      </a>
      <a className="footer-link" href="#">
        Why Choose Us
      </a>
      <a className="footer-link" href="#">
        Careers
      </a>
      <a className="footer-link" href="#">
        Terms and Conditions
      </a>
      <a className="footer-link" href="#">
        Privacy Policy
      </a>
      <a className="footer-link" href="#">
        Help
      </a>
      <a className="footer-link" href="#">
        Sell on Shopkart
      </a>
      <a className="footer-link" href="#">
        Return Centres
      </a>
      <a className="footer-link" href="#">
        Press Releases
      </a>
      <a className="footer-link" href="#">
        Advertise Your Product
      </a>
    </div>
    <div className="footer-middle-section">
      <h1 className="logo">
        Shop<span className="kart">Kart</span>
      </h1>
      <div className="social-media-icons-container">
        <a href="https://www.instagram.com" target="_blank">
          <BsInstagram className="social-media-icon" />
        </a>
        <a href="https://www.facebook.com" target="_blank">
          <BsFacebook className="social-media-icon" />
        </a>
        <a href="https://www.linkedin.com" target="_blank">
          <BsLinkedin className="social-media-icon" />
        </a>
        <a href="https://www.twitter.com" target="_blank">
          <BsTwitter className="social-media-icon" />
        </a>
        <a href="https://www.whatsapp.com" target="_blank">
          <BsWhatsapp className="social-media-icon" />
        </a>
        <a href="https://www.youtube.com" target="_blank">
          <BsYoutube className="social-media-icon" />
        </a>
      </div>
      <p className="copyright-tag">All Rights Reserved</p>
      <p className="copyright-tag">&#169; 2022 Copyright: Shopkart.com</p>
    </div>
    <div className="footer-right-section">
      <div className="address-container">
        <FiMapPin className="contact-icon" />
        <span className="contact-span">Google Maps</span>
      </div>
      <div className="address-container">
        <ImPhone className="contact-icon" />
        <span className="contact-span">+91 9876543210</span>
      </div>
      <div className="address-container">
        <HiMail className="contact-icon" />
        <span className="contact-span">info@shopkart.com</span>
      </div>
      <div className="address-container">
        <AiFillQuestionCircle className="contact-icon" />
        <span className="contact-span">FAQs</span>
      </div>
    </div>
  </div>
);

export default Footer;
