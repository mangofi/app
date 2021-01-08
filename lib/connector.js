import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import actions from '../actions';

function mapProps(scopedProps = []) {
  return props => scopedProps.reduce((acc, key) => {
    if (props[key]) {
      acc[key] = props[key];
    }
    return acc;
  }, {});
}

function mapActions(scopedActions = []) {
  return dispatch => scopedActions.reduce((acc, key) => {
    if (actions[key]) {
      acc[`${key}Actions`] = bindActionCreators(actions[key], dispatch);
    }
    return acc;
  }, {});
}

export default function connector(scopedState, scopedActions) {
  return component => connect(mapProps(scopedState), mapActions(scopedActions))(component);
}