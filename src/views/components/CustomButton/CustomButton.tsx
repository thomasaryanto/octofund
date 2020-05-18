import React, { CSSProperties } from "react";
import "./CustomButton.css";

type ButtonTypes = {
  type?: "contained" | "contained-dark" | "outlined" | "textual";
  children: any;
  style?: CSSProperties;
  className?: string;
  onClick?: any;
};

const CustomButton = (props: ButtonTypes) => {
  let { type, children, style, className, onClick } = props;

  type = type || "contained";

  return (
    <div
      style={style}
      onClick={onClick}
      className={`custom-btn custom-btn-${type} ${className}`}
    >
      {children}
    </div>
  );
};

export default CustomButton;
