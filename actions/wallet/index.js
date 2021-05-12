import {
  SET_ACCOUNT,
} from './action-types';

export function setAccount(address) {
  return (dispatch) => {
    dispatch({
      type: SET_ACCOUNT,
      payload: {
        account: address,
        signedIn: !!address,
      },
    });
  };
}

export function setNetworkId(networkId) {
  return (dispatch) => {
    dispatch({
      type: SET_ACCOUNT,
      payload: {
        networkId,
      },
    });
  };
}

export function setBalance(balance) {
  return (dispatch) => {
    dispatch({
      type: SET_ACCOUNT,
      payload: {
        balance,
      },
    });
  };
}
