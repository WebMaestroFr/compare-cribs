import { createContext, useContext } from "react";

export interface OfferAttribute {
  key: string;
  value: string;
  key_label: string;
  value_label: string;
  generic: boolean;
}

export interface Offer {
  list_id: number;
  first_publication_date: string;
  index_date: string;
  status: string; // "active"
  category_id: string;
  category_name: string;
  subject: string;
  body: string;
  ad_type: string; // "offer",
  url: string;
  price: number[];
  price_calendar: null;
  images: {
    thumb_url: string;
    small_url: string;
    nb_images: number;
    urls: string[];
    urls_thumb: string[];
    urls_large: string[];
  };
  attributes: OfferAttribute[];
  location: {
    country_id: string;
    region_id: string;
    region_name: string;
    department_id: string;
    department_name: string;
    city_label: string;
    city: string;
    zipcode: string;
    lat: number;
    lng: number;
    source: string;
    provider: string;
    is_shape: boolean;
    feature: {
      type: string;
      geometry: {
        type: string;
        coordinates: [number, number];
      };
      properties: null;
    };
  };
  owner: {
    store_id: string;
    user_id: string;
    type: string;
    name: string;
    siren: string;
    pro_rates_link: string;
    no_salesmen: boolean;
  };
  options: {
    has_option: boolean;
    booster: boolean;
    photosup: boolean;
    urgent: boolean;
    gallery: boolean;
    sub_toplist: boolean;
  };
  has_phone: boolean;
}

interface LeboncoinContext {
  hasMore: boolean;
  links: string[];
  getAttribute: (key: string, offer?: Offer) => OfferAttribute | undefined;
  getOffer: (url: string) => Promise<Offer | undefined>;
  loadMore: () => void;
}

export const Leboncoin = createContext<LeboncoinContext | null>(null);

export default () => useContext(Leboncoin) as LeboncoinContext;
