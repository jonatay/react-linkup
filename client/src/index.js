import './views/styles/styles.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import { initAuth } from './mid/common/auth';
import history from './mid/history';
import configureStore from './mid/store';
import App from './views/app';

// import registerServiceWorker from './registerServiceWorker';
// import './index.css';

const store = configureStore();
const rootElement = document.getElementById('root');

function render(Component) {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div style={{ height: '100%' }}>
          <Component />
        </div>
      </ConnectedRouter>
    </Provider>,
    rootElement
  );
}

if (module.hot) {
  module.hot.accept('./views/app', () => {
    render(require('./views/app').default);
  });
}

// registerServiceWorker();

initAuth(store.dispatch)
  .then(() => render(App))
  .catch(error => console.error(error));
