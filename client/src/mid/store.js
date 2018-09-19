import { routerMiddleware } from 'react-router-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import ReactGA from 'react-ga';
import { analyticsId } from './config';

import history from './history';
import reducers from './reducers';
import sagas from './sagas';

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  let middleware = applyMiddleware(sagaMiddleware, routerMiddleware(history));

  if (process.env.NODE_ENV !== 'production') {
    const devToolsExtension = window.devToolsExtension;
    if (typeof devToolsExtension === 'function') {
      middleware = compose(
        middleware,
        devToolsExtension()
      );
    }
  }

  const store = createStore(reducers, middleware);
  sagaMiddleware.run(sagas);

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(require('./reducers').default);
    });
  }

  // init Google Analytics if not in dev
  if (process.env.NODE_ENV !== 'development') {
    ReactGA.initialize(analyticsId);
    history.listen((location, action) => {
      //console.log('route change:',location.pathname)
      ReactGA.set({ page: location.pathname });
      ReactGA.pageview(location.pathname);
    });
  }

  return store;
}
