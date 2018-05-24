// @flow
/*
 *
 * Access
 *
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Helmet from 'react-helmet';
import styles from './styles.css';


import {
  getAccToken,
  getQuery
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
    };
  }

  props: {
    dispatch: Function,
    location: Object,
  };

  render() {
    return (
      <div className={styles.homePage}>
        <Helmet
          title="Access Result"
          meta={[{ name: 'description', content: 'Description of HomePage' }]}
        />
        <h2>Access Result</h2>
        <TextField value={getAccToken()} floatingLabelText="token" />
        <br />
        <TextField
          style={{ textAlign: 'left' }}
          multiLine
          rows={3}
          value={JSON.stringify(getQuery())}
          floatingLabelText="query"
        />
      </div>
    );
  }
}

export default connect()(Code);