import { fork, call, put } from 'redux-saga/effects';
import { browserHistory } from 'react-router';
import { takeEvery } from 'redux-saga';
import oAuth from 'utils/OAuthRequest';
import { showError } from 'containers/App/actions';
import { POST_TOKEN } from 'containers/Code/constants';
import { getToken } from 'containers/Code/actions';

import {
  getDmid,
  getGrantId,
  getCode,
  getAppId,
  getAppKey,
  getAgId,
  getUrl,
  getQuery,
  setAccToken,
  setRefToken,
  setQuery,
} from 'utils/storageUtility';

// Little helper function to abstract going to different pages
export function forwardTo(location) {
  browserHistory.push(location);
}

export function* postToken(action) {
  let token_resp;
  let access_resp;
  try {
	const dmid = "c21f969b-5f03-433d-95e0-4f8f136e7682";
    const appId = yield call(getAppId);
    const appKey = yield call(getAppKey);
    const agId  = yield call(getAgId);
    const url = yield call(getUrl);
    const grantId = yield call(getGrantId);
    const grantType = "authorization_code";
    const code = yield call(getCode);

    token_resp = yield call(
      oAuth.token,
      dmid,
      appId,
      agId,
      grantType,
      code,
      url,
      appKey
    );
    console.log("token_resp: ",token_resp.access_token);
    yield call(setAccToken, token_resp.access_token);
    yield call(setRefToken, token_resp.refresh_token);

    access_resp = yield call(
          oAuth.access,
          token_resp.access_token
    );

    console.log("get query list: ",JSON.stringify(access_resp));
    yield call(setQuery, access_resp);
    forwardTo('/oauth/access');
    return access_resp;
  } catch (error) {
    if (error.type === 'Unauthorized') {
      console.log("token error: Unauthorized");
      yield put(showError('token Unauthorized'));
    } else {
      console.log("token error: ",error);
      yield put(showError(error.type));
    }
    return false;
  }
}

export function* tokenFlow() {
  yield takeEvery(POST_TOKEN, postToken);
}

export default function* token() {
  yield fork(tokenFlow);
}
