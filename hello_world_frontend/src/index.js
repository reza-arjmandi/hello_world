import React from 'react';
import thunkMiddleware from 'redux-thunk'
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'typeface-roboto';

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';

import reducer from './reducers';

import { 
  fetch_menu_list,
} from './api';

const store = createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware
));

store.dispatch(fetch_menu_list());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
