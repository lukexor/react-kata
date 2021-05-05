import React from "react";
import "./Button.css";

const Button = ({ onClick, children, ...props }) => {
  return (
    <button className="primary" onClick={onClick} {...props}>
      {children}
    </button>
  );
};

export default Button;
