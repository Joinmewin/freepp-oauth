/* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */
/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a neccessity for you then you can refactor it and remove
 * the linting exception.
 */

import React, { Component } from 'react';
// import { createStructuredSelector } from 'reselect';
// import { selectLocationState } from './selectors';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import muiThemeable from 'material-ui/styles/muiThemeable';

import styles from './styles.css';

class App extends Component { // eslint-disable-line react/prefer-stateless-function
  props: {
    children: Node,
    // location: Object,
  };

  render() {
    // console.log('location: ', JSON.stringify(this.props.location));
    return (
      <div>
        <Helmet
          titleTemplate="%s - FreePP OAuth"
          defaultTitle="FreePP OAuth System"
          meta={[{ name: 'description', content: 'FreePP OAuth System' }]}
        />
        <div className={styles.maincontent}>{this.props.children}</div>
      </div>
    );
  }
}

// const mapStateToProps = createStructuredSelector({
//   location: selectLocationState(),
// });

const muiThemeabledApp = muiThemeable()(App);
export default connect()(muiThemeabledApp);
