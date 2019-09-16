import "./views/styles/styles.css";

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
// import { ConnectedRouter } from 'react-router-redux';
import { ConnectedRouter } from "connected-react-router";
import { BrowserRouter } from "react-router-dom";

import configureStore, { history } from "./mid/store";

import { initAuth } from "./mid/common/auth";
//import history from './mid/history';
// import configureStore from './mid/store';
import App from "./views/app";

const store = configureStore();
console.log(store);
const rootElement = document.getElementById("root");
const customContext = React.createContext(null); // your own context

function render(Component) {
  ReactDOM.render(
    <Provider store={store} context={customContext}>
      <ConnectedRouter history={history} context={customContext}>
        <div style={{ height: "100%" }}>
          <Component />
        </div>
      </ConnectedRouter>
    </Provider>,
    rootElement
  );
}

if (module.hot) {
  module.hot.accept("./views/app", () => {
    render(require("./views/app").default);
  });
}

// registerServiceWorker();

initAuth(store.dispatch)
  .then(() => render(App))
  .catch(error => console.error(error));

// const { registerObserver } = require('react-perf-devtool');
//
// function callback(measures) {
//   // do something with the measures
//   //console.table(measures);
// }
//
// // assign the observer to the global scope, as the GC will delete it otherwise
// window.observer = registerObserver({}, callback);

// import registerServiceWorker from './registerServiceWorker';
// import './index.css';
