import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Button from 'components/common/Button';

const propTypes = {
  className: PropTypes.string,
  btnType: PropTypes.string,
  isLoading: PropTypes.bool,
  children: PropTypes.string,
};

const defaultProps = {
  className: '',
  btnType: '',
  isLoading: false,
  children: '',
};

const ButtonContainer = (props) => {
  const { className, btnType, isLoading, children, ...rest } = props;

  const btnClassNames = cx('btn', {
    [`btn--${btnType}`]: btnType,
    'btn--loading': isLoading,
    [`${className}`]: className,
  });

  return (
    <Button btnClassNames={btnClassNames} {...rest}>
      {children}
    </Button>
  );
};

ButtonContainer.propTypes = propTypes;

ButtonContainer.defaultProps = defaultProps;

export default ButtonContainer;
