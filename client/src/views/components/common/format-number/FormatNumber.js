import React from "react";

const FormatNumber = ({ value, decimals, style = {} }) => (
  <span style={{ float: 'right', ...style }}>
    {new Intl.NumberFormat('en-ZA', {
      maximumFractionDigits: decimals,
      minimumFractionDigits: decimals
    }).format(value)}
  </span>
);

export default FormatNumber;
