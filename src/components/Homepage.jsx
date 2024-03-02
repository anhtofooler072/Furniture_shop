import React from 'react'
import { Link } from 'react-router-dom'

export default function Homepage() {
  return (
    <div>
      <div className="banner">
        <div className="bannerTitle">
          <h6>Black Friday in july</h6>
          <h1>Up to 50% off</h1>
          <h4>Hundreds of styles available</h4>
        </div>
        <div className="bannerButton">
        <Link to="/shop_all" className="btn">Shop now</Link>
        </div>
      </div>
      <div className="partner">
        
      </div>
    </div>
  )
}
