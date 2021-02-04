import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.string.isRequired,
};

const SnackbarNotification = ({ children }) => (
  <span className="snackbar-notification">{children}</span>
);

SnackbarNotification.propTypes = propTypes;

export default SnackbarNotification;
