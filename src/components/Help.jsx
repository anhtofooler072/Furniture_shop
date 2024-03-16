import React, { useState } from "react";
import { IoPersonCircleOutline } from "react-icons/io5";
import { BiSupport } from "react-icons/bi";
import { PiShieldStarBold } from "react-icons/pi";
import { MdArrowDropDown } from "react-icons/md";
export default function Help() {
  const [FaQ, setFaQ] = useState([
    {
      question: "How do I track my order?",
      answer:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est aperiam saepe ratione minima. Quis maiores tenetur delectus similique! Nam corporis officia tempore minus doloribus exercitationem nostrum! Reiciendis impedit ullam sequi.",
      isOpen: false,
    },
    {
      question: "What is your return policy?",
      answer:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est aperiam saepe ratione minima. Quis maiores tenetur delectus similique! Nam corporis officia tempore minus doloribus exercitationem nostrum! Reiciendis impedit ullam sequi.",
      isOpen: false,
    },
    {
      question: "How can I contact you?",
      answer:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est aperiam saepe ratione minima. Quis maiores tenetur delectus similique! Nam corporis officia tempore minus doloribus exercitationem nostrum! Reiciendis impedit ullam sequi.",
      isOpen: false,
    },
  ]);
  const renderFaQ = () => {
    return FaQ.map((item, index) => {
      return (
        <div
          className="FaQ_card"
          key={index}>
          <div
            className="FaQ_quest"
            onClick={() => {
              let temp = [...FaQ];
              temp[index].isOpen = !temp[index].isOpen;
              setFaQ(temp);
            }}>
            <h3>{item.question}</h3>
            <MdArrowDropDown
              style={{
                fontSize: "1.5rem",
                transform: item.isOpen ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          </div>
          {item.isOpen && (
            <div className="FaQ_ans">
              <p>{item.answer}</p>
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div>
      <div className="aboutUs_Header">
        <div className="TitleBox">
          <h6>24/7 support</h6>
          <h2>Ready to help</h2>
        </div>
        <div className="infoCard_Box">
          <div className="infoCard">
            <IoPersonCircleOutline className="infoCard_icon" />
            <h3>Account privacy</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Est
              aperiam saepe ratione minima. Quis maiores tenetur delectus
              similique! Nam corporis officia tempore minus doloribus
              exercitationem nostrum! Reiciendis impedit ullam sequi.
            </p>
          </div>
          <div className="infoCard">
            <BiSupport className="infoCard_icon" />
            <h3>Support specialist</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Est
              aperiam saepe ratione minima. Quis maiores tenetur delectus
              similique! Nam corporis officia tempore minus doloribus
              exercitationem nostrum! Reiciendis impedit ullam sequi.
            </p>
          </div>
          <div className="infoCard">
            <PiShieldStarBold className="infoCard_icon" />
            <h3>Seller standard</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Est
              aperiam saepe ratione minima. Quis maiores tenetur delectus
              similique! Nam corporis officia tempore minus doloribus
              exercitationem nostrum! Reiciendis impedit ullam sequi.
            </p>
          </div>
        </div>
        <div className="TitleBox">
          <h6>FaQ</h6>
          <h2>Find Answers</h2>
        </div>
        <div className="FaQ_container">{renderFaQ()}</div>
      </div>
    </div>
  );
}
