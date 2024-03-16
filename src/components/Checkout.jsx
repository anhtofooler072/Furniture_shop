import React from "react";

export default function Checkout() {
  return (
    <div>
      <div className="aboutUs_Header">
        <div className="TitleBox">
          <h3>Check out</h3>
        </div>
        <form>
          <div className="checkout_form">
            <div className="checkout_info">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                required
              />
            </div>
            <div className="checkout_info">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                required
              />
            </div>
            <div className="checkout_info">
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                id="address"
                name="address"
                required
              />
            </div>
            <div className="checkout_info">
              <label htmlFor="city">City:</label>
              <input
                type="text"
                id="city"
                name="city"
                required
              />
            </div>
            <div className="checkout_info">
              <label htmlFor="zip">Zip:</label>
              <input
                type="text"
                id="zip"
                name="zip"
                required
              />
            </div>
            <button
              type="submit"
              className="button_submit">
              Place Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
