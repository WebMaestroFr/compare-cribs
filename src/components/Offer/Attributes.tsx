import React, { FC, useState } from "react";
import { Badge, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { OfferAttribute } from "../../contexts/leboncoin";

const OfferAttributesBadge: FC<{ attribute: OfferAttribute }> = ({
  attribute,
}) => {
  return (
    <p className="OfferAttributes-attribute" title={attribute.key}>
      <small>{attribute.key_label || attribute.key}</small>
      <Badge variant="secondary">
        {attribute.value_label || attribute.value}
      </Badge>
    </p>
  );
};

const OfferAttributes: FC<{ attributes: OfferAttribute[] }> = ({
  attributes,
}) => {
  const [showSecondary, setShowSecondary] = useState<boolean>(false);
  const handleShowSecondary = () => setShowSecondary(true);
  const getAttribute = (key: string) =>
    attributes.find((attribute) => attribute.key === key);
  const primary = attributes.filter((attribute) =>
    ["energy_rate", "fai_included", "ges"].includes(attribute.key)
  );
  const secondary = attributes.filter(
    (attribute) =>
      !["energy_rate", "fai_included", "ges", "rooms", "square"].includes(
        attribute.key
      )
  );
  const rooms = getAttribute("rooms");
  return (
    <div className="OfferAttributes">
      {rooms ? (
        <p className="OfferAttributes-rooms">
          <big>{rooms.value}</big> {rooms.key_label}
        </p>
      ) : null}
      <hr />
      {primary.map((attribute) => (
        <OfferAttributesBadge key={attribute.key} attribute={attribute} />
      ))}
      {showSecondary ? (
        secondary.map((attribute) => (
          <OfferAttributesBadge key={attribute.key} attribute={attribute} />
        ))
      ) : (
        <Button block={true} onClick={handleShowSecondary} variant="light">
          <FontAwesomeIcon icon="ellipsis-h" />
        </Button>
      )}
    </div>
  );
};

export default OfferAttributes;
