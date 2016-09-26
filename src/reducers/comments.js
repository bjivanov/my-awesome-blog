import {
  REQUEST_COMMENTS, RECEIVE_COMMENTS
} from '../actions/comments';

const comments = (state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) => {
  switch (action.type) {
    case REQUEST_COMMENTS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      };
    case RECEIVE_COMMENTS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.comments
      };
    default:
      return state;
  }
};

export default (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_COMMENTS:
    case REQUEST_COMMENTS:
      return {
        ...state,
        [action.postId]: comments(state[action.postId], action)
      };
    default:
      return state;
  }
};
