import React from "react";
import { FcGoogle } from "react-icons/fc";
import { useContext } from "react";
import { FirebaseContext } from "../contexts/FirebaseProvider";
import { signInWithPopup, getAuth } from "firebase/auth";

export default function Login() {
  const auth = getAuth();
  const { provider } = useContext(FirebaseContext);
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="aboutUs_Header">
        <div className="TitleBox">
          <h3>Login</h3>
        </div>
        <div className="login_section">
          <div className="login_box">
            <div className="login_box_input">
              <input
                type="text"
                placeholder="Email"
              />
              <input
                type="password"
                placeholder="Password"
              />
            </div>
            <div className="login_box_button">
              <button>Login</button>
            </div>
            <div className="login_box_google">
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
    </div>
  );
}
