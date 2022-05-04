import axios from 'axios';
import qs from 'query-string';

export const BASE_URL = 'https://api.coinpaprika.com/v1';
export const BASE_IMAGE_URL = 'https://api.coinpaprika.com/';

// @ts-ignore
export function getCoinPriceApi({ coin, to, exchange }) {
  const query = qs.stringify({
    quotes: to,
  });

  const url = `${BASE_URL}/tickers/${coin.id}?${query}`;
  return axios.get(url).then((response) => {
    // @ts-ignore
    if (response.data.Response === 'Error') {
      throw response.data;
    }

    // @ts-ignore
    return { data: { to: response.data.quotes[to].price.toFixed(2) } };
  });
}

export function getCoinListApi() {
  const url = `${BASE_URL}/coins`;

  return axios.get(url).then((response) => {
    return {
    // @ts-ignore
      data: response.data.map((coin) => ({ label: coin.name, value: coin })),
    };
  });
}

export function getSymbolListApi() {
  return Promise.resolve({
    data: ['EUR', 'USD', 'GBP', 'BTC', 'ETH'],
  });
}
