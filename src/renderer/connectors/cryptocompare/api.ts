import axios from 'axios';
import qs from 'query-string';
import { map, values } from 'lodash';

export const BASE_URL = 'https://www.cryptocompare.com';
export const BASE_IMAGE_URL = 'https://www.cryptocompare.com';

export function getCoinPriceApi({ coin, to, exchange }: any) {
  const query = qs.stringify({
    fsym: coin.Symbol,
    tsyms: to,
    e: exchange,
  });

  const url = `https://min-api.cryptocompare.com/data/price?${query}`;
  return axios.get<any>(url).then((response) => {
    if (response.data.Response === 'Error') {
      throw response.data;
    }

    return values(map(response.data, (d) => ({ label: d.FullName, value: d })));
  });
}

export function getCoinListApi() {
  const url = 'https://www.cryptocompare.com/api/data/coinlist';

  return axios.get(url);
}

export function getExchangeListApi() {
  return Promise.resolve({
    data: [
      'BTC38',
      'BTCC',
      'BTCE',
      'BTER',
      'Bit2C',
      'Bitfinex',
      'Bitstamp',
      'Bittrex',
      'CCCAGG',
      'CCEDK',
      'Cexio',
      'Coinbase',
      'Coinfloor',
      'Coinse',
      'Coinsetter',
      'Cryptopia',
      'Cryptsy',
      'Gatecoin',
      'Gemini',
      'HitBTC',
      'Huobi',
      'itBit',
      'Kraken',
      'LakeBTC',
      'LocalBitcoins',
      'MonetaGo',
      'OKCoin',
      'Poloniex',
      'Yacuna',
      'Yunbi',
      'Yobit',
      'Korbit',
      'BitBay',
      'BTCMarkets',
      'QuadrigaCX',
      'CoinCheck',
      'BitSquare',
      'Vaultoro',
      'MercadoBitcoin',
      'Unocoin',
      'Bitso',
      'BTCXIndia',
      'Paymium',
      'TheRockTrading',
      'bitFlyer',
      'Quoine',
      'Luno',
      'EtherDelta',
      'Liqui',
      'bitFlyerFX',
      'BitMarket',
      'LiveCoin',
      'Coinone',
      'Tidex',
      'Bleutrade',
      'EthexIndia',
    ],
  });
}

export function getSymbolListApi() {
  return Promise.resolve({
    data: ['EUR', 'USD', 'GBP', 'BTC', 'ETH'],
  });
}
