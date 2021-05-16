import { formatMoney, formatNumber } from 'accounting-js';
import { fromWei, toBN } from 'web3-utils';
import BigNumber from 'bignumber.js';

BigNumber.config({
  EXPONENTIAL_AT: 24,
});

const DEFAULT_DECIMALS = 18;
const DEFAULT_PRECISION = 8;

export {
  toBN,
};

export function asMoney(number, opts) {
  return formatMoney(number, opts);
}

export function asNumber(number, opts) {
  return formatNumber(number, opts);
}

export function numberToBN(number, decimals = DEFAULT_DECIMALS) {
  return new BigNumber(number).times(new BigNumber(10).pow(decimals)).precision(DEFAULT_PRECISION);
}

export function bnToNumber(number, decimals = DEFAULT_DECIMALS) {
  return new BigNumber(number).div(new BigNumber(10).pow(decimals)).precision(DEFAULT_PRECISION);
}

export function asToken(number) {
  return fromWei(number.toString(), 'ether');
}

export function div(a, b) {
  return new BigNumber(a).div(new BigNumber(b));
}

export function add(a, b) {
  return bnToNumber(a).plus(bnToNumber(b));
}

export function perc(number, percentage) {
  return new BigNumber(number).precision(3).times(percentage).precision(DEFAULT_PRECISION);
}
