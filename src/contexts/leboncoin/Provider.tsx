import React, { FC, useEffect, useState } from "react";
import { Leboncoin, Offer } from "./index";

import leboncoin from "./utils";

export const LeboncoinProvider: FC = ({ children }) => {
  const [nextPageLink, setNextPageLink] = useState<string>();
  const [links, setLinks] = useState<string[]>([]);

  useEffect(() => {
    leboncoin
      .search({
        category: "9",
        immo_sell_type: "old,new",
        locations: "Caen_14000__49.18461_-0.37375_4167",
        price: "75000-175000",
        real_estate_type: "2",
        rooms: "3-max",
        square: "30-max",
      })
      .then((result) => {
        setNextPageLink(result.nextPageLink);
        setLinks(result.links);
      }, console.error);
  }, []);

  return (
    <Leboncoin.Provider
      value={{
        getAttribute: (key: string, offer?: Offer) =>
          offer?.attributes.find((attribute) => attribute.key === key),
        getOffer: leboncoin.getOffer,
        hasMore: nextPageLink !== undefined,
        links,
        loadMore: () =>
          nextPageLink &&
          leboncoin.getLinks(nextPageLink).then((result) => {
            setNextPageLink(result.nextPageLink);
            setLinks((prevLinks) => [...prevLinks, ...result.links]);
          }),
      }}
    >
      {children}
    </Leboncoin.Provider>
  );
};

export default LeboncoinProvider;
