// @flow
/*
 *
 * HomePage
 *
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import styles from './styles.css';
import { push } from 'react-router-redux';
import { Redirect } from 'react-router'

import { apiELBUrl } from '../../../urls.conf.js';

// material-ui
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import ErrorMessage from 'components/ErrorMessage';
import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';

import {
    setAppId,
    setAppKey,
    setAgId,
    setUrl,
    removeAppId,
    removeAppKey,
    removeAgId,
    removeUrl,
    getAppId,
    getAppKey,
    getAgId,
    getUrl,
} from 'utils/storageUtility';

export class HomePage extends Component {
  // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    this.state = {
      agid: '',
      appid: '',
      appkey: '',
      uri: '',
    };
  }

  handleAppidChange = (evt, text) => {
    this.setState({ appid: text });
  };

  handleAppKeyChange = (evt, text) => {
    this.setState({ appkey: text });
  };

  handleAgidChange = (evt, text) => {
    this.setState({ agid: text });
  };

  handleUriChange = (evt, text) => {
    this.setState({ uri: text });
  };

  openLoginPage = () => {
    setAgId(this.state.agid);
    setAppId(this.state.appid);
    setAppKey(this.state.appkey);
    setUrl(this.state.uri);
    
	window.location =
		//user login
		apiELBUrl+'/oauth/login?domain_id=c21f969b-5f03-433d-95e0-4f8f136e7682&agent_id='+this.state.agid+'&client_id='+this.state.appid+'&redirect_uri='+this.state.uri+'&scope=Profile.Basic&state=A';
  };

  zeroLoginPage = () => {
    setAgId(this.state.agid);
    setAppId(this.state.appid);
    setAppKey(this.state.appkey);
    setUrl(this.state.uri);
    
	window.location =		
		//zero-login
		//apiELBUrl+'/oauth/codeApp?domain_id=c21f969b-5f03-433d-95e0-4f8f136e7682&app_id='+this.state.appid+'&agent_id='+this.state.agid+'&redirect_uri='+this.state.uri;
		apiELBUrl+'/oauth/login?domain_id=c21f969b-5f03-433d-95e0-4f8f136e7682&client_id='+this.state.appid+'&agent_id='+this.state.agid+'&redirect_uri='+this.state.uri;
  };

  
  render() {
    removeAgId();
    removeAppId();
    removeAppKey();
    removeUrl();
	
    return (

      <div className={styles.homePage}>
        <Helmet
          title="Home"
          meta={[{ name: 'description', content: 'Description of HomePage' }]}
        />

        <h2>3pty.com</h2>       
        <div>
        <TextField
          ref="appid"
          floatingLabelText="appid"
          floatingLabelShrinkStyle={{ size: '18px' }}
          type="text"
          value={this.state.appid}
          onChange={this.handleAppidChange}
        />
        </div>
        <div>
        <TextField
          ref="appkey"
          floatingLabelText="appkey"
          floatingLabelShrinkStyle={{ size: '18px' }}
          type="text"
          value={this.state.appkey}
          onChange={this.handleAppKeyChange}
        />
        </div>
		<div>
        <TextField
          ref="agid"
          floatingLabelText="agid"
          floatingLabelShrinkStyle={{ size: '18px' }}
          type="text"
          value={this.state.agid}
          onChange={this.handleAgidChange}
        />
        </div>
        <div>
        <TextField
            ref="uri"
            floatingLabelText="uri"
            floatingLabelShrinkStyle={{ size: '18px' }}
            type="text"
            value={this.state.uri}
            onChange={this.handleUriChange}
        />
        </div>
        <div>
        <RaisedButton
          className={styles.raisedButton}
          label="Login with FreePP"
          onClick={this.openLoginPage}
          primary
        />
        </div>		
     </div>
    );
  }
}

export default connect()(HomePage);


