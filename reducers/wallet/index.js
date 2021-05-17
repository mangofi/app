import * as actions from '../../actions/wallet/action-types';

import initialState from './initialState';

export default function Wallet(state = initialState, action) {
  switch (action.type) {
    case actions.SET_ACCOUNT:
      return {
        ...state,
        account: action.payload.account,
        signedIn: !!action.payload.account,
      };
    case actions.SET_NETWORK_ID:
      return {
        ...state,
        networkId: action.payload,
      };
    case actions.SET_BALANCES:
      return {
        ...state,
        balances: {
          ...action.payload,
        },
      };
    case actions.UPDATE_BALANCE:
      return {
        ...state,
        balances: {
          ...state.balances,
          [action.payload.symbol]: action.payload.balance,
        },
      };
    default:
      return state;
  }
}
