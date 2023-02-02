import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'antd/dist/reset.css';
import { disableReactDevTools } from '@fvilers/disable-react-devtools'
import reportWebVitals from './reportWebVitals';
import { createStore, combineReducers } from "redux";
// import { configureStore } from "@reduxjs/toolkit"
import { Provider } from 'react-redux';
import { composeWithDevTools } from "redux-devtools-extension"
import rootReducer from './reducers';
//1 import from react-redux and redux
//2 create user reducer function

//3. combine multiple reducers
//4. create redux store
const store = createStore(rootReducer, composeWithDevTools())
//5. provide redux store to entire app
if (process.env.NODE_ENV === 'production') disableReactDevTools()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <Provider store={store} >
    <App />
  </Provider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
