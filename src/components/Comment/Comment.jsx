import React, { PropTypes } from 'react';
import styles from './comment.css';

const Comment = ({ text }) => (
  <p className={styles.comment}>{text}</p>
);

Comment.propTypes = {
  text: PropTypes.string.isRequired
};

export default Comment;
