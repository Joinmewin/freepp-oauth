import {
    OPEN_JMLOGIN,
  } from './constants';

export function openJMLogin(data) {
  return {
    type: OPEN_JMLOGIN,
    data,
  };
}
