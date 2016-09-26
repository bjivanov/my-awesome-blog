import $ from 'jquery';

export const REQUEST_COMMENTS = 'REQUEST_COMMENTS';
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';

const requestComments = postId => ({
  type: REQUEST_COMMENTS,
  postId
});

const receiveComments = (postId, json) => ({
  type: RECEIVE_COMMENTS,
  postId,
  comments: json.map(({ body }) => ({
    text: body
  }))
});

const fetchComments = postId => (dispatch) => {
  dispatch(requestComments(postId));
  return $.ajax(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`, { method: 'GET', dataType: 'json' })
    .then(json => dispatch(receiveComments(postId, json)));
};

const shouldFetchComments = (state, postId) => {
  const comments = state.comments[postId];
  if (!comments) {
    return true;
  }
  if (comments.isFetching) {
    return false;
  }
  return comments.didInvalidate;
};

export const fetchCommentsIfNeeded = postId => (dispatch, getState) => {
  if (shouldFetchComments(getState(), postId)) {
    return dispatch(fetchComments(postId));
  }
  return undefined;
};
