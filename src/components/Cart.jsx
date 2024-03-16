import React from "react";
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { NavLink } from "react-router-dom";

export default function Cart() {
  return (
    <div>
      <div className="aboutUs_Header">
        <div className="TitleBox">
          <h3>Check out</h3>
        </div>
        <div className="cart_container">
          <div className="cart_left">
            <div className="cart_item">
              <div className="cart_item_img">
                <img
                  src="https://websitedemos.net/furniture-shop-04/wp-content/uploads/sites/1116/2022/07/product-06-a.jpg"
                  alt="product"
                />
              </div>
              <div className="cart_item_info">
                <h4>Product Name</h4>
                <p>Price: $100</p>
                <div className="cart_item_quantity">
                  <CiCircleMinus />
                  <p>1</p>
                  <CiCirclePlus />
                </div>
              </div>
            </div>
            <div className="cart_item">
              <div className="cart_item_img">
                <img
                  src="https://websitedemos.net/furniture-shop-04/wp-content/uploads/sites/1116/2022/07/product-06-a.jpg"
                  alt="product"
                />
              </div>
              <div className="cart_item_info">
                <h4>Product Name</h4>
                <p>Price: $100</p>
                <div className="cart_item_quantity">
                  <CiCircleMinus />
                  <p>1</p>
                  <CiCirclePlus />
                </div>
              </div>
            </div>
            <div className="cart_item">
              <div className="cart_item_img">
                <img
                  src="https://websitedemos.net/furniture-shop-04/wp-content/uploads/sites/1116/2022/07/product-06-a.jpg"
                  alt="product"
                />
              </div>
              <div className="cart_item_info">
                <h4>Product Name</h4>
                <p>Price: $100</p>
                <div className="cart_item_quantity">
                  <CiCircleMinus />
                  <p>1</p>
                  <CiCirclePlus />
                </div>
              </div>
            </div>
          </div>
          <div className="cart_right">
            <div className="cart_summary">
              <h3>Summary</h3>
              <div className="summary_item">
                <p>Subtotal</p>
                <p>$300</p>
              </div>
              <div className="summary_item">
                <p>Shipping</p>
                <p>$10</p>
              </div>
              <div className="summary_item">
                <p>Total</p>
                <p>$310</p>
              </div>
              <NavLink to="/checkout">
                <button className="button_submit">Checkout</button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
