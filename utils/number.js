import { formatMoney, formatNumber } from 'accounting-js';
import { fromWei, toBN } from 'web3-utils';

export {
  toBN,
};

export function asMoney(number, opts) {
  return formatMoney(number, opts);
}

export function asNumber(number, opts) {
  return formatNumber(number, opts);
}

export function asToken(number) {
  return fromWei(number.toString(), 'ether');
}

export function div(a, b) {
  return toBN(a).div(toBN(b)).toString();
}

export function add(a, b) {
  return toBN(a).add(toBN(b)).toString();
}
