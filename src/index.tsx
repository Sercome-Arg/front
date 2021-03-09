import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './i18n';
// import Router from './Router'
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store from './store/index';

const logo = require('./logow.svg')

const App = React.lazy(() =>
  import('./Router') 
    .then(Router => Router)
);

ReactDOM.render(
  <Suspense fallback={<img src={ logo } />}>
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </Suspense>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
