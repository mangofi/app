import * as actions from '../../actions/wallet/action-types';

import initialState from './initialState';

export default function Wallet(state = initialState, action) {
  switch (action.type) {
    case actions.SET_ACCOUNT:
      return {
        ...state,
        ...action.payload,
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
