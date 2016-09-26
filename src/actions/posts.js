import $ from 'jquery';

export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';

export const REQUEST_DELETE_POST = 'REQUEST_DELETE_POST';
export const RESPONSE_DELETE_POST = 'RESPONSE_DELETE_POST';

export const REQUEST_EDIT_POST = 'REQUEST_EDIT_POST';
export const RESPONSE_EDIT_POST = 'RESPONSE_EDIT_POST';

const requestPosts = () => ({
  type: REQUEST_POSTS
});

const receivePosts = json => ({
  type: RECEIVE_POSTS,
  posts: json.map(({ id, title, body }) => ({
    id,
    title,
    text: body
  }))
});

const fetchPosts = (dispatch) => {
  dispatch(requestPosts());
  return $.ajax('https://jsonplaceholder.typicode.com/posts', { method: 'GET', dataType: 'json' })
    .then(json => dispatch(receivePosts(json)));
};

const shouldFetchPosts = (state) => {
  const posts = state.posts;
  if (!posts) {
    return true;
  }
  if (posts.isFetching) {
    return false;
  }
  return posts.didInvalidate;
};

export const fetchPostsIfNeeded = () => (dispatch, getState) => {
  if (shouldFetchPosts(getState())) {
    return dispatch(fetchPosts);
  }
  return undefined;
};

const requestDeletePost = postId => ({
  type: REQUEST_DELETE_POST,
  postId,
});

const responseDeletePost = () => ({
  type: RESPONSE_DELETE_POST
});

export const deletePost = postId => (dispatch) => {
  dispatch(requestDeletePost(postId));
  return $.ajax(`https://jsonplaceholder.typicode.com/posts/${postId}`, { method: 'DELETE' })
    .then((response) => {
      dispatch(responseDeletePost());
      dispatch(fetchPostsIfNeeded());
    });
};

const requestEditPost = postId => ({
  type: REQUEST_EDIT_POST,
  postId,
});

const responseEditPost = () => ({
  type: RESPONSE_EDIT_POST
});

export const editPost = (postId, newContent) => (dispatch) => {
  dispatch(requestEditPost(postId, newContent));
  return $.ajax(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
    method: 'PATCH',
    data: {
      body: newContent
    }
  })
    .then((response) => {
      dispatch(responseEditPost());
      dispatch(fetchPostsIfNeeded());
    });
};
