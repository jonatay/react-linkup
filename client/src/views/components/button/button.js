import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import Button from 'antd';

import './button.css';

const MyButton = ({ children, className, onClick, type = 'button', icon }) => {
  const cssClasses = classNames('btn', className);
  return (
    <Button icon={icon} className={cssClasses} onClick={onClick}>
      {children}
    </Button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'reset', 'submit'])
};

export default MyButton;
