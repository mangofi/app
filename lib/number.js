import {formatMoney, formatNumber} from "accounting-js"
import {fromWei} from "web3-utils"

export function asMoney(number, opts) {
  return formatMoney(number, opts)
}

export function asNumber(number, opts) {
  return formatNumber(number, opts)
}

export function asEther(number) {
  return fromWei(number.toString(), 'Ether')
}