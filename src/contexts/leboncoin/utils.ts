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

const fetchDOM = (url: string, config?: AxiosRequestConfig) =>
  api.get(url, config).then((response) => new JSDOM(response.data));

const handleOffer = async (dom: JSDOM): Promise<Offer> => {
  const data = dom.window.document.querySelector("#__NEXT_DATA__");
  const parsedData = data?.textContent && JSON.parse(data.textContent);
  return parsedData?.props?.pageProps?.ad;
};

type PageLinkType = HTMLAnchorElement | null | undefined;

const handleSearchResults = async (
  dom: JSDOM
): Promise<{ nextPageLink?: string; links: string[] }> => {
  const nextPageLink = Array.from<HTMLAnchorElement>(
    dom.window.document.querySelectorAll('span[name="chevronright"]')
  )
    .map((span) => span.parentNode)
    .find((a) => (a && a.nodeName) === "A") as PageLinkType;
  const links = Array.from<HTMLAnchorElement>(
    dom.window.document.querySelectorAll('li[data-qa-id="aditem_container"] a')
  ).map((a) => a.href);
  return {
    links,
    nextPageLink: nextPageLink ? nextPageLink.href : undefined,
  };
};

export default {
  getLinks: (pageLink: string) => fetchDOM(pageLink).then(handleSearchResults),
  getOffer: (url: string) => fetchDOM(url).then(handleOffer),
  search: (params: object) =>
    fetchDOM("/recherche", { params }).then(handleSearchResults),
};
