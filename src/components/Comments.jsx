import React, { PropTypes } from 'react';
import Comment from './Comment/Comment';

const Comments = ({ comments }) => (
  <div>
    {
      comments.map((post, i) =>
        <Comment key={i} text={post.text} />
      )
    }
  </div>
);

Comments.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Comments;
