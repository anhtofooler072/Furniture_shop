import React from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";

export default function Contact() {
  return (
    <div>
      <div className="aboutUs_Header">
        <div className="TitleBox">
          <h6>Don't be a stranger</h6>
          <h2>Contact Us</h2>
        </div>
        <div className="infoCard_Box">
          <div className="infoCard">
            <FaPhoneAlt className="infoCard_icon" />
            <h3>Phone Number</h3>
            <p>+1 123 456 7890</p>
          </div>
          <div className="infoCard">
            <IoIosMail className="infoCard_icon" />
            <h3>Email Address</h3>
            <p>johndoe@gmail.com</p>
          </div>
          <div className="infoCard">
            <FaLocationDot className="infoCard_icon" />
            <h3>Location</h3>
            <p>1234 North Avenue, New York, NY 12345</p>
          </div>
        </div>
        <div className="TitleBox">
          <h6>message us</h6>
          <h2>Get in touch</h2>
        </div>
        <div className="getInTouch_form">
          {/* create a form contain fist and last name input, email input and message input with a send button */}
          <form>
            <div className="formGroup">
              <input
                type="text"
                placeholder="First Name"
              />
              <input
                type="text"
                placeholder="Last Name"
              />
            </div>
            <input
              type="email"
              placeholder="Email"
            />
            <textarea
              placeholder="Message"
              style={{ height: "150px" }}
            />
            <button
              type="submit"
              className="button_submit">
              Send
            </button>
          </form>
        </div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d317893.9737282887!2d-0.11951900000000001!3d51.503186!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604b900d26973%3A0x4291f3172409ea92!2slastminute.com%20London%20Eye!5e0!3m2!1sen!2sus!4v1710569952062!5m2!1sen!2sus"
          className="map"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}
