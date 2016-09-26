import {
  REQUEST_POSTS,
  RECEIVE_POSTS,
  REQUEST_DELETE_POST,
  RESPONSE_DELETE_POST,
  REQUEST_EDIT_POST,
  RESPONSE_EDIT_POST,
} from '../actions/posts';

const defaultState = {
  isFetching: false,
  didInvalidate: true,
  items: []
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case REQUEST_DELETE_POST:
    case REQUEST_EDIT_POST:
    case REQUEST_POSTS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      };
    case RESPONSE_DELETE_POST:
    case RESPONSE_EDIT_POST:
      return {
        ...state,
        isFetching: false,
        didInvalidate: true,
      };
    case RECEIVE_POSTS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.posts
      };
    default:
      return state;
  }
};

