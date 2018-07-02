import React from "react";

import "./MultiDownshift.css";

function Item(props) {
  const classes = ["Item"];
  if (props.isActive) {
    classes.push("Item-isActive");
  }
  if (props.isSelected) {
    classes.push("Item-isSelected");
  }
  return (
    <div className={classes.join(" ")} {...props}>
      {props.children}
    </div>
  );
}

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
