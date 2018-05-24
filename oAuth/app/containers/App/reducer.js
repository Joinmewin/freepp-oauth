import { fromJS } from 'immutable';

import { SHOW_ERROR, SENDING_REQUEST } from './constants';

const initialState = fromJS({
  // App
  error: '',
  sending: false,
  // Loading
  oAuthInfo: {},
  grantId: '',
  // SelectProfile
  profileList: {},
  // ConfirmInfo
  scope: '',
});

function AppReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_ERROR:
      return state.set('error', action.data);
    case SENDING_REQUEST:
      return state.set('sending', action.sending);
    default:
      return state;
  }
}

export default AppReducer;
