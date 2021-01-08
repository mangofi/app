import {
  SET_ACCOUNT
} from "../../actions/wallet/action-types"

import initialState from './initialState';

export default function Web3(state = initialState, action) {
  switch (action.type) {
    case SET_ACCOUNT:
      return {
        ...state,
        account: action.payload.account,
        signedIn: action.payload.signedIn
      }
      break;
    default:
      return {
        ...state
      }
  }
}