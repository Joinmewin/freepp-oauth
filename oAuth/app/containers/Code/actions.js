import { GET_RESOURCE, RESP_RESOURCE, POST_TOKEN, POST_ACCESS } from './constants';

export function getResource(data) {
  return {
    type: GET_RESOURCE,
    data,
  };
}

export function respResource(data) {
  return {
    type: RESP_RESOURCE,
    data,
  };
}

export function getToken(data) {
  return {
    type: POST_TOKEN,
    data,
  };
}

export function getProfile(data) {
  return {
    type: POST_ACCESS,
    data,
  };
}