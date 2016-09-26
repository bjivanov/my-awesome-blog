import React, { PropTypes } from 'react';
import Post from './Post/Post';

const Posts = ({ posts }) => (
  <div>
    {
      posts.map((post, i) =>
        <Post key={i} postId={post.id} title={post.title} text={post.text} />
      )
    }
  </div>
);

Posts.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Posts;
