import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import OfferTable from "./components/Offer/Table";

import LebonCoinProvider from "./contexts/leboncoin/Provider";

function App() {
  return (
    <LebonCoinProvider>
      <OfferTable />
    </LebonCoinProvider>
  );
}

export default App;
