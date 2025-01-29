import { create } from "zustand";

import { CryptoPrice, Cryptocurrency, Pair } from "../types";
import { getCryptos, fetchCurrentCryptoPrice } from "../services/CryptoService";

type CryptoStore = {
  cryptocurrencies: Cryptocurrency[];
  result: CryptoPrice;
  fetchCryptos: () => Promise<void>;
  fetchData: (pair: Pair) => Promise<void>;
};

export const useCryptoStore = create<CryptoStore>((set) => ({
  cryptocurrencies: [],
  result: {
    IMAGEURL: "",
    PRICE: "",
    HIGHDAY: "",
    LOWDAY: "",
    CHANGEPCT24HOUR: "",
    LASTUPDATE: "",
  },

  fetchCryptos: async () => {
    const cryptocurrencies = await getCryptos();

    set(() => ({
      cryptocurrencies,
    }));
  },

  fetchData: async (pair) => {
    const result = await fetchCurrentCryptoPrice(pair);
    set(() => ({
      result,
    }));
  },
}));
