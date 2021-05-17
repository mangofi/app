import * as actions from './action-types';

export function setAccount(address) {
  return (dispatch) => {
    dispatch({
      type: actions.SET_ACCOUNT,
      payload: {
        account: address,
      },
    });
  };
}

export function setBalances(balances) {
  return (dispatch) => {
    dispatch({
      type: actions.SET_BALANCES,
      payload: balances,
    });
  };
}

export function setNetworkId(networkId) {
  return (dispatch) => {
    dispatch({
      type: actions.SET_NETWORK_ID,
      payload: networkId,
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

export function logOut() {
  return (dispatch) => {
    dispatch({
      type: actions.SET_ACCOUNT,
      payload: {
        account: null,
      },
    });
    setBalances({})(dispatch);
  };
}

export default null;
