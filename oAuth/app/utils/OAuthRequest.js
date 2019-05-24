/* eslint no-underscore-dangle: ["error", { "allow": ["_cmd"] }] */
/* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */

// import 'isomorphic-fetch';
import base64 from 'base-64';
import { apiELBUrl } from '../../urls.conf.js';
import { agentToken } from '../../urls.conf.js';

import {
  getPid
} from 'utils/storageUtility';

class OAuthRequest {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;    
    this.token = this.token.bind(this);
    this.access = this.access.bind(this);
	this.getRobots = this.getRobots.bind(this);
	this.getDevice = this.getDevice.bind(this);
	this.addFriend = this.addFriend.bind(this);
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

  getWithAccess(path, token) {
    
    return new Promise((resolve, reject) => {
      fetch(this.apiUrl.concat(path), {
        method: 'GET',
        mode: 'cors',
        headers: {
          Authorization: 'Bearer '.concat(
            token,
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


  getWithChat(path, token, params) {
    const esc = encodeURIComponent;
    const query = Object.keys(params)
      .map(k => esc(k).concat('=', esc(params[k])))
      .join('&');    
    return new Promise((resolve, reject) => {
	  fetch(this.apiUrl.concat(path, '?', query), {
        method: 'GET',
        mode: 'cors',
        headers: {
          Authorization: 'Bearer '.concat(
            token,
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

    graphql_access(token) {
          return this.postWithAccess('/access', token);
     }

	access(token) {
          return this.getWithAccess('/OAuthbot/v1/profile', token);
     }

	getRobots() {
		const params = {
		limit: "10",
		start: "0",
		agid: "50ed467e-55d2-4b97-9749-b4f8f25c6e37"
		};
		return this.getWithChat('/bot/v1/rids/info', agentToken, params);
     }

	getDevice(rid) {
		const params = {
		limit: "10",
		start: "0",
		};
		const getdev = '/bot/v1/rids/'+rid+'/devices';
		return this.getWithChat(getdev, agentToken, params);
     }

	addFriend(did) {
		const params = {
		limit: "10",
		start: "0",
		};
		const pid = getPid();
        console.log("add friend:",pid);
		const add = '/bot/v1/pid/'+pid+'/fid/'+did;
		return this.getWithChat(add, agentToken, params);		        				        		
     }
	 
}

const oAuth = new OAuthRequest(apiELBUrl);
export default oAuth;
