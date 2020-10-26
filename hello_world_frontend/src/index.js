import React from 'react';
import thunkMiddleware from 'redux-thunk'
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'typeface-roboto';

import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux';

import reducer from './reducers';
import {reactLocalStorage} from 'reactjs-localstorage';

import { 
  fetch_menu_list,
} from './api';

import {
  set_auth_token,
  set_email,
} from './actions'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,

  composeEnhancers(
  applyMiddleware(
    thunkMiddleware
    )));

store.dispatch(fetch_menu_list());

const token = reactLocalStorage.get("token", null, true)
store.dispatch(set_auth_token(token));

const email = reactLocalStorage.get("email", null, true)
store.dispatch(set_email(email));

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
