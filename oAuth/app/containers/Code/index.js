// @flow
/*
 *
 * Code
 *
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
// import OAuth from 'utils/OAuthRequest';
import Helmet from 'react-helmet';
import styles from './styles.css';
import { getToken } from './actions';
import { getProfile } from './actions';
import { selectResource } from 'containers/App/selectors';
// import { push } from 'react-router-redux';
import {
  setCode,
  getCode,
  removeCode,
  removeAccToken,
  removeQuery
} from 'utils/storageUtility';


// material-ui
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';


export class Code extends Component {
  // eslint-disable-line react/prefer-stateless-function

  constructor() {
    super();
    this.state = {
      code: '',
	  state: '',
    };
  }

  sentRequest = () => {
    console.log("Press sentRequest function");
    const resp = this.props.dispatch(
      getToken()
    );
  };

  accessRequest = () => {
    console.log("Press accessRequest function");
    const access_resp = this.props.dispatch(
          getProfile()
    );
  };

  props: {
    dispatch: Function,
    location: Object,
  };

  render() {
    removeCode();
    removeAccToken();
    removeQuery();

    const { errorCode, errorMsg, code, state } = this.props.location.query;
    setCode(code);

    const resp = this.props.dispatch(
          getToken()
    );

	if(errorCode===undefined && code === undefined)
	{
		return (
		  <div className={styles.homePage}>
		    <Helmet
		      title="Code Result"
		      meta={[{ name: 'description', content: 'Description of HomePage' }]}
		    />
		    <h2>Code Result</h2>		   
		    <TextField value={state} floatingLabelText="state" />
		    <br />
		  </div>
		);
	}
	else if(errorCode === undefined)
	{
		return (
		  <div className={styles.homePage}>
		    <Helmet
		      title="Code Result"
		      meta={[{ name: 'description', content: 'Description of HomePage' }]}
		    />
		    <h2>Code Result</h2>
		    <TextField value={getCode()} floatingLabelText="code" />
		    <br />
		    <TextField value={state} floatingLabelText="state" />
		    <br />
		  </div>
		);
	}
	else
	{
		return (
		  <div className={styles.homePage}>
		    <Helmet
		      title="Code Result"
		      meta={[{ name: 'description', content: 'Description of HomePage' }]}
		    />
		    <h2>Code Result</h2>
		    <TextField value={errorCode} floatingLabelText="errorCode" />
		    <br />
		    <TextField value={errorMsg} floatingLabelText="errorMsg" />
		    <br />       
		  </div>
		);
	}
  }
}

export default connect()(Code);
