import React from "react";
import "./card.css";

const Card = (props: any) => {
  return <div className="card">{props.children}</div>;
};

export default Card;
