import { SHOW_ERROR, SENDING_REQUEST } from './constants';

export function showError(data) {
  return {
    type: SHOW_ERROR,
    data,
  };
}

export function sendingRequest(sending) {
  return { type: SENDING_REQUEST, sending };
}
