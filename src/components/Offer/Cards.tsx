import React, { FC } from "react";
import { Badge, CardColumns, Card } from "react-bootstrap";
import useLeboncoin, { Offer } from "../../contexts/leboncoin";

const OfferCard: FC<{ offer: Offer }> = ({ offer }) => {
  return (
    <Card className="OfferCard">
      {offer.images.urls_thumb.map((src: string, index) => (
        <Card.Img
          key={index}
          variant={index === 0 ? "top" : undefined}
          src={src}
        />
      ))}
      <Card.Header as="h3">{offer.subject}</Card.Header>
      <Card.Body>
        {offer.price.map((price, index) => (
          <Card.Title key={index} as="h2">
            {Number(price).toLocaleString("fr")} <small>€</small>
          </Card.Title>
        ))}
        <Card.Text>{offer.body}</Card.Text>
      </Card.Body>
      <Card.Footer>
        {offer.attributes.map((attribute) => (
          <div key={attribute.key} className="OfferCard-attribute">
            <small>{attribute.key_label || attribute.key}</small>
            <Badge variant="secondary">
              {attribute.value_label || attribute.value}
            </Badge>
          </div>
        ))}
      </Card.Footer>
    </Card>
  );
};

const OfferCards: FC = () => {
  const { offers } = useLeboncoin();
  return (
    <CardColumns>
      {offers.map((offer) => (
        <OfferCard key={offer.url} offer={offer} />
      ))}
    </CardColumns>
  );
};

export default OfferCards;
