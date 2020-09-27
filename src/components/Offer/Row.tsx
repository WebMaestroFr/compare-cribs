import React, { FC, useEffect, useState } from "react";
import { Badge, Carousel } from "react-bootstrap";

import useLeboncoin, { Offer } from "../../contexts/leboncoin";
import Loader from "./Loader";

const OfferRow: FC<{ link: string }> = ({ link }) => {
  const { getAttribute, getOffer } = useLeboncoin();
  const [offer, setOffer] = useState<Offer | undefined>();
  useEffect(() => {
    console.count("FETCHING AND RENDERING OFFER");
    getOffer(link).then(setOffer);
  }, [getOffer, link]);
  const href = "https://www.leboncoin.fr" + link;
  const square = getAttribute("square", offer);
  const price = offer?.price[0];
  const squarePrice = square ? Number(price) / Number(square.value) : 0;
  return offer ? (
    <>
      <td>
        <a
          className="OfferRow-link"
          href={href}
          rel="noopener noreferrer"
          target="_blank"
        >
          <strong className="OfferRow-subject">{offer.subject}</strong>
        </a>
        <Carousel className="OfferRow-images" interval={null}>
          {offer.images.urls.map((src: string, index) => (
            <Carousel.Item key={index}>
              <img alt={offer.subject} src={src} />
            </Carousel.Item>
          ))}
        </Carousel>
        <p className="OfferRow-body">{offer.body}</p>
      </td>
      <td>
        <div className="OfferRow-value">
          <big className="OfferRow-price">
            {Number(price).toLocaleString("fr")} <small>€</small>
          </big>
          <span className="OfferRow-separator">/</span>
          <big className="OfferRow-square">
            {square?.value} <small>m²</small>
          </big>
        </div>
        <Badge variant="secondary">
          {squarePrice.toFixed(2)} <small>€/m²</small>
        </Badge>
      </td>
      <td className="OfferRow-attributes">
        {offer.attributes.map((attribute) => (
          <div key={attribute.key} className="OfferRow-attribute">
            <small>{attribute.key}</small>
            <Badge variant="secondary">
              {attribute.value_label || attribute.value}
            </Badge>
          </div>
        ))}
      </td>
    </>
  ) : (
    <Loader />
  );
};

export default OfferRow;
