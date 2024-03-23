import React from "react";
import { NavLink } from "react-router-dom";
import { IoLogoFacebook } from "react-icons/io5";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import "./Static.css";

export default function Footer_components() {
  return (
    <div className="footerContainer">
      <div className="footerNav">
        <div className="footerLogo">
          <NavLink to="/">
            <img
              src="https://websitedemos.net/furniture-shop-04/wp-content/uploads/sites/1116/2022/07/logo-regular.png"
              alt="logo"
            />
          </NavLink>
        </div>
        <div className="flex-footer">
          <div className="footerCol">
            <h4>Links</h4>
            <NavLink to="/story">Our Story</NavLink>
            <NavLink to="/contact">Contact</NavLink>
            <NavLink to="/help">Help</NavLink>
          </div>
          <div className="footerCol">
            <h4>Categories</h4>
            <NavLink to="/shop_all">Shop All</NavLink>
            <NavLink to="/decor">Decor</NavLink>
            <NavLink to="/bedroom">Bedroom</NavLink>
            <NavLink to="/living_room">Living Room</NavLink>
            <NavLink to="/office">Office</NavLink>
          </div>
        </div>
        <div className="footerCol">
          <form action="">
            <h4>Subscribe</h4>
            <div className="SubscriptionBox">
              <input
                type="text"
                placeholder="Your Email Address..."
              />
              <button type="submit">Subscribe</button>
            </div>
          </form>
        </div>
      </div>
      <div className="footerBottom">
        <p>Copyrights &copy; 2024 Furniture Shop | Powered by Furniture Shop</p>
        <div className="footerSocial">
          <IoLogoFacebook style={{ fontSize: "30px" }} />
          <FaInstagram style={{ fontSize: "30px" }} />
          <FaXTwitter style={{ fontSize: "30px" }} />
        </div>
      </div>
    </div>
  );
}
