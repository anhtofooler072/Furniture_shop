import './Static.css' 
import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <div className='Navbar'>
        <NavLink to="/"><img src="https://websitedemos.net/furniture-shop-04/wp-content/uploads/sites/1116/2022/07/logo-regular.png" alt="logo" /></NavLink>
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
        </div>
    </div>
  )
}
