import {formatMoney, formatNumber} from "accounting-js"

export function asMoney(number, opts) {
  return formatMoney(number, opts)
}

export function asNumber(number, opts) {
  return formatNumber(number, opts)
}