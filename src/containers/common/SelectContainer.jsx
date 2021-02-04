import React from 'react';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';

const propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
};

const defaultProps = {
  value: 5,
  name: '',
  placeholder: 'First day of the week',
  onBlur: () => {},
  onFocus: () => {},
};

const SelectContainer = (props) => {
  const {
    options,
    value,
    placeholder,
    name,
    onChange,
    onBlur,
    onFocus,
  } = props;

  const handleFocus = (...args) => {
    if (onFocus) {
      onFocus(args);
    }
  };

  const handleBlur = (...args) => {
    if (onBlur) {
      onBlur(args);
    }
  };

  return (
    <ReactSelect
      name={name}
      value={options[value]}
      placeholder={placeholder}
      className="select"
      options={options}
      onChange={onChange}
      onBlur={handleBlur}
      onFocus={handleFocus}
    />
  );
};

SelectContainer.propTypes = propTypes;

SelectContainer.defaultProps = defaultProps;

export default SelectContainer;
