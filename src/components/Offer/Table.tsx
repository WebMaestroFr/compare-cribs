import React, { FC } from "react";
import { Table } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroller";
import LazilyRender from "react-lazily-render";

import useLeboncoin from "../../contexts/leboncoin";
import Loader from "./Loader";
import OfferRow from "./Row";

const OfferTable: FC = () => {
  const { links, hasMore, loadMore } = useLeboncoin();
  const loader = (
    <tr key={0}>
      <Loader />
    </tr>
  );
  return (
    <Table className="OfferTable" striped={true} bordered={true} hover={true}>
      <InfiniteScroll
        element="tbody"
        loadMore={loadMore}
        hasMore={hasMore}
        loader={loader}
      >
        {links.map((link) => {
          const content = <OfferRow link={link} />;
          const placeholder = <Loader />;
          return (
            <LazilyRender
              className="OfferRow"
              component="tr"
              content={content}
              key={link}
              placeholder={placeholder}
            />
          );
        })}
      </InfiniteScroll>
    </Table>
  );
};

export default OfferTable;
