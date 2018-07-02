import React from "react";
import glamorous from "glamorous";

import "./MultiDownshift.css";

const Item = glamorous.div(
  {
    position: "relative",
    cursor: "pointer",
    display: "block",
    border: "none",
    height: "auto",
    textAlign: "left",
    borderTop: "none",
    lineHeight: "1em",
    color: "rgba(0,0,0,.87)",
    fontSize: "1rem",
    textTransform: "none",
    fontWeight: "400",
    boxShadow: "none",
    padding: ".8rem 1.1rem",
    whiteSpace: "normal",
    wordWrap: "normal"
  },
  ({ isActive, isSelected }) => {
    const styles = [];
    if (isActive) {
      styles.push({
        color: "rgba(0,0,0,.95)",
        background: "rgba(0,0,0,.03)"
      });
    }
    if (isSelected) {
      styles.push({
        color: "rgba(0,0,0,.95)",
        fontWeight: "700"
      });
    }
    return styles;
  }
);

function InputValueWrapper(props) {
  return (
    <div className="InputValueWrapper" ref={props.innerRef} {...props}>
      {props.children}
    </div>
  );
}

function ArrowIcon({ isOpen }) {
  return (
    <svg
      viewBox="0 0 20 20"
      preserveAspectRatio="none"
      width={16}
      fill="transparent"
      stroke="#979797"
      strokeWidth="1.1px"
      transform={isOpen ? "rotate(180)" : null}
    >
      <path d="M1,6 L10,15 L19,6" />
    </svg>
  );
}

export { Item, ArrowIcon, InputValueWrapper };
