import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import Button from '../Button/Button';
import Comments from '../Comments';
import { fetchCommentsIfNeeded } from '../../actions/comments';
import { deletePost, editPost } from '../../actions/posts';
import styles from './post.css';

class Post extends Component {
  static propTypes = {
    postId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    isFetching: PropTypes.bool,
    onDelete: PropTypes.func,
    onEdit: PropTypes.func,
    dispatch: PropTypes.func,
    comments: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      commentsShown: false
    };
    this.commentsButtonClicked = this.commentsButtonClicked.bind(this);
  }

  commentsButtonClicked() {
    this.setState({ commentsShown: !this.state.commentsShown });
    const { postId, dispatch } = this.props;
    dispatch(fetchCommentsIfNeeded(postId));
  }

  render() {
    const { title, text, comments, isFetching, onDelete, onEdit } = this.props;
    const { commentsShown } = this.state;

    return (
      <section className={classnames({ [styles.loading]: isFetching })}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.text}>{text}</p>
        <Button text="Edit" onClick={onEdit} />
        <Button
          type="danger"
          text="Delete"
          onClick={onDelete}
        />
        <Button
          type="primary"
          onClick={this.commentsButtonClicked}
          text={!commentsShown ? 'Show Comments' : 'Hide Comments'}
          className={styles['comments-btn']}
        />
        {commentsShown ? <Comments comments={comments} /> : null}
      </section>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const {
    isFetching,
    items
  } = state.comments[ownProps.postId] || {
    isFetching: false,
    items: []
  };
  return {
    comments: items
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  dispatch,
  onEdit: () => {
    /* eslint-disable no-alert */
    const newPost = prompt('Post content', ownProps.text);
    /* eslint-enable no-alert */
    if (newPost != null) {
      return dispatch(editPost(ownProps.postId, newPost));
    }
    return false;
  },
  onDelete: () => dispatch(deletePost(ownProps.postId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);
