import React from "react";
import { BsStarFill } from "react-icons/bs";

export default function RatingStar({ rating }) {
  const renderStars = (rating) => {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(
          <BsStarFill
            key={i}
            style={{ color: "orange" }}
          />
        );
      } else {
        stars.push(
          <BsStarFill
            key={i}
            style={{ color: "grey" }}
          />
        );
      }
    }
    return stars;
  };
  return <div>{renderStars(rating)}</div>;
}
