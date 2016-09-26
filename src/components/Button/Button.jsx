import React, { PropTypes } from 'react';
import styles from './button.css';

const Button = ({ text, onClick, type, className }) => (
  <button onClick={onClick} className={`${className} ${styles[type || 'default']}`}>{text}</button>
);

Button.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.string,
  className: PropTypes.string
};

export default Button;
