import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';

import rootReducer from "../reducers"
import initialState from "../reducers/initialState"

const createStoreWithMiddleware = applyMiddleware(
  thunk,
)(createStore);

export default createStoreWithMiddleware(rootReducer, initialState);