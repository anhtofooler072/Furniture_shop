import "./Static.css";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { LuShoppingCart } from "react-icons/lu";
import { IoPersonCircleSharp } from "react-icons/io5";
import { HiOutlineBars3 } from "react-icons/hi2";

export default function Navbar() {
  let [morenav, setMoreNav] = useState('more-navbar-button')
  let active = () => {
    if (morenav == 'more-navbar-button') {
      setMoreNav('more-navbar-button open-nav')
    } else {
      setMoreNav('more-navbar-button')
    }
  }
  return (
    <div className="">
      <div className="Navbar">
        <NavLink to="/">
          <img
            src="https://websitedemos.net/furniture-shop-04/wp-content/uploads/sites/1116/2022/07/logo-regular.png"
            alt="logo"
          />
        </NavLink>
        <div className="navButtons">
          <NavLink to="/shop_all">Shop All</NavLink>
          <NavLink to="/decor">Decor</NavLink>
          <NavLink to="/bedroom">Bedroom</NavLink>
          <NavLink to="/living_room">Living Room</NavLink>
          <NavLink to="/office">Office</NavLink>
        </div>
        <div className="navAboutUs">
          <NavLink to="/story">Our Story</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <NavLink to="/help">Help</NavLink>
          <NavLink to="/cart">
            <LuShoppingCart />
          </NavLink>
          <NavLink to='/login'><IoPersonCircleSharp style={{ fontSize: "25px" }} /></NavLink>
        </div>
      </div>
      <div className="smallNavbar">
        <div className="Navbar">
          <NavLink to="/">
            <img
              src="https://websitedemos.net/furniture-shop-04/wp-content/uploads/sites/1116/2022/07/logo-regular.png"
              alt="logo"
            />
          </NavLink>
          <div className="more-navbar">
            <p onClick={active} className="more-button"><HiOutlineBars3 /></p>
          </div>
        </div>
        <div className={morenav}>
          <NavLink to="/shop_all">Shop All</NavLink>
          <NavLink to="/decor">Decor</NavLink>
          <NavLink to="/bedroom">Bedroom</NavLink>
          <NavLink to="/living_room">Living Room</NavLink>
          <NavLink to="/office">Office</NavLink>
          <NavLink to="/cart">
            <LuShoppingCart /> <span className="name-navbar">Your Cart</span>
          </NavLink>
          <NavLink to='/login'><IoPersonCircleSharp style={{ fontSize: "40px" }} /> <span className="name-navbar">Login</span></NavLink>
        </div>
      </div>
    </div>
  );
}
