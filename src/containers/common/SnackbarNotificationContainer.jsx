import React from 'react';
import PropTypes from 'prop-types';

import SnackbarNotification from 'components/common/SnackbarNotification';

const propTypes = {
  children: PropTypes.string,
};

const defaultProps = {
  children: '',
};

const SnackbarNotificationContainer = ({ children }) => (
  <SnackbarNotification>{children}</SnackbarNotification>
);

SnackbarNotificationContainer.propTypes = propTypes;

SnackbarNotificationContainer.defaultProps = defaultProps;

export default SnackbarNotificationContainer;
