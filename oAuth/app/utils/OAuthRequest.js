/* eslint no-underscore-dangle: ["error", { "allow": ["_cmd"] }] */
/* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */

// import 'isomorphic-fetch';
import base64 from 'base-64';
import { apiELBUrl } from '../../urls.conf.js';

class OAuthRequest {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;    
    this.token = this.token.bind(this);
    this.access = this.access.bind(this);
  }

  getWithBasicAuth(path, params, username, pwHash) {
    const esc = encodeURIComponent;
    const query = Object.keys(params)
      .map(k => esc(k).concat('=', esc(params[k])))
      .join('&');
    return new Promise((resolve, reject) => {
      fetch(this.apiUrl.concat(path, '?', query), {
        method: 'GET',
        mode: 'cors',
        redirect: 'follow',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Basic '.concat(
            base64.encode(username.concat(':', pwHash)),
          ),
          'Access-Control-Allow-Origin': '*',
          Origin: this.apiUrl,
        },
      })
        .then(response => {
          if (response.redirected) {
            window.location.replace(response.url);
          }
          if (response.status === 401) {
            reject({
              ...response,
              status: response.status,
              type: 'Unauthorized',
            });
          } else if (response.status === 400) {
            reject({
              ...response,
              status: response.status,
              type: 'Denied',
            });
          } else if (response.status >= 402) {
            reject({
              ...response,
              status: response.status,
              type: 'Bad Request',
            });
          }
          return response.json();
        })
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  postWithBasicAuth(path, params, appId, appKey) {

    return new Promise((resolve, reject) => {
      fetch(this.apiUrl.concat(path), {
        method: 'POST',
        mode: 'cors',
        redirect: 'follow',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Basic '.concat(
            base64.encode(appId.concat(':', appKey)),
          ),
          'Access-Control-Allow-Origin': '*',
          Origin: this.apiUrl,
        },
        body : JSON.stringify(params)
      })
        .then(response => {
          if (response.redirected) {
            window.location.replace(response.url);
          }
          if (response.status === 401) {
            reject({
              ...response,
              status: response.status,
              type: 'Unauthorized',
            });
          } else if (response.status === 400) {
            reject({
              ...response,
              status: response.status,
              type: 'Denied',
            });
          } else if (response.status >= 402) {
            reject({
              ...response,
              status: response.status,
              type: 'Bad Request',
            });
          }
          return response.json();
        })
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

 postWithAccess(path, token) {

    return new Promise((resolve, reject) => {

      fetch(this.apiUrl.concat(path), {
        method: 'POST',
        mode: 'cors',
        redirect: 'follow',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer '.concat(
            token,
          ),
          'Access-Control-Allow-Origin': '*',
          Origin: this.apiUrl,
        },
        body : JSON.stringify({
            'query' : 'query {basicScope {info {id name avatar {ver xl l m s} identities}}}'
        })
      })
        .then(response => {
          if (response.redirected) {
            window.location.replace(response.url);
          }
          if (response.status === 401) {
            reject({
              ...response,
              status: response.status,
              type: 'Unauthorized',
            });
          } else if (response.status === 400) {
            reject({
              ...response,
              status: response.status,
              type: 'Denied',
            });
          } else if (response.status >= 402) {
            reject({
              ...response,
              status: response.status,
              type: 'Bad Request',
            });
          }
          return response.json();
        })
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  get(path, params) {
    const esc = encodeURIComponent;
    const query = Object.keys(params)
      .map(k => esc(k).concat('=', esc(params[k])))
      .join('&');
    return new Promise((resolve, reject) => {
      fetch(this.apiUrl.concat(path, '?', query), {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin': '*',
          Origin: this.apiUrl,
        },
      })
        .then(response => {
          if (response.redirected) {
            window.location.replace(response.url);
          }
          if (response.status === 401) {
            reject({
              ...response,
              status: response.status,
              type: 'Unauthorized',
            });
          } else if (response.status === 400) {
            reject({
              ...response,
              status: response.status,
              type: 'Denied',
            });
          } else if (response.status >= 402) {
            reject({
              ...response,
              status: response.status,
              type: 'Bad Request',
            });
          }
          return response;
        })
        .then(result => {
          resolve(result.json());
        })
        .catch(err => {
          reject(err);
        });
    });
  }

    token(domainId, appId, agId, grant_type, code ,url,appKey) {
      const params = {
      domain_id: domainId,
      client_id: appId,
      agent_id: agId,
      grant_type: grant_type,
      code: code,
      redirect_uri: url,
      };
      return this.postWithBasicAuth('/provider/token', params, appId, appKey);
    }

    access(token) {
          return this.postWithAccess('/access', token);
     }
}

const oAuth = new OAuthRequest(apiELBUrl);
export default oAuth;
