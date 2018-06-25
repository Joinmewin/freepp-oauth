/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a neccessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import Helmet from 'react-helmet';

export default class NotFound extends React.Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    return (
      <div>
        <h1>Page Not Found</h1>
        <Helmet
          title="Not Found"
          meta={[{ name: 'description', content: 'Description of Not Found' }]}
        />
      </div>
    );
  }
}