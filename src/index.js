import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './i18n';
import Router from './Router'
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store from './store/index';
import ReactGA from 'react-ga';

ReactGA.initialize('G-2F7PWTWTM9');
ReactGA.pageview(window.location.pathname + window.location.search);

ReactDOM.render(
  <Suspense fallback=''>
    <Provider store={store}>
      <React.StrictMode>
        <Router />
      </React.StrictMode>
    </Provider>
  </Suspense>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();