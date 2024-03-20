import { onSnapshot, query } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../contexts/FirebaseProvider";
import { NavLink, useNavigate } from "react-router-dom";
import CartProduct from "./CartProduct";
import { signInWithPopup, getAuth } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";

export default function Cart() {
  let storagebuy = null;

  let [data, setData] = useState([]);
  const { messItem } = useContext(FirebaseContext);

  useEffect(() => {
    const q = query(messItem);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const temp = [];
      querySnapshot.forEach((doc) => {
        temp.push({ ...doc.data(), id: doc.id });
      });
      setData(temp);
    });
  }, []);

  if (localStorage.getItem("yourcart") !== null) {
    storagebuy = JSON.parse(localStorage.getItem("yourcart"));
  }

  let rendercart = () => {
    if (storagebuy !== null) {
      return storagebuy.map((product) => {
        let findIndex = data.findIndex((it) => {
          return it.id == product.id;
        });
        let dataProduct = data[findIndex];
        return (
          <CartProduct
            storage={product}
            data={dataProduct}
            key={product.id}
          />
        );
      });
    }
  };

  let [subtotal, setSubtotal] = useState(0);
  useEffect(() => {
    if (storagebuy !== null) {
      let allsubtotal = 0;
      let subtotal = 0;
      storagebuy.map((product) => {
        let findIndex = data.findIndex((it) => {
          return it.id == product.id;
        });
        let dataProduct = data[findIndex];
        subtotal = dataProduct?.price * product?.amount;

        console.log(subtotal);
        allsubtotal += subtotal;
      });
      setSubtotal(allsubtotal);
    }
  }, [storagebuy]);

  let [total, setTotal] = useState(0);
  useEffect(() => {
    if (storagebuy !== null) {
      setTotal(subtotal + ship());
    }
  }, [subtotal]);
  let ship = () => {
    if (subtotal > 0) {
      return 25;
    } else {
      return 0;
    }
  };

  // check the local storage if the user is logged in
  let navigate = useNavigate();
  let user = JSON.parse(localStorage.getItem("user"));
  const auth = getAuth();
  const { provider } = useContext(FirebaseContext);
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        // save  the user to the local storage
        let userInfo = {
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
          user_id: result.user.uid,
        };
        localStorage.setItem("user", JSON.stringify(userInfo));
        navigate("/checkout");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const process_checkout = () => {
    if (user) {
      return (
        <NavLink to="/checkout">
          <button className="button_submit">Process to Checkout</button>
        </NavLink>
      );
    } else {
      return (
        <button
          onClick={signInWithGoogle}
          className="button_submit">
          <FcGoogle style={{ fontSize: "25px" }} />
          <p>Login with Google to Checkout</p>
        </button>
      );
    }
  };

  return (
    <div>
      <div className="aboutUs_Header">
        <div className="TitleBox">
          <h3>Cart</h3>
        </div>
        <div className="cart_container">
          <div className="cart_left">
            <div className="nametag-cart">
              <p className="product">Product</p>
              <p className="price">Price</p>
              <p className="quanlity">Quantity</p>
              <div className="subtotal">Subtotal</div>
            </div>
            {rendercart()}
          </div>
          <div className="cart_right">
            <div className="cart_summary">
              <h3>Summary Cart</h3>
              <div className="summary_item">
                <p>Subtotal</p>
                <p>${subtotal}</p>
              </div>
              <div className="summary_item">
                <p>Shipping</p>
                <p>${ship()}</p>
              </div>
              <div className="summary_item">
                <p>Total</p>
                <p>${total}</p>
              </div>
              {process_checkout()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
