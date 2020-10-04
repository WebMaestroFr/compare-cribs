import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";

import OfferTable from "./components/Offer/Table";
import FirebaseProvider from "./contexts/firebase/Provider";
import LeboncoinProvider from "./contexts/leboncoin/Provider";

library.add(faEllipsisH);

function App() {
  return (
    <LeboncoinProvider>
      <FirebaseProvider>
        <OfferTable />
      </FirebaseProvider>
    </LeboncoinProvider>
  );
}

export default App;
