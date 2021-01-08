import {
  SET_ACCOUNT
} from "./action-types"

export function setAccount(address) {
  return dispatch => {
    dispatch({
      type: SET_ACCOUNT,
      payload: {
        account: address,
        signedIn: !!address
      }
    })
  }
}

export default {setAccount}