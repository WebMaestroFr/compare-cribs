import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";

import OfferTable from "./components/Offer/Table";
import LebonCoinProvider from "./contexts/leboncoin/Provider";

library.add(faEllipsisH);

function App() {
  return (
    <LebonCoinProvider>
      <OfferTable />
    </LebonCoinProvider>
  );
}

export default App;
