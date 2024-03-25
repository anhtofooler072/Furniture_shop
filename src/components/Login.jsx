import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useContext } from "react";
import { FirebaseContext } from "../contexts/FirebaseProvider";
import { signInWithPopup, getAuth } from "firebase/auth";
import { onSnapshot, query } from "firebase/firestore";

export default function Login() {
  const auth = getAuth();
  const { provider } = useContext(FirebaseContext);
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        // save  the user to the local storage
        let userInfo = {
          name: result.user.displayName,
          firstname: result.user.displayName.split(" ")[0],
          lastname: result.user.displayName.split(" ")[1],
          email: result.user.email,
          photo: result.user.photoURL,
          user_id: result.user.uid,
        };
        localStorage.setItem("user", JSON.stringify(userInfo));
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  let checklogin = localStorage.getItem("user");
  console.log(localStorage.getItem("user"));

  // data from firebase
  let [data, setData] = useState([]);
  let [dataCustomer, setDataCustomer] = useState([]);
  const { messItem } = useContext(FirebaseContext);
  const { messCustomer } = useContext(FirebaseContext);

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

  useEffect(() => {
    const q = query(messCustomer);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const temp = [];
      querySnapshot.forEach((doc) => {
        temp.push({ ...doc.data(), id: doc.id });
      });
      setDataCustomer(temp);
    });
  }, []);

  let orderList = [];
  if (localStorage.getItem("user") !== null) {
    dataCustomer.map((customerOrder) => {
      if (
        customerOrder.costumer.customer ==
        JSON.parse(localStorage.getItem("user")).email
      ) {
        // console.log(customerOrder.costumer.customer);
        // console.log(customerOrder.cart);
        let order = {
          orderDate: customerOrder.costumer.date,
          orderPlaced: customerOrder.cart,
        };
        orderList.push(order);
        console.log(orderList);
      }
    });
  }

  let renderOrderList = () => {
    return orderList.map((order) => {
      if (order.orderPlaced.length == 0) {
        return (
          <div
            key={order.orderDate + Math.random()}
            className="orderPlacedList">
            <span>Order date: {order.orderDate}</span>
            <br />
            <div className="orderPlacedList_product">
              <p>No product in this order</p>
            </div>
            <div className="orderPlaced_total">
              <p>Total Payment: $0</p>
            </div>
          </div>
        );
      }
      let totalPayment = 0;
      return (
        <div
          key={order.orderDate + Math.random()}
          className="orderPlacedList">
          <span>Order date: {order.orderDate}</span>
          <br />
          <div className="orderPlacedList_product">
            {order.orderPlaced.map((product) => {
              let findIndex = data.findIndex((it) => {
                return it.id == product.id;
              });
              let dataProduct = data[findIndex];
              let findColor = dataProduct?.productColor.findIndex((product) => {
                return product?.color == product.color;
              });
              totalPayment += dataProduct?.price * product.amount;
              return (
                <div
                  key={product.id}
                  className="orderPlacedList_product_item">
                  <div className="orderPlacedList_product_item_img">
                    <img
                      src={dataProduct?.img[findColor]}
                      alt="product"
                    />
                    <p>{dataProduct?.productName}</p>
                  </div>
                  <div className="orderPlacedList_product_item_price">
                    <p>Price: ${dataProduct?.price}</p>
                    <p>Amount: {product.amount}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="orderPlaced_total">
            <p>Total Payment: ${totalPayment}</p>
          </div>
        </div>
      );
    });
  };

  return checklogin == null ? (
    <div>
      <div className="aboutUs_Header">
        <div className="TitleBox">
          <h3>Login</h3>
        </div>
        <div className="login_section">
          <div className="login_box">
            <div className="login_box_input">
              <p>Email</p>
              <input
                type="text"
                placeholder="Email"
              />
            </div>
            <div className="login_box_input">
              <p>Password</p>
              <input
                type="password"
                placeholder="Password"
              />
            </div>
          </div>
          <div className="login_box_button">
            <button className="button_submit">Login</button>
            <button
              onClick={signInWithGoogle}
              className="button_submit">
              <FcGoogle style={{ fontSize: "25px" }} />
              <p>Login with Google</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>
      <div className="aboutUs_Header">
        <div className="TitleBox">
          <img
            src={JSON.parse(localStorage.getItem("user")).photo}
            alt="user"
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              border: "2.5px solid #d6d6d6",
              marginBottom: "10px",
            }}
          />
          <h3>Welcome {JSON.parse(localStorage.getItem("user")).name}</h3>
        </div>
        <div className="orderPlacedList_container">
          <h4>Your Orders History</h4>
          <br />
          {renderOrderList()}
        </div>
        <button
          className="button_submit"
          onClick={() => {
            localStorage.removeItem("user");
            window.location.reload();
          }}>
          Logout
        </button>
      </div>
    </div>
  );
}
