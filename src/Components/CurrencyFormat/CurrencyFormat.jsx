import React from "react";
import numeral from "numeral";
function CurrencyFormat({ amount }) {
  const amountFormat = numeral(amount).format("$0,0.00");
  return <div>{amountFormat}</div>;
}

export default CurrencyFormat;
