import React from "react";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import OfferCards from "./components/Offer/Cards";

import LebonCoinProvider from "./contexts/leboncoin/Provider";

function App() {
  return (
    <Container className="App">
      <LebonCoinProvider>
        <OfferCards />
      </LebonCoinProvider>
    </Container>
  );
}

export default App;
