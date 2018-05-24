import { fork } from 'redux-saga/effects';

import token from './token';
import access from './access';

export default function* root() {
  yield fork(token);
  yield fork(access);
}
