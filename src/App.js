import React from 'react';
import StockQuote from "./components/StockQuote";

function App(props) {

  return (
    <div>
      <StockQuote symbol={props.symbol}/>
    </div>
  );
}

export default App;
