import React from "react";
import ReactDOM from "react-dom";
import * as ReduxStore from "src/redux/store";
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={ReduxStore.store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

