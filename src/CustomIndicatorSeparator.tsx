import * as React from "react";

const indicatorSeparatorStyle = {
  alignSelf: "stretch",
  backgroundColor: "green",
  marginBottom: 8,
  marginTop: 8,
  width: 1
};

const CustomIndicatorSeparator = ({ innerProps }: any) => {
  return <span style={indicatorSeparatorStyle} {...innerProps} />;
};

export default CustomIndicatorSeparator;
