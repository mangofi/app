import * as actions from './action-types';

export function setAccount(address) {
  return (dispatch) => {
    dispatch({
      type: actions.SET_ACCOUNT,
      payload: {
        account: address,
        signedIn: !!address,
        balances: {},
      },
    });
  };
}

export function setNetworkId(networkId) {
  return (dispatch) => {
    dispatch({
      type: actions.SET_ACCOUNT,
      payload: {
        networkId,
      },
    });
  };
}

export function setBalance(symbol, balance) {
  return (dispatch) => {
    dispatch({
      type: actions.UPDATE_BALANCE,
      payload: {
        symbol,
        balance,
      },
    });
  };
}

export default null;
