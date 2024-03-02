import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <div>
        <NavLink to="/shop_all">Shop All</NavLink>
        <NavLink to="/decor">Decor</NavLink>
        <NavLink to="/bedroom">Bedroom</NavLink>
        <NavLink to="/living_room">Living Room</NavLink>
        <NavLink to="/office">Office</NavLink>
    </div>
  )
}
