import { AxiosRequestConfig } from "axios";
import { JSDOM } from "jsdom";
import { setup } from "axios-cache-adapter";

import { Offer } from "./index";

// Create `axios` instance with pre-configured `axios-cache-adapter` attached to it
const api = setup({
  // `axios` options
  baseURL: "https://www.leboncoin.fr",
  // `axios-cache-adapter` options
  cache: {
    maxAge: 30 * 60 * 1000,
  },
});

const fetchDOM = ({ url, ...config }: AxiosRequestConfig) =>
  api
    .request({
      method: "get",
      url: `${url}`,
      ...config,
    })
    .then((response) => new JSDOM(response.data));

export default {
  parseOffer: (url: string) =>
    fetchDOM({ url }).then(
      (offerDom) => offerDom && handleOffer(offerDom),
      (error) => console.log("FETCH FAILED", error)
    ),
  search: (params: object) =>
    fetchDOM({ url: "/recherche", params }).then(handleSearchResults),
};

const handleOffer = async (dom: JSDOM): Promise<Offer | null> => {
  const data = dom.window.document.querySelector(
    "#__NEXT_DATA__"
  ) as HTMLScriptElement | null;
  const parsedData = data && data.textContent && JSON.parse(data.textContent);
  return (
    parsedData &&
    parsedData.props &&
    parsedData.props.pageProps &&
    (parsedData.props.pageProps.ad as Offer)
  );
};

const handleSearchResults = async (dom: JSDOM): Promise<string[]> => {
  const links = Array.from<HTMLAnchorElement>(
    dom.window.document.querySelectorAll('li[data-qa-id="aditem_container"] a')
  ).map((a) => a.href);
  const nextPageLink = Array.from<HTMLAnchorElement>(
    dom.window.document.querySelectorAll('span[name="chevronright"]')
  )
    .map((span) => span.parentNode)
    .find((a) => (a && a.nodeName) === "A") as HTMLAnchorElement;
  return nextPageLink
    ? await fetchDOM({ url: nextPageLink.href })
        .then(handleSearchResults)
        .then((nextLinks) => [...links, ...nextLinks])
    : links;
};
