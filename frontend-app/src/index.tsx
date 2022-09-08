import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import Routing from "./Routing";
import { store } from "./store/store";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Routing />
    </Provider>
  </React.StrictMode>
);
