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

const InputValueWrapper = glamorous.div({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  alignItems: "center",
  flex: "1 1 auto",
  padding: "4px",
  border: "1px #c5c4c4 solid",
  borderRadius: "4px"
});

const Menu = glamorous.div({
  maxHeight: "20rem",
  overflowY: "auto",
  overflowX: "hidden",
  borderTopWidth: "0",
  outline: "0",
  borderRadius: "0 0 .28571429rem .28571429rem",
  transition: "opacity .1s ease",
  boxShadow: "0 2px 3px 0 rgba(34,36,38,.15)",
  borderColor: "#96c8da",
  borderRightWidth: 1,
  borderBottomWidth: 1,
  borderLeftWidth: 1,
  borderStyle: "solid"
});

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

export { Menu, Item, ArrowIcon, InputValueWrapper };
