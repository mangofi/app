import formatMoney from 'accounting-js/lib/formatMoney.js'
import formatNumber from 'accounting-js/lib/formatNumber.js'

export function asMoney(number, opts) {
  return formatMoney(number, opts)
}

export function asNumber(number, opts) {
  return formatNumber(number, opts)
}