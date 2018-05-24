/**
*
* ErrorMessage
*
*/

import React from 'react';
import styles from './styles.css';

function ErrorMessage(props) {
  return (
    <div className={styles.form__error}>
      {props.error}
    </div>
  );
}

ErrorMessage.propTypes = {
  error: React.PropTypes.string,
};

export default ErrorMessage;
