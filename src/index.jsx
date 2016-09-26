import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import App from './components/App';
import appReducer from './reducers';

const middleware = [thunk];
const store = createStore(
  appReducer,
  applyMiddleware(...middleware)
);

const root = (
  <Provider store={store}>
    <App />
  </Provider>
);

render(root, document.getElementById('root'));
