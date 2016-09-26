import { combineReducers } from 'redux';
import posts from './posts';
import comments from './comments';

const blog = combineReducers({
  posts,
  comments
});

export default blog;
