import React from 'react';
import ReactDOM from 'react-dom';
import '../index.css';
import Header from './components/header/header.js'
import Button from '@material-ui/core/Button';
import App from './components/App.js';
import * as serviceWorker from './serviceWorker';

//pages for this product

ReactDOM.render(
  <React.StrictMode>
    <Header />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
