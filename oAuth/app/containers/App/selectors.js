// selectLocationState expects a plain JS object for the routing state

import { createSelector } from 'reselect';

const selectGlobal = () => state => state.get('global');

const selectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return state => {
    const routingState = state.get('route'); // or state.route

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

const selectProfileList = () =>
  createSelector(selectGlobal(), substate => substate.get('profileList'));

const selectOAuthInfo = () =>
  createSelector(selectGlobal(), substate => substate.get('oAuthInfo'));

const selectShowError = () =>
  createSelector(selectGlobal(), globalState => globalState.get('error'));

const selectSending = () =>
  createSelector(selectGlobal(), globalState => globalState.get('sending'));

const selectGrantInfo = () =>
  createSelector(selectGlobal(), substate => substate.get('scope'));

export {
  selectLocationState,
  selectGrantInfo,
  selectOAuthInfo,
  selectShowError,
  selectSending,
  selectProfileList,
};
