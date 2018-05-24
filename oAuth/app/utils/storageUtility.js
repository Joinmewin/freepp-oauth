// Side effects Services

export function getAuthToken() {
  return JSON.parse(sessionStorage.getItem('auth'));
}

export function setAuthToken(token) {
  sessionStorage.setItem('auth', JSON.stringify(token));
}

export function removeAuthToken() {
  sessionStorage.removeItem('auth');
}

export function getGrantId() {
  return JSON.parse(sessionStorage.getItem('grantId'));
}

export function setGrantId(grantId) {
  sessionStorage.setItem('grantId', JSON.stringify(grantId));
}

export function removeGrantId() {
  sessionStorage.removeItem('grantId');
}

export function getDmid() {
  return JSON.parse(sessionStorage.getItem('dmid'));
}

export function setDmid(dmid) {
  sessionStorage.setItem('dmid', JSON.stringify(dmid));
}

export function removeDmid() {
  sessionStorage.removeItem('dmid');
}

export function setOAuthRequest(data) {
  sessionStorage.setItem('OAuthRequest', JSON.stringify(data));
}

export function getOAuthRequest() {
  return JSON.parse(sessionStorage.getItem('OAuthRequest'));
}

export function getCode() {
  return JSON.parse(sessionStorage.getItem('code'));
}

export function setCode(code) {
  sessionStorage.setItem('code', JSON.stringify(code));
}

export function removeCode() {
  sessionStorage.removeItem('code');
}

export function getAppKey() {
  return JSON.parse(sessionStorage.getItem('appKey'));
}

export function setAppKey(key) {
  sessionStorage.setItem('appKey', JSON.stringify(key));
}

export function removeAppKey() {
  sessionStorage.removeItem('appKey');
}

export function getAppId() {
  return JSON.parse(sessionStorage.getItem('appId'));
}

export function setAppId(Id) {
  sessionStorage.setItem('appId', JSON.stringify(Id));
}

export function removeAppId() {
  sessionStorage.removeItem('appId');
}

export function getAgId() {
  return JSON.parse(sessionStorage.getItem('agId'));
}

export function setAgId(Id) {
  sessionStorage.setItem('agId', JSON.stringify(Id));
}

export function removeAgId() {
  sessionStorage.removeItem('agId');
}

export function getAccToken() {
  return JSON.parse(sessionStorage.getItem('access_token'));
}

export function setAccToken(token) {
  sessionStorage.setItem('access_token', JSON.stringify(token));
}

export function removeAccToken() {
  sessionStorage.removeItem('access_token');
}

export function getRefToken() {
  return JSON.parse(sessionStorage.getItem('refresh_token'));
}

export function setRefToken(token) {
  sessionStorage.setItem('refresh_token', JSON.stringify(token));
}

export function getQuery() {
  return JSON.parse(sessionStorage.getItem('query'));
}

export function setQuery(query) {
  sessionStorage.setItem('query', JSON.stringify(query));
}

export function removeQuery() {
  sessionStorage.removeItem('query');
}

export function getUrl() {
  return JSON.parse(sessionStorage.getItem('url'));
}

export function setUrl(url) {
  sessionStorage.setItem('url', JSON.stringify(url));
}

export function removeUrl() {
  sessionStorage.removeItem('url');
}
