import React, { FC, useEffect, useState } from "react";
import { Leboncoin } from "./index";

import leboncoin from "./utils";

export const LeboncoinProvider: FC = ({ children }) => {
  const [offers, setOffers] = useState<any[]>([]);

  useEffect(() => {
    leboncoin
      .search({
        category: "9",
        locations:
          "Bayeux_14400__49.28074_-0.71924_3634,Caen_14000__49.18461_-0.37375_4167,Carentan-les-Marais_50500__49.2785_-1.29011_10000",
        price: "25000-75000",
        real_estate_type: "2",
      })
      .then(
        async (urls) =>
          urls.map((url) =>
            leboncoin
              .parseOffer(url)
              .then((offer) =>
                setOffers((prevOffers) => [...prevOffers, offer])
              )
          ),
        console.error
      );
  }, []);

  return (
    <Leboncoin.Provider
      value={{
        offers,
      }}
    >
      {children}
    </Leboncoin.Provider>
  );
};

export default LeboncoinProvider;
