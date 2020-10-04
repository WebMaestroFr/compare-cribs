import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { Badge, Carousel, Form } from "react-bootstrap";

import useLeboncoin, { Offer } from "../../contexts/leboncoin";
import useFirebase, { FirebaseData } from "../../contexts/firebase";
import OfferAttributes from "./Attributes";
import Loader from "./Loader";

const OfferRow: FC<{ link: string }> = ({ link }) => {
  const { read, write } = useFirebase();
  const { getOffer } = useLeboncoin();

  const linkMatch = link.match(/.*\/(.+?)\./);
  const offerKey = linkMatch && linkMatch[1];

  const [offer, setOffer] = useState<Offer | undefined>();
  const [data, setData] = useState<FirebaseData>();

  useEffect(() => {
    if (offerKey) {
      getOffer(link).then(setOffer);
      read(offerKey).then(setData, console.error);
    }
  }, [getOffer, link, offerKey, read]);

  const getAttribute = (key: string) =>
    offer?.attributes.find((attribute) => attribute.key === key);
  const square = getAttribute("square");
  const href = "https://www.leboncoin.fr" + link;
  const price = offer?.price[0];
  const squarePrice = square ? Number(price) / Number(square.value) : 0;

  const handleChangeNote = offerKey
    ? (event: ChangeEvent<HTMLTextAreaElement>) => {
        const note = event.currentTarget.value;
        write(offerKey, { note });
      }
    : undefined;

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
        <div className="OfferRow-header">
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
        <hr />
        <strong>{offer.location.city}</strong>
        <OfferAttributes attributes={offer.attributes} />
      </td>
      <td>
        <Form className="OfferRow-notes">
          {data ? (
            <Form.Control
              as="textarea"
              onChange={handleChangeNote}
              defaultValue={data?.note}
            />
          ) : null}
        </Form>
      </td>
    </>
  ) : (
    <Loader />
  );
};

export default OfferRow;
