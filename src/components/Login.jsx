import React from "react";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  return (
    <div>
      <div className="aboutUs_Header">
        <div className="TitleBox">
          <h3>Login</h3>
        </div>
        <div className="login_section">
          <button className="button_submit">
            <FcGoogle />
            <span>Sign in with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
}
