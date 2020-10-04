import { AxiosRequestConfig } from "axios";
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

const domparser = new DOMParser();

const fetchDOM = (link: string, config?: AxiosRequestConfig) => {
  const fixUrl = () => {
    try {
      const valid = new URL(link);
      return valid.pathname;
    } catch (_) {
      return link;
    }
  };
  const url = fixUrl();
  return api
    .get(url, config)
    .then((response) => domparser.parseFromString(response.data, "text/html"));
};

const handleOffer = async (dom: Document): Promise<Offer> => {
  const data = dom.querySelector("#__NEXT_DATA__");
  const parsedData = data?.textContent && JSON.parse(data.textContent);
  return parsedData?.props?.pageProps?.ad;
};

type PageLinkType = HTMLAnchorElement | null | undefined;

const handleSearchResults = async (
  dom: Document
): Promise<{ nextPageLink?: string; links: string[] }> => {
  const nextPageLink = Array.from<HTMLAnchorElement>(
    dom.querySelectorAll('span[name="chevronright"]')
  )
    .map((span) => span.parentNode)
    .find((a) => (a && a.nodeName) === "A") as PageLinkType;
  const links = Array.from<HTMLAnchorElement>(
    dom.querySelectorAll('li[data-qa-id="aditem_container"] a')
  ).map((a) => a.href);
  console.log({
    links,
    nextPageLink: nextPageLink ? nextPageLink.href : undefined,
  });
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
