import { fork, call, put } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import oAuth from 'utils/OAuthRequest';
import { showError } from 'containers/App/actions';
import { ACCESS } from 'containers/Code/constants';
import { getProfile } from 'containers/Code/actions';
import {
  getAccToken
} from 'utils/storageUtility';

export function* Access(action) {
  console.log("postAccess()");
  let resp;
  try {
    resp = yield call(
      oAuth.access,
      getAccToken()
    );
    return resp;
  } catch (error) {
    if (error.type === 'Unauthorized') {
      yield put(showError('username or password incorrect'));
    } else {
      yield put(showError(error.type));
    }
    return false;
  }
}

export function* accessFlow() {
  yield takeEvery(ACCESS, Access);
}

export default function* access() {
  yield fork(accessFlow);
}
