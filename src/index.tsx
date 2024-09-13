import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import { makeServer } from "./migrate";

// Start MirageJS in both development and production environments
if (process.env.NODE_ENV !== "test") {
  makeServer({ environment: process.env.NODE_ENV });
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
